#!/bin/bash

APP_NAME=$(basename "$PWD")
PACKAGE_VERSION=$(grep -m1 version package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')
FULL_IMG_NAME=${APP_NAME}:${PACKAGE_VERSION}

DOCKER="docker"
OS=$(uname)

FOUND_IMAGE=$(${DOCKER} images | grep $APP_NAME | grep $PACKAGE_VERSION | wc -l)
echo FOUND_IMAGE: $FOUND_IMAGE
FORCE_OPT=$1
if [ "$1" == "-r" ]; then
	echo "Rebuild ..."
	FOUND_IMAGE=0
	${DOCKER} rmi -f $APP_NAME
fi

if [ $FOUND_IMAGE == 0 ]; then
	echo "Building docker image ..."

	${DOCKER} build -t ${FULL_IMG_NAME} ${PWD}

	${DOCKER} tag -f ${FULL_IMG_NAME} ${DOCKER_REGISTRY}/${DOCKER_NAMESPACE}/${FULL_IMG_NAME}
fi

${DOCKER} push ${DOCKER_REGISTRY}/${DOCKER_NAMESPACE}/${FULL_IMG_NAME}

