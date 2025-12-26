FROM nginxinc/nginx-unprivileged:alpine

# Copy Angular build output
COPY dist/eventplanner-frontend/ /usr/share/nginx/html/

# Expose container port (unprivileged nginx uses 8080)
EXPOSE 8080
