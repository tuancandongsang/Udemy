#FROM strapi/base:14
FROM node:14.17 as node
ENV NODE_ENV production

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./
#COPY package-lock.json ./

RUN rm -rf node_modules && npm install && npm cache clean --force
COPY . ./

RUN npm run build

EXPOSE 1337

CMD ["npm","start"]