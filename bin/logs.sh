#!/bin/bash
docker-compose --env-file=.env.local logs --tail 200 --follow $@
