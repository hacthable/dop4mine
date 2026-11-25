FROM node:22-alpine

ENV NODE_ENV=production
EXPOSE 8080/tcp

LABEL summary="Dopamine"
LABEL description="Dopamine web proxy, built on Scramjet-App"

WORKDIR /app

COPY package.json ./
RUN apk add --upgrade --no-cache python3 make g++
RUN npm install --omit=dev

COPY . .

CMD ["node", "src/index.js"]
