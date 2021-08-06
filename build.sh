#!/bin/sh
docker build -t web-gphoto2 - < Dockerfile
docker run --rm -it \
	-v $PWD:/src \
	-u $(id -u):$(id -g) \
	web-gphoto2 \
	$@
