#!/bin/bash

mvn clean package && cp target/users-0.0.1-SNAPSHOT.jar docker

docker-compose build users-api

exit 0
