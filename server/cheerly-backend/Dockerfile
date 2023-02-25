FROM node:16-alpine
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3030
CMD [ "node", "dist/src/main.js" ]