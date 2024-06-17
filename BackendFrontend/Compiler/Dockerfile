FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache g++ gcc openjdk11-jdk python3
COPY package.json .
RUN   npm install
COPY . .
EXPOSE 8000
CMD ["node","server.js"]