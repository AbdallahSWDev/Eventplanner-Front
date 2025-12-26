FROM nginxinc/nginx-unprivileged:alpine

# Remove default content
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build output
COPY dist/eventplanner-frontend /usr/share/nginx/html

# Copy OpenShift-safe nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
