#!/bin/bash

#!/bin/bash

APP_NAME=$(basename "$PWD")

if [ "$DOCKER_NAMESPACE" == "" ]; then
	DOCKER_NAMESPACE=vpclub
fi

if [ "$1" != "" ]; then
	echo "1: $1"
	PROFILE=$1	
fi

if [ "${PROFILE}" == "" ]; then
	PROFILE=dev	
fi

if [ "$2" != "" ]; then
    PORT=$2
fi

if [ "${PORT}" == "" ]; then
    PORT=8103
fi

SUDO=""
OS=$(uname)
if [ "${OS}" == "Linux" ]; then
	SUDO=sudo
fi

echo "$SUDO profile: $PROFILE, port: $PORT"

${SUDO} docker exec -ti $APP_NAME /bin/bash