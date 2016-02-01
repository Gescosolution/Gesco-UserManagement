# Gesco-UserManagement
Submódulo correspondiente a la administración y control de datos de Usuarios y Empleados, enmarcado en la aplicación Gesco.

**Elaborado por:** Abel Josué Francisco Agra ([@jfrancisco4490](https://github.com/jfrancisco4490))

##Elección de Herramientas o Sistemas para el Desarrollo del Proyecto

### Construcción

Para especificar y ejecutar tareas comunes o recurrentes en el desarrollo del proyecto, se ha decidido utilizar [Grunt](http://gruntjs.com/), una herramienta para automatizar actividades en _JavaScript_.

Una de las principales ventajas de _Grunt_ es que cuenta con numerosos complementos (_plugins_) que permiten automatizar prácticamente cualquier actividad que deba ser llevada a cabo en el desarrollo del proyecto de forma reiterada, tales como instalación de dependencias, análisis sintáctico del código fuente, minificación y/o concatenación de archivos _JS_, o ejecución de pruebas unitarias, entre muchas otras.

En el archivo [Gruntfile.js](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/Gruntfile.js) del proyecto se pueden ver las especificaciones de dichas actividades o tareas.

###Test

Para definir y realizar las pruebas unitarias en el sistema, se ha seleccionado [Mocha](https://mochajs.org/), un _framework_ de pruebas para _JavaScript_ que permite realizar tests asíncronos sobre aplicaciones implementadas en _Node.js_.

Las razones por las que se decidió utilizar este sistema de _Test_ son las siguientes:

* Los _tests_ son escritos con un "Desarrollo Basado en el Comportamiento" ([Behavior-Driven Development](https://en.wikipedia.org/wiki/Behavior-driven_development) ó [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development)), utilizando una serie de sentencias o constructores que buscan simular el "lenguaje natural" (expresado en inglés). Esta manera de especificar las pruebas es sumamente intuitiva, y aún cuando no se esté muy familiarizado con el _framework_, se pueden empezar a diseñar _tests_ realistas y relativamente complejos en poco tiempo.
* Se puede utilizar cualquier librería de aserciones (_assertions_) definida para realizar y especificar las pruebas, lo cual redunda en una alta flexibilidad y variedad al momento de diseñar los _tests_.
* Contiene múltiples elementos para facilitar las pruebas en ambientes asíncronos (representativo de _Node.js_).
* El _framework_ de pruebas _mocha_ se ejecuta en _Node.js_, por lo que presenta una alta integración y cohesión con este lenguaje, y permite realizar las pruebas de aplicaciones escritas en _Node.js_ de forma mucho más sencilla y directa.

Además del conjunto central de funcionalidades de _mocha_, fue necesario incluir otros módulos o componentes para realizar la totalidad de las pruebas definidas. Estos módulos/librerías son:

* _assert_: la librería básica para definir aserciones de prueba y validarlas en _Node.js_. Basicamente, es una manera de que _Node.js_ ejecute pruebas o tests "sobre sí mismo". Con esta librería, se especifican sentencias que deben ser ciertas en un momento dado de la ejecución, y la librería valida que efectivamente sea así.
* _should_: una librería de aserciones más amplia y diversa que la anterior (_assert_). Además de sus extensiones de funcionalidad y mayor utilidad en general, una de sus principales ventajas es que permite especificar las sentencias de prueba de forma muy expresiva y natural.
* _supertest_: librería de aserciones para facilitar y simplificar las pruebas sobre servidores y solicitudes _HTTP_.

En el archivo [test.js](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/test/test.js) del proyecto, se pueden observar las pruebas unitarias y grupos de tests que han sido definidos(as) durante el desarrollo actual.

###Integración Continua

Para llevar a cabo la integración continua se ha elegido el servicio [Travis CI](https://travis-ci.org/), para construir (_build_) y probar (_test_) aplicaciones escritas en múltiples lenguajes (particularmente _Node.js_) alojadas en _GitHub_.

Las razones por las que se decidió utilizar este sistema de Integración Continua son las siguientes:

* Posee una alta integración con _GitHub_, pudiendo "activar" los repositorios sobre los cuales se quiere aplicar la integración continua de forma prácticamente directa.
* La configuración inicial es muy sencilla, ya que el archivo de configuración de la integración continua (_.travis.yml_) es muy fácil de elaborar, pero a la vez posee numerosas opciones para definir el ambiente de ejecución de la integración continua.
* Cada vez que se materialice un cambio en el repositorio de _GitHub_, se iniciará la ejecución de la integración continua y pruebas de forma automática.
* El servicio notifica de forma inmediata sobre los errores ocurridos en la construcción del proyecto
* El ambiente en el que se ejecutan las pruebas es altamente configurable, pudiendo ejecutar numerosas acciones e instalaciones (por ejemplo, de paquetes y otros programas), tal como si se estuviera en un sistema operativo independiente. De esta forma, si las pruebas requieren de sistemas "externos" (tal como _OpenLDAP_ o _MySQL_), estos pueden ser instalados en el ambiente de ejecución de _Travis-CI_ utilizando comandos _UNIX_.
* Los grupos de pruebas pueden ser ejecutados simultáneamente en diversas versiones de un mismo lenguaje de programación (validando la compatibilidad de la aplicación).

###Plataforma como Servicio (_PaaS_)

Para el despliegue de la aplicación se ha elegido el servicio [OpenShift](https://www.openshift.com/), para publicar el contenido y funcionalidades del sistema en línea.

Las razones por las que se decidió utilizar este sistema de Plataforma como Servicio son las siguientes:

* Cuenta con soporte para numerosos lenguajes de programación y aplicaciones de desarrollo _web_, tales como _Java_, _Python_, _PHP_, _Ruby_, y, por supuesto _node.js_.
* Provee acceso a almacenamiento persistente para las aplicaciones (_gears_), hasta un (1) Gb para cuentas gratuitas. Este almacenamiento permite incluir contenido generado por la aplicación u otro tipo de datos que deban conservarse en diferentes despliegues o ejecuciones del sistema.
* Dispone de un extenso grupo de servicios adicionales que pueden ser incluidos en el ambiente de la aplicación. Estos complementos, conocidos como "Cartuchos" (_Cartridges_) pueden ser declarados como dependencias de la aplicación durante la creación inicial del sistema, o pueden ser agregados de forma dinámica tras haber desplegado la aplicación (en caso de que ocurran cambios en la implementación o diseño del sistema).
* Entre los complementos más conocidos y utilizados, se encuentran los servicios de bases de datos, tanto tradicionales (_MySQL_ y _PostgreSQL_), como novedosos (_Redis_ y _MongoDB_, entre otros). Dado que el proyecto _Gesco-UserManagement_ necesita integrar (o simular la integración) de diversas fuentes de datos, contar con múltiples opciones de prueba y configuración de estos servicios resulta sumamente útil.
* La configuración de los complementos adicionales (por ejemplo, aquellos que requieran autenticación, como _MySQL_ o _PostgreSQL_) se realiza mediante el uso de variables de entorno que genera automáticamente la plataforma. Utilizando estas variables en el código de programación de la aplicación, se puede aumentar la portabilidad y compatibilidad del sistema en múltiples ambientes de desarrollo, prueba y despliegue (simplemente hay que definir estas variables en cada ambiente en el que se desee ejecutar la aplicación, utilizando la información del servicio que se esté utilizando).
* Los despliegues pueden configurarse para que se realicen automáticamente desde el sistema de Integración Continua. En el proyecto _Gesco-UserManagement_ se utiliza _Travis-CI_, el cual puede ejecutar el despliegue de la aplicación en _OpenShift_ tras superar exitosamente los _tests_ unitarios que han sido definidos. La comunicación entre _Travis-CI_ y _OpenShift_ se realiza agregando sencillas instrucciones al archivo de configuración _.travis.yml_ del proyecto.
* Se integra de forma automática y completa con la configuración del proyecto definida en el archivo _package.json_, así como con _npm_.
* Permite el acceso directo a los _logs_ y otros archivos informativos de la aplicación (y cada uno de los despliegues de la misma).
* Permite realizar conexiones de tipo _SSH_ a la aplicación desplegada, utilizando los comandos propios de _rhc_.
* Los comandos de _OpenShift_ (_rhc_) permiten realizar numerosas acciones y operaciones sobre la aplicación deplegada, tales como crear nuevas aplicaciones, agregar complementos de forma dinámica, editar la configuración de una aplicación desplegada, consultar el estatus del sistema y los servicios agregados, etc.
* Las cuentas de tipo gratuita en _OpenShift_ tienen acceso a todos los complementos y servicios adicionales (_cartridges_) disponibles. Esta opción no la tienen otros sistemas de Plataforma como Servicio gratuitos.

Para configurar el despliegue automático de la aplicación en _OpenShift_, se siguieron los siguientes pasos:

* Instalar herramienta de línea de comandos de _Travis-CI_ (requiere al menos versión _1.9.3_ de _Ruby_)

 `gem install travis -v 1.8.0 --no-rdoc --no-ri`

* Instalar herramienta de línea de comandos de _OpenShift_ (requiere tener instalado _Ruby_ y _Git_)

 `gem install rhc`
 
* Crear aplicación de _OpenShift_ (con ambiente de despliegue de _node.js_)

 `rhc app create gescousermanagement nodejs-0.10`
 
* Configurar el archivo de configuración de _Travis-CI_, agregando la información necesaria en la sección _deploy_ para realizar el despliegue automático de la aplicación en _OpenShift_. En esta sección se indican los datos de la cuenta de _OpenShift_ que realizará el despliegue, la aplicación ya creada sobre la cual se actualizará el código fuente, y el dominio de _OpenShift_ (ya definido) en el que se alojará la aplicación. Esta configuración puede ser realizada con el comando

 `travis setup openshift`
 
 La configuración anterior permite que _Travis-CI_ despliegue automáticamente la aplicación en _OpenShift_ cuando se ejecuten y superen de forma exitosa todos los _tests_ unitarios definidos.
 
 El archivo de configuración de _Travis-CI_ actualizado puede ser consultado [aquí](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/.travis.yml).

* Agregar complemento (_cartridge_) para incluir servicio de _Redis_ en la aplicación creada

 `rhc add-cartridge http://cartreflect-claytondev.rhcloud.com/reflect?github=smarterclayton/openshift-redis-cart -a gescousermanagement`
 
* Agregar complemento (_cartridge_) para incluir servicio de _MySQL_ en la aplicación creada

 `rhc cartridge add mysql-5.5 -a gescousermanagement`
 
* Agregar complemento (_cartridge_) para incluir servicio de _PostgreSQL_ en la aplicación creada

 `rhc cartridge add postgresql-9.2 -a gescousermanagement`
 
* Para incrementar la portabilidad de la aplicación entre los ambientes de desarrollo, pruebas y despliegue, se debe incluir en el código fuente de la aplicación el uso de las variables de entorno de _OpenShift_, especialmente aquellas definidas por los servicios adicionales. Algunos ejemplos de esto se pueden observar en:

 - [Controlador para Autenticación](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/controllers/authController.js): utilizando las variables de configuración de los servicios de _Redis_ (_OPENSHIFT-REDIS-_...) y _MySQL_ (_OPENSHIFT-MYSQL-DB-_...)
 - [Configuración de Servicio _Web_ a desplegar](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/bin/www): incluyendo las variables de configuración del servidor _web_ de _Express_ para la publicación de la aplicación (_OPENSHIFT-NODEJS-_...)
 
El archivo con los comandos requeridos para la creación y definición de la infraestructura de la aplicación puede ser consultado en [appOpenShift.sh](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/config/deploy/appOpenShift.sh).

### Virtualización ligera (Contenedores)

Para la construcción y despliegue de un ambiente de pruebas funcional para la aplicación desarrollada, se utilizan contenedores [_Docker_](https://www.docker.com/).

Las razones para utilizar a _Docker_ como mecanismo de virtualización ligera con contenedores son las siguientes:

* Despliegue rápido de aplicaciones. Los contenedores incluyen los requerimientos mínimos de ejecución de las aplicaciones, reduciendo su tamaño y permitiendo que sean desplegados de forma rápida y ágil.
* Portabilidad entre distintos entornos (máquinas _host_). Una aplicación y todas sus dependencias son incluidas en un mismo y único contenedor que es independiente de la versión _Linux_ instalada en la máquina anfitriona, de la distribución de la plataforma, y del modelo de despliegue. Cualquier contenedor puede ser transferido a otra máquina que tenga instalado _Docker_, y ejecutado en esta sin ningún problema de compatibilidad.
* Control de versiones y reutilización de componentes. Se pueden supervisar y revisar versiones sucesivas de un mismo contenedor, inspeccionar diferencias entre las mismas, o volver a versiones anteriores. Los contenedores reutilizan componentes de capas (_layers_) anteriores, lo cual los hace evidentemente más ligeros.
* Los repositorios remotos pueden ser publicados y compartidos con otros desarrolladores.
* Mantenimiento simplificado. Al utilizar _Docker_, se reduce el esfuerzo y los riesgos de problemas con las dependencias tecnológicas de las aplicaciones.

Para configurar la creación de una imagen con un contenedor _Docker_ en la aplicación, se realizaron los siguientes pasos:

* Definir un archivo de configuración de _Docker_, denominado _Dockerfile_, ubicado en el directorio principal (raíz) del proyecto. El archivo _Dockerfile_ creado cuenta con las siguientes características:

 - Se especifica la imagen de _Docker_ base sobre la cual se definirán las dependencias de la aplicación, en este caso es una instalación simple de _Ubuntu 14.04_
 
  `FROM ubuntu:14.04`
 
 - Instalación de paquetes y herramientas requeridas por el proyecto para su construcción y despliegue. Se utiliza el gestor de componentes de _Ubuntu_ (_apt-get_) para instalar _git_ (descarga del repositorio con el proyecto), _NodeJS_ (lenguaje de programación sobre el que se construye y desarrolla la aplicación), _Redis_ y _MySQL_ (servicios de almacenamiento persistente de datos utilizado en el ambiente de pruebas de la aplicación)
 
  ```
  RUN apt-get update && apt-get install -y \
	  git \
	  git-core \
	  nodejs \
	  npm \
	  redis-server \
	  mysql-server \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
  ```

 - Exponer o publicar los puertos de los servicios de base de datos (_Redis_ y _MySQL_) a utilizar por la aplicación en el contenedor
 
  ```
  EXPOSE 6379
  EXPOSE 3306
  ```

 - Definir un directorio de almacenamiento para guardar los datos, _logs_ y otros archivos de configuración propios de los servicios de base de datos instalados
 
  `VOLUME ["/gesco-user-management/db/data"]`
 
 - Inicializar los servicios de _Redis_ y _MySQL_ en el contendor (configuración básica por defecto)
 
 - Clonar el repositorio con el código fuente asociado a la aplicación _Gesco-UserManagement_
 
 - Definir como directorio base de trabajo para los comandos en el contenedor, al directorio del repositorio del proyecto
 
  `WORKDIR "/Gesco-UserManagement"`
  
 - Instalar dependencias de la aplicación (librerías de _NodeJS_)
 
 - Desplegar aplicación, utilizando _Grunt_. El archivo con las actividades de despliegue se puede identificar [aquí](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/Gruntfile.js).
 
 - Definir actividades a realizar de forma automática cuando se inicie (_run_) la imagen del contenedor. Las actividades a realizar están especificadas en un _script_ denominado [start_docker_image.sh](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/start_docker_image.sh). Basicamente, las actividades son iniciar los servicios de _Redis_ y _MySQL_ (en segundo plano), y ejecutar la aplicación (_npm start_)
 
 El archivo de configuración de _Docker_ puede ser consultado [aquí](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/Dockerfile).
 
* Asociar la cuenta en _Github_ en la que se encuentra el repositorio del proyecto con una cuenta correspondiente en [_Docker Hub_](https://hub.docker.com/).

* Definir una "Construcción Automática" (_Automated Build_) de la imagen del contenedor _Docker_, desde _Docker Hub_. Con esto, cada vez que se realiza una actualización (_push_) del repositorio origen del código del proyecto, se re-construye de forma automática la imagen _Docker_ correspondiente.

La imagen _Docker_ publicada del proyecto _Gesco-UserManagement_ puede ser consultada [aquí](https://hub.docker.com/r/jfrancisco4490/gesco-usermanagement/).

Para descargar la imagen anterior, se puede utilizar directamente el comando

 `docker pull jfrancisco4490/gesco-usermanagement`
 
Para ejecutar la imagen tras su descarga, se ejecuta

 `docker run jfrancisco4490/gesco-usermanagement`

Si no se desea descargar directamente la imagen desde _Docker Hub_, se puede construir de forma local, utilizando el _Dockerfile_ anterior, y ejecutando el comando:

`docker build -t <etiqueta_imagen> <ubicacion_dockerfile>`