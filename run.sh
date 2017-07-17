#!/bin/bash

if [ "$1" != "" ]; then
	PROFILE=$1	
fi
if [ "${PROFILE}" == "" ]; then
	PROFILE=dev
fi

if [ "$2" != "" ]; then
    PORT=$2
fi
if [ "${PORT}" == "" ]; then
    PORT=8181
fi

address=$(ifconfig eth0 | grep "inet addr" | cut -d ':' -f 2 | cut -d ' ' -f 1)
#assume that npm install is executed before
#npm install --allow-root

#echo "print $PORT"
#gulp backend --env=$PROFILE

FINAL_CMD="ionic serve --address=$address --nolivereload --port=$PORT"

echo "cmd: $FINAL_CMD profile=$PROFILE"

$FINAL_CMD
