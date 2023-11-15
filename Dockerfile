# Build React app
FROM node:lts-alpine AS build

WORKDIR /app
COPY . /app

RUN npm ci

RUN npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js \
  -t node18-alpine-x64 \
  -o import-meta-env-alpine

RUN npm run build

# Serve via Nginx
FROM nginx:1.25.3-alpine

EXPOSE 80

COPY ./docker/nginx/docker-entrypoint.d/90-inject-env-vars.sh /docker-entrypoint.d
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/.env.example /
COPY --from=build /app/import-meta-env-alpine /usr/bin

COPY --from=build /app/dist /usr/share/nginx/html