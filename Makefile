#!make
VERSION=$(shell git rev-parse --short HEAD)

dpl ?= deploy.env
include $(dpl)
export $(shell sed 's/=.*//' $(dpl))


help:
	echo "" &&\
	echo "Usage: make [TARGET]" &&\
	echo "Targets:"

run:
	docker-compose up --build

build:
	docker build . -t $(APP_NAME)

dev:
	docker run -p $(APP_PORT):$(HOST_PORT) -d --name $(APP_NAME) $(APP_NAME)
	docker container start $(APP_NAME)

attach:
	docker attach $(APP_NAME)

rm-dev:
	docker container stop /$(APP_NAME)
	docker container rm /$(APP_NAME)

shell:
	docker run --rm -ti $(APP_NAME) /bin/sh

prod:
	docker run -p $(APP_PORT):$(HOST_PORT) $(DOCKER_REPO)/$(APP_NAME):$(VERSION)

version:
	echo $(VERSION)

tag-latest:
	echo 'create tag latest'
	docker tag $(APP_NAME) $(DOCKER_REPO)/$(APP_NAME):latest

tag-version:
	echo 'create tag $(VERSION)'
	docker tag $(APP_NAME) $(DOCKER_REPO)/$(APP_NAME):$(VERSION)

push:
	echo 'publish $(VERSION) to $(DOCKER_REPO)'
	docker push $(DOCKER_REPO)/$(APP_NAME):$(VERSION)

# Metrics
info:
	docker inspect $(APP_NAME)
