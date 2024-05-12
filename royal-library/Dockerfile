FROM node:alpine AS app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install
ARG env=production
RUN npm run build

FROM nginx:alpine

COPY --from=app /usr/src/app/dist/royal-library/browser /usr/share/nginx/html

RUN ls /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200
