#!/bin/bash
#Crear aplicacion nueva con ambiente de node.js versión 0.10
rhc app create gescousermanagement nodejs-0.10
#Agregar complemento de servicio de Redis a la aplicación
rhc add-cartridge http://cartreflect-claytondev.rhcloud.com/reflect?github=smarterclayton/openshift-redis-cart -a gescousermanagement
#Agregar complemento de servicio de MySQL a la aplicación
rhc cartridge add mysql-5.5 -a gescousermanagement
#Agregar complemento de servicio de PostgreSQL a la aplicación
rhc cartridge add postgresql-9.2 -a gescousermanagement