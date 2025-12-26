# Use unprivileged Nginx image
FROM nginxinc/nginx-unprivileged:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default content
RUN rm -rf ./*

# Copy Angular build
COPY dist/eventplanner-frontend/ .

# Expose container port (8080 for unprivileged nginx)
EXPOSE 8080

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
