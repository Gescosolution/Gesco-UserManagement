# Archivo para construccion de imagen Docker a partir del proyecto Gesco-UserManagement

FROM ubuntu:14.04
MAINTAINER Abel Francisco <jfrancisco4490@gmail.com>

# Instalar Servicios Adicionales (Redis y MySQL)
RUN apt-get update && apt-get install -y \
	git \
	git-core \
	nodejs \
	npm \
	redis-server \
	mysql-server \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*
	
# Exponer el puerto de Redis del contenedor al Host
EXPOSE 6379

# Exponer el puerto de MySQL del contenedor al Host
EXPOSE 3306

# Iniciar Servicios Adicionales

# Iniciar Servicio Redis
RUN /usr/bin/redis-server &

# Iniciar Servicio MySQL
RUN /usr/bin/mysqld_safe &

# Obtener ultima version del proyecto Gesco-UserManagement
RUN git clone https://github.com/Gescosolution/Gesco-UserManagement.git

WORKDIR "/Gesco-UserManagement"

RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN npm cache clean
RUN npm install
RUN npm install grunt-cli -g

# Ejecutar actividades para despliegue de la aplicacion
RUN grunt auto_install
RUN grunt docco
RUN grunt concat
RUN grunt minify
RUN grunt check

CMD ["/bin/bash", "start_docker_image.sh"]
