# Use a Node base image
FROM node:18.16.0-alpine

# Create app directory
WORKDIR /usr/src/app/

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3001

# Start the app in development mode
CMD ["npm", "run", "dev"]