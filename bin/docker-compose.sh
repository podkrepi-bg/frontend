#!/bin/bash
DOCKER_BUILDKIT=1 docker-compose --env-file=.env.local $@
