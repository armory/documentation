FROM nginx

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
ADD etc/web-nginx.conf /etc/nginx/conf.d/web-nginx.conf
ADD build/ /opt/documentation/

EXPOSE 80

CMD ["/usr/sbin/nginx"]
