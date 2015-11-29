# Gesco-UserManagement
Submódulo correspondiente a la administración y control de datos de Usuarios y Empleados, enmarcado en la aplicación Gesco.

[![Build Status](https://travis-ci.org/Gescosolution/Gesco-UserManagement.svg?branch=master)](https://travis-ci.org/Gescosolution/Gesco-UserManagement)

Publicado bajo licencia GNU GENERAL PUBLIC LICENSE Version 2.

El presente módulo participa en el certamen de Proyectos libres de la Universidad de Granada 2015-2016, como parte del proyecto general [Gesco](https://github.com/Gescosolution/Gesco). Las bases de dicho certamen se encuentran [aquí](https://docs.google.com/document/d/16UsdUV_XXuPUh-Imz4PSgh-2ES_YaAJpZ8fNrbTVpMA/edit).

**Elaborado por:** Abel Josué Francisco Agra ([@jfrancisco4490](https://github.com/jfrancisco4490))

**Enlace al sitio _web_ en el que se describe el desarrollo del proyecto (_gh-pages_)**: [http://gescosolution.github.io/Gesco-UserManagement/](http://gescosolution.github.io/Gesco-UserManagement/)

##Descripción

Consiste en un módulo _web_ para el sistema Gesco (Manejo y Planificación de Proyectos). 

Este módulo se encarga de gestionar, manejar y controlar la información correspondiente a los empleados de una determinada empresa. En principio, y para dar flexibilidad al sistema, se supone que la empresa puede tener múltiples oficinas y/o compañías filiales asociadas.

El presente módulo también debe incluir el desarrollo de un mecanismo de autenticación en la aplicación. Este mecanismo debe adaptarse a los estándares de seguridad de la empresa, la cual podría tener desplegado en su plataforma interna un sistema de autenticación previo.

La integración con los mecanismos de seguridad de la empresa deben extenderse incluso a la definición de roles en el sistema, sin necesidad de cambiar la estructura organizacional de la compañía. Es decir, el módulo debe asociar los cargos de trabajo existentes en la compañía, a un rol válido y definido en el sistema de permisos de la aplicación Gesco.

Corresponde al módulo de Gesco integrarse con el sistema centralizado de seguridad y manejo de roles de la compañía, a fin de identificar el perfil del usuario que solicita el acceso a la aplicación, así como las funcionalidades o actividades que puede llevar a cabo (o no) en el sistema.

Además del área de autenticación y usuarios, el presente módulo también debe incluir un área de ingreso y edición de datos de empleados de la empresa.

Como ya se ha indicado, la empresa puede contar con numerosas oficinas y/o empresas filiales, cada una de las cuales podría tener un sistema de almacenamiento de datos de empleados que sea independiente al resto. Por ello, es necesario que el sistema se comunique con las bases de datos de cada oficina, a fin de consultar los datos de los empleados que tienen registrados, y poder realizar una especie de _importación_ en la plataforma (evitar inconsistencias al momento de registrar los datos de un nuevo empleado en Gesco).

##Documentación Adicional

A continuación se listan algunos enlaces a información adicional de interés sobre el desarrollo del proyecto, y su respectiva implementación:

* **Descripción Detallada:** Especificación de requerimientos del sistema, motivación del proyecto e infraestructura virtual a ser utilizada. Puede ser consultada [aquí](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/docs/project/Detalles.md).
* **Selección de Herramientas:** Criterios utilizados para elegir las herramientas de construcción y despliegue de la aplicación. Puede ser consultada [aquí](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/docs/project/Herramientas.md).
* **Avance actual del proyecto:** Estado en que se encuentra la implementación del proyecto, así como una breve descripción de las funcionalidades desarrolladas. Puede ser consultado [aquí](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/docs/project/Avance.md).

##Instalación

* Descargar el contenido del repositorio
 
 ```
 git clone git@github.com:Gescosolution/Gesco-UserManagement.git
 cd Gesco-UserManagement
 ```

* Instalar dependencias de la aplicación

 `npm install`
 
 ó
 
 `grunt install`

* Configurar servidor _Express_. Se pueden actualizar las variables de entorno correspondientes con la configuración del servicio, de la siguiente manera:

 ```
 OPENSHIFT_NODEJS_IP=<host_servicio_web>
 OPENSHIFT_NODEJS_PORT=<puerto_servicio_web>
 ```
 
 Por defecto: _Host_ **127.0.0.1** y Puerto **3000**

* Configurar acceso a servidor _Redis_. Se pueden actualizar las variables de entorno correspondientes con la configuración del servicio, de la siguiente manera:

 ```
 OPENSHIFT_REDIS_HOST=<host_servicio_redis>
 OPENSHIFT_REDIS_PORT=<puerto_servicio_redis>
 REDIS_PASSWORD=<contraseña_servicio_redis>
 ```
 
 Por defecto: _Host_ **127.0.0.1**, Puerto **6379** y Sin Contraseña
 
* Configurar acceso a servidor _MySQL_. Se pueden actualizar las variables de entorno correspondientes con la información del servicio, de la siguiente manera:

 ```
 OPENSHIFT_MYSQL_DB_HOST=<host_servicio_mysql>
 OPENSHIFT_MYSQL_DB_PORT=<puerto_servicio_mysql>
 OPENSHIFT_MYSQL_DB_USERNAME=<usuario_servicio_mysql>
 OPENSHIFT_MYSQL_DB_PASSWORD=<contraseña_usuario_mysql>
 ```
 
 Por defecto: _Host_ **127.0.0.1**, Puerto **3306**, Sin Usuario y Sin Contraseña

* Definir esquema de base de datos de _Gesco_

 `mysql -u <usuario_servicio_mysql> -p <contraseña_usuario_mysql> < ./models/local/mysql/creacionTablasMySQL.sql`

* Iniciar aplicación

`npm start`