FROM nginxinc/nginx-unprivileged:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy Angular build output directly (overwrite)
COPY dist/eventplanner-frontend/ .

# Copy custom nginx config for Angular routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose unprivileged nginx port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
