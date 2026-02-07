# Use the official Node.js 18 image as the base image
FROM mcr.microsoft.com/devcontainers/typescript-node:18

# Install additional packages needed for the project
RUN apt-get update && apt-get install -y \
    git \
    curl \
    vim \
    build-essential \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install Playwright and its dependencies for browser automation
RUN npm install -g playwright \
    && npx playwright install chromium firefox webkit

# Install Docker CLI (needed for Docker-in-Docker features)
RUN apt-get update && apt-get install -y lsb-release \
    && curl -fsSL https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]') $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update \
    && apt-get install -y docker-ce-cli

# Set working directory
WORKDIR /workspace

# Copy package files
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Create a non-root user and give permissions to the workspace
RUN chown -R node:node /workspace
USER node

# Expose port 3000 for the Next.js app
EXPOSE 3000

# Set the default command to start bash
CMD ["bash"]