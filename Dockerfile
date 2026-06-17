# Stage 1: Build the Ionic/Angular application
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build the application
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=build /app/www /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
