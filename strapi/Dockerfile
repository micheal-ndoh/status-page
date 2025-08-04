FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Create public and uploads folders with proper permissions
RUN mkdir -p public/uploads && chmod -R 755 public

# Remove dev dependencies after build
RUN npm prune --production

# Expose port
EXPOSE 1337

# Start the application
CMD ["npm", "start"] 