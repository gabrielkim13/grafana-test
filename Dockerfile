FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

USER node

COPY index.js .

EXPOSE 3333

CMD ["npm", "start"]
