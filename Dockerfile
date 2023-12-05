FROM node:18.16.0

WORKDIR /app

RUN rm -rf node_modules

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

RUN yarn

COPY . .

RUN yarn build

RUN mkdir /app/logs

EXPOSE 3040

CMD [ "yarn", "start:prod" ]
