#!/bin/bash
SUDO=""
OS=$(uname)
if [ "${OS}" == "Linux" ]; then
	SUDO=sudo
fi

$SUDO docker rm -f $(basename "$PWD")

