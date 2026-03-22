# Build the Angular app
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files 
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build with prod config
RUN npx ng build --configuration=production

# Serve with Nginx
FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy the build output from the first stage to the Nginx html folder
# must match angular.json "outputPath"
COPY --from=build /app/dist/browser /usr/share/nginx/html

# Copy Nginx conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]