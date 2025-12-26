FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular build output
COPY dist/eventplanner-frontend /usr/share/nginx/html

# Fix permissions for OpenShift
RUN chmod -R g+rwX /var/cache/nginx \
    && chmod -R g+rwX /usr/share/nginx/html \
    && chmod -R g+rwX /etc/nginx \
    && chmod -R g+rwX /tmp

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
