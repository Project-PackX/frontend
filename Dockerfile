# Build React app
FROM node:lts-alpine AS build

WORKDIR /app
COPY . /app

RUN npm ci
RUN npm run build

# Serve via Nginx
FROM nginx:1.25.3-alpine

EXPOSE 80

COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html