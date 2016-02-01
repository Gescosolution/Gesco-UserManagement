#!/bin/bash

#Iniciar servicio Redis
/usr/bin/redis-server &

#Iniciar servicio MySQL
/usr/bin/mysqld_safe &

#Iniciar aplicación Gesco-UserManagement
npm start