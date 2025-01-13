# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy SSL certificate and key
COPY ssl.crt /etc/nginx/ssl.crt
COPY ssl_private.key /etc/nginx/ssl_private.key

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]