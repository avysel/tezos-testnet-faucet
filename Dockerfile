FROM node:16

WORKDIR /

COPY . /

# build dependencies
RUN npm install && \ 
  npm run build


CMD [ "node", "app.js" ]

