FROM node:9.4.0

# File Author / Maintainer
MAINTAINER Aaron Benton

RUN apt-get install make

# Install app dependencies
COPY package.json /usr/src/package.json
RUN cd /usr/src; npm install

# source
COPY ./app /usr/src
WORKDIR /usr/src

ENV PATH=/usr/src/node_modules/.bin:$PATH

EXPOSE  8080

CMD ["nodemon", "app/index.js"]
