FROM node:14-alpine AS build

WORKDIR /build-stage

ARG PUBLIC_URL=

COPY package.json package-lock.json ./
RUN npm install --production

COPY src src
COPY public public

ARG PUBLIC_URL=""

RUN npm run build

FROM nginx:1.20-alpine

WORKDIR /jolo

COPY --from=build /build-stage/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
