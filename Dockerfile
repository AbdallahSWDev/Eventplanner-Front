# Use light Nginx image for serving Angular
FROM nginx:alpine

# Copy Angular build output
COPY dist/eventplanner-frontend /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
