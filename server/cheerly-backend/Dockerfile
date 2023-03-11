FROM node:16-alpine

RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont udev xvfb x11vnc fluxbox dbus

RUN apk add --no-cache --virtual .build-deps curl \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
    && apk add --no-cache curl wget \
    && apk del .build-deps

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV DISPLAY=:99

WORKDIR /var/app

# 캐시를 이용해 npm 패키지 설치를 한번만 실행하도록 합니다.
COPY package.json package-lock.json ./
RUN npm ci --only=production
RUN npm install puppeteer

COPY . .

RUN npm run build

ENV NODE_OPTIONS="--max-old-space-size=2048"

EXPOSE 3030
CMD Xvfb :99 -screen 0 1024x768x16 -ac & node dist/src/main.js
