FROM nginxinc/nginx-unprivileged:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy Angular build output (overwrites default index.html)
COPY dist/eventplanner-frontend/browser /usr/share/nginx/html/

# Copy custom nginx config for Angular routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Nginx unprivileged port
EXPOSE 8080

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
