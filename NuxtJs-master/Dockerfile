FROM node:16

ENV MYPROJECT /src

RUN mkdir ${MYPROJECT}
WORKDIR ${MYPROJECT}
ADD . ${MYPROJECT}

RUN yarn install
RUN yarn run build

ENV HOST 0.0.0.0

CMD [ "yarn","run","dev" ]