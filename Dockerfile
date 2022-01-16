# Image Location
FROM node:10-alpine

# MAINTENER
MAINTAINER Maissacrement <emmariodelar@gmail.com>

# WORKSPACE
WORKDIR /app

# INIT DOCKER PROJECT
COPY package.json .
RUN apk update && \
    apk add bash  && \
    yarn && yarn build

# ADD REPO ON DOCKER
COPY . .

# FUNCTIONNALITY
ENTRYPOINT ["yarn", "prod"]
