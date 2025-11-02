FROM node:alpine

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app

COPY . /usr/src/app

RUN npm install

EXPOSE 4173

RUN npm run build

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]