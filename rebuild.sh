#!/bin/bash

APP_NAME=$(basename "$PWD")
PACKAGE_VERSION=$(grep -m1 version package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')
FULL_IMG_NAME=${APP_NAME}:${PACKAGE_VERSION}
DOCKER=docker
OS=$(uname)
FILE=$2
#if [ "${OS}" == "Linux" ]; then
#	DOCKER="sudo docker"
#fi
FOUND_IMAGE=$(${DOCKER} images | grep $APP_NAME | grep $PACKAGE_VERSION | wc -l)
echo FOUND_IMAGE: $FOUND_IMAGE
if [ "$1" == "-r" ]; then
	echo "Rebuild ..."
	FOUND_IMAGE=0
	${DOCKER} rmi -f $APP_NAME
fi

if [ "$FILE" == "base" ]; then
   FILE=BaseDockerfile
   FULL_IMG_NAME="$FULL_IMG_NAME-base"
elif [ "$FILE" == "run" ]; then
   FILE=RunDockerfileTmp
	 FULL_IMG_NAME="$FULL_IMG_NAME-base"
	 cp RunDockerfile RunDockerfileTmp
   sed -i "s/\${FULL_IMG_NAME}/${FULL_IMG_NAME}/g" RunDockerfileTmp
fi

if [ "$FILE" == "" ]; then
       echo "Please add second dockerfile param ..."
       exit
fi
if [ "$DOCKER_REGISTRY" == "" ]; then
    DOCKER_REGISTRY=hub.docker.vpclub.cn
fi
if [ "$DOCKER_NAMESPACE" == "" ]; then
    DOCKER_NAMESPACE=vpclub_containers
fi


if [ $FOUND_IMAGE == 0 ]; then
	echo "Building docker image ..."

	${DOCKER} build -f $FILE -t ${FULL_IMG_NAME} ${PWD}

	${DOCKER} tag  ${FULL_IMG_NAME} ${DOCKER_REGISTRY}/${DOCKER_NAMESPACE}/${FULL_IMG_NAME}
fi

${DOCKER} push ${DOCKER_REGISTRY}/${DOCKER_NAMESPACE}/${FULL_IMG_NAME}

if [ "$FILE"== "RunDockerfileTmp" ]; then
	rm RunDockerfileTmp
fi
