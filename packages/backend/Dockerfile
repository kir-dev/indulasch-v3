# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the container
COPY package.json ./

# Install the project dependencies using Yarn
RUN yarn install

# Copy the rest of the project files to the container
COPY . .

COPY src/templates ./templates

# Build the NestJS application (you might need to adjust the build command based on your project's setup)
RUN yarn build