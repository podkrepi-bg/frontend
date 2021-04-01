#!/bin/bash

set -e

CONTAINER=$1

docker-compose build $CONTAINER
docker-compose stop $CONTAINER
docker-compose up -d $CONTAINER
docker-compose logs -f $CONTAINER
