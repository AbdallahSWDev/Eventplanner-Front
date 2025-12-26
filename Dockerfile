############################
# 1️⃣ Build Angular app
############################
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production


############################
# 2️⃣ Serve with Nginx
############################
FROM nginxinc/nginx-unprivileged:alpine

WORKDIR /usr/share/nginx/html

# IMPORTANT: Angular 17 output path
COPY --from=build /app/dist/eventplanner-frontend/browser/ .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
