FROM nginx:1.23.2-alpine
COPY default.conf /etc/nginx/conf.d/default.conf

RUN apk add --no-cache openssl
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

ENTRYPOINT dockerize -wait http://full-webapp:8001 -timeout 120s /usr/sbin/nginx -g 'daemon off;'