FROM node:13
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

EXPOSE 4000

CMD ["npm" ,"start"]