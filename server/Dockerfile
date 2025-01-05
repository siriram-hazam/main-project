FROM node:18

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Remove any existing node_modules
RUN rm -rf node_modules

# Copy package files
COPY package*.json ./

# Install dependencies and rebuild bcrypt
RUN npm ci
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the files so prisma/schema.prisma is available
COPY . .


# Generate the Prisma client
RUN npx prisma generate

# Run migrations and start app
CMD ["sh", "-c", "\
    echo 'Starting database migration...' && \
    npx prisma migrate deploy && \
    echo 'Starting application...' && \
    node index.js & \
    echo 'Waiting for the application to seed data 🌱...' && \
    sleep 10 && \
    node scripts/seed.js && \
    echo 'Restarting application...' && \
    pkill node && \
    node index.js \
    "]

EXPOSE 3001