# FROM nginx:stable-alpine
# RUN npm run build
# COPY dist/ /usr/share/nginx/html




FROM node:16-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
COPY src ./src
COPY public ./public

RUN npm install --silent
RUN npm run build

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]