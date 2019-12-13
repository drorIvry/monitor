
FROM node:10
WORKDIR /usr/src/app
COPY . .

EXPOSE 80

CMD [ "node", "dist/bin/www.js" ]

