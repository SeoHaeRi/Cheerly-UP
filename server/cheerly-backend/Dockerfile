FROM node:16-alpine
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
RUN apk add --no-cache udev ttf-freefont chromium
RUN apk --no-cache add tzdata && \
  cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
  echo "Asia/Seoul" > /etc/timezone
RUN npm install
RUN npm run build
EXPOSE 3030
CMD [ "node", "dist/src/main.js" ]