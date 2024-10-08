FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Install system dependencies
RUN apt-get update && \
    apt-get install -y ffmpeg imagemagick webp && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

# Copy the rest of the application files
COPY . .

# Expose the required port
EXPOSE 5000

# Command to run the application
CMD ["node", "index.js"]
