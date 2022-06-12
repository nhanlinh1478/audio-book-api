<<<<<<< HEAD
# Pull Docker Hub base image
FROM node:lts
# Set working directory
WORKDIR /usr/app
# Install app dependencies
COPY package.json ./
RUN yarn
# Copy app to container
COPY . .
# Run the "dev" script in package.json
CMD ["yarn", "dev"]
=======
FROM node:alpine

WORKDIR /usr/app

COPY ./ ./

RUN yarn install

EXPOSE 8000

CMD ["yarn", "start"]
>>>>>>> event-sourcing
