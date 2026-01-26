# Build the frontend
FROM node:22 AS frontend-build
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Serve with Nginx
FROM nginx:alpine
COPY --from=frontend-build /app/frontend/dist/EHR-app/browser /usr/share/nginx/html
# Expose port 80 for Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
