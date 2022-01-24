FROM nginx:stable-alpine as nginx

COPY build/ /bin/www

EXPOSE 80 443 8443

CMD [ "nginx", "-g", "daemon off;" ]
