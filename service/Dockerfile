FROM node:latest as builder
# USER root
USER root
WORKDIR /home/node

COPY . .
RUN cd /home/node
# RUN npm config set registry https://registry.npm.taobao.org
RUN yarn config set registry 'https://registry.npm.taobao.org'
RUN yarn install
RUN yarn build 

ENV NODE_ENV production
# FROM node:latest 

EXPOSE 8888
CMD ["yarn", "start" ]