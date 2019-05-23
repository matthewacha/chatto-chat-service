FROM node

WORKDIR /src

COPY . /src

RUN yarn install

COPY . /src

EXPOSE 7070

CMD yarn start
