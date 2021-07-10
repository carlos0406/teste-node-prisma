FROM node:alpine

WORKDIR /user/app

COPY package.json .
COPY yarn.lock .
RUN yarn
COPY ./prisma/
RUN yarn migrate:deploy 
RUN yarn prisma generate
COPY . .



EXPOSE 3333
CMD ["yarn","dev"]