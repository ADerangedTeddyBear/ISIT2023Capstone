# Use a specific version of Node.js as the base image
FROM node:16.13.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm ci

# Copy all files to the working directory
COPY . .

# Set the command to run the React app using the start script
CMD ["npm", "run", "start"]
