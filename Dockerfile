FROM nginxinc/nginx-unprivileged:alpine

# Copy Angular build output
COPY dist/eventplanner-frontend/ /usr/share/nginx/html/

# Use a custom nginx config (must NOT write to /run)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

