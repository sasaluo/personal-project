#!/bin/bash

IP_ADDRESS=$(ifconfig $(ip -o -4 route show to default | awk '{print $5}') | grep "inet addr" | cut -d ':' -f 2 | cut -d ' ' -f 1)

if [ "$1" != "" ]; then
	PROFILE=$1	
fi
if [ "${PROFILE}" != "" ]; then
	echo "profile: $PROFILE"
else	
	PROFILE=dev
fi

if [ "$2" != "" ]; then
    PORT=$2
fi
if [ "${PORT}" != "" ]; then
	echo "port: ${PORT}"
else
    PORT=8101
fi

if [ "$DAEMON_SERVICE" != "yes" ]; then
	echo "daemon service: $DAEMON_SERVICE"
else	
	RUN_BACKGROUND="screen -d -m -L "
fi

FINAL_CMD="$RUN_BACKGROUND ionic serve --nolivereload --address=$IP_ADDRESS --port=$PORT"

echo "cmd: $FINAL_CMD, profile=$PROFILE"

gulp backend --env=$PROFILE

$FINAL_CMD
