#!/bin/bash
# container_id=$(sudo docker ps | grep "ionic" | cut -d ':' -f 1 | cut -d ' ' -f 1)
# echo $container_id

APP_NAME=$(basename "$PWD")

docker logs -f $APP_NAME
