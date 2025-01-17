# étape de build
FROM node:lts-alpine as build-stage
RUN apk add --no-cache gettext
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# étape de production
FROM nginx:stable-alpine as production-stage
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/dist .
COPY .docker/env.template.js ./env.template.js
COPY .docker/entrypoint.sh ./entrypoint.sh

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod +x ./entrypoint.sh

EXPOSE 80
ENTRYPOINT ["./entrypoint.sh"]
