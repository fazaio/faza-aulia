FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]

FROM redis:alpine
COPY redis.conf /usr/local/etc/redis/redis.conf
# EXPOSE 6379
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]