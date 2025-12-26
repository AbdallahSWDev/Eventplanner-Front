# Use unprivileged Nginx for OpenShift
FROM nginxinc/nginx-unprivileged:alpine

# Set working directory (the unprivileged user can write here)
WORKDIR /usr/share/nginx/html

# Remove default content
RUN rm -rf ./*

# Copy Angular build output from repo
COPY dist/eventplanner-frontend/ .

# Copy custom nginx config for Angular routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (nginx unprivileged default)
EXPOSE 8080

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
