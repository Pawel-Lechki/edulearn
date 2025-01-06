#!/bin/sh
# docker-entrypoint.sh

# Uruchomienie PHP-FPM
php-fpm -D

# Uruchomienie Nginx
nginx -g "daemon off;"