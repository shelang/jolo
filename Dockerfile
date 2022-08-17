FROM node:14-slim AS build

WORKDIR /build-stage

RUN apt update && apt -y install python2 make g++
RUN npm i -g npm
COPY package.json package-lock.json ./
RUN npm install --production --legacy-peer-deps

COPY src src
COPY public public

ARG REACT_APP_BASE_URL="/api/v1"

RUN npm run build

FROM nginx:1.23-alpine

WORKDIR /jolo

COPY --from=build /build-stage/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
