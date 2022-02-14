FROM nginx:stable-alpine as nginx

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

FROM nginx:stable-alpine

COPY --from=node 	    /app/build 	    /bin/www

EXPOSE 80 443 8443

CMD [ "nginx", "-g", "daemon off;" ]
