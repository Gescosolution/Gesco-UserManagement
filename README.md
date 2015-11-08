# Gesco-UserManagement
Submódulo correspondiente a la administración y control de datos de Usuarios y Empleados, enmarcado en la aplicación Gesco.

[![Build Status](https://travis-ci.org/Gescosolution/Gesco-UserManagement.svg?branch=master)](https://travis-ci.org/Gescosolution/Gesco-UserManagement)

Publicado bajo licencia GNU GENERAL PUBLIC LICENSE Version 2.

El presente módulo participa en el certamen de Proyectos libres de la Universidad de Granada 2015-2016, como parte del proyecto general [Gesco](https://github.com/Gescosolution/Gesco). Las bases de dicho certamen se encuentran [aquí](https://docs.google.com/document/d/16UsdUV_XXuPUh-Imz4PSgh-2ES_YaAJpZ8fNrbTVpMA/edit).

**Elaborado por:** Abel Josué Francisco Agra ([@jfrancisco4490](https://github.com/jfrancisco4490))

##Descripción

Consiste en un módulo _web_ para el sistema Gesco (Manejo y Planificación de Proyectos). 

Este módulo se encarga de gestionar, manejar y controlar la información correspondiente a los empleados de una determinada empresa. En principio, y para dar flexibilidad al sistema, se supone que la empresa puede tener múltiples oficinas y/o compañías filiales asociadas.

El presente módulo también debe incluir el desarrollo de un mecanismo de autenticación en la aplicación. Este mecanismo debe adaptarse a los estándares de seguridad de la empresa, la cual podría tener desplegado en su plataforma interna un sistema de autenticación previo, por ejemplo, basado en un [LDAP](https://es.wikipedia.org/wiki/Protocolo_Ligero_de_Acceso_a_Directorios).

La integración con los mecanismos de seguridad de la empresa deben extenderse incluso a la definición de roles en el sistema, sin necesidad de cambiar la estructura organizacional de la compañía. Es decir, el módulo debe asociar los cargos de trabajo existentes en la compañía, a un rol válido y definido en el sistema de permisos de la aplicación Gesco.

Corresponde al módulo de Gesco integrarse con el sistema centralizado de seguridad y manejo de roles de la compañía, a fin de identificar el perfil del usuario que solicita el acceso a la aplicación, así como las funcionalidades o actividades que puede llevar a cabo (o no) en el sistema.

Además del área de autenticación y usuarios, el presente módulo también debe incluir un área de ingreso y edición de datos de empleados de la empresa.

Como ya se ha indicado, la empresa puede contar con numerosas oficinas y/o empresas filiales, cada una de las cuales podría tener un sistema de almacenamiento de datos de empleados que sea independiente al resto. Por ello, es necesario que el sistema se comunique con las bases de datos de cada oficina, a fin de consultar los datos de los empleados que tienen registrados, y poder realizar una especie de _importación_ en la plataforma (evitar inconsistencias al momento de registrar los datos de un nuevo empleado en Gesco).

##Requerimientos

A continuación se listan algunos requerimientos básicos del módulo de administración de usuarios:

* Controlar el acceso al sistema, realizando consultas en la plataforma centralizada de autenticación de usuarios y manejo de roles ya definida en la empresa.
* Determinar el acceso que tiene el usuario a la información y funcionalidades en el sistema, en base a su cargo en la empresa y la oficina a la que pertenece. El rol debe ser el resultado de "convertir" el cargo del usuario en la empresa (existente en el sistema centralizado de autenticación) en un perfil válido ya definido en Gesco.
* Gestionar los datos de los empleados de la empresa (Registro y Edición).
* Importar de forma "automática" la información de algunos empleados, tomándolos de la fuente de datos correspondientes (en base a la oficina o empresa filial a la que pertenezca el empleado).
* Estandarizar la presentación de información de los empleados de la compañía, cuando ésta provenga de diversas fuentes de datos.
* Generar informes estadísticos, gráficos y otras consultas básicas sobre el acceso de usuarios a la plataforma (Administrador).
    
##Motivación

En la actualidad, la gran mayoría de las empresas medianas y grandes cuentan con sistemas centralizados de autenticación y acceso de usuarios, de tal manera que todas las aplicaciones o sistemas que se desplieguen en su plataforma tecnológica deban integrarse a dicho sistema centralizado. Esto evita la redundancia de datos, y promueve la estandarización en la definición de roles y permisos en la institución. 

Es por esto que la motivación principal radica en el hecho de que el presente módulo de Administración de Usuarios puede ser adaptado a numerosas situaciones y realidades de empresas o instituciones sobre las que se quiera implantar el sistema Gesco. La flexibilidad del módulo permite que pueda ser incluido en numerosos contextos de seguridad y acceso de usuarios, o de distribución de la información. Más aún, el módulo puede ser desplegado para empresas pequeñas, medianas, o incluso grandes con numerosas oficinas y/o compañías filiales.

Finalmente, el presente desarrollo permitirá adquirir conocimientos en implementación/pruebas de módulos de forma independiente, elaboración de mecanismos de integración con sistemas externos y heterogéneos, y, por supuesto, despliegue de aplicaciones y componentes en la nube (_Cloud Computing_).

##Procedimiento de Realización

El desarrollo del proyecto seguirá los siguientes lineamientos:

* La metodología de desarrollo de software será [DevOps](https://en.wikipedia.org/wiki/DevOps), la cual enfoca el proceso de implementación y despliegue hacia las pruebas (principalmente unitarias, aunque no de forma exclusiva), la integración continua, la automatización de tareas y un enfoque multidisciplinario del trabajo.
* Al ser un sistema _web_, se elaborará bajo el patrón [Modelo-Vista-Controlador](https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador).
* Para la interfaz del sistema y navegación se utilizará el motor de plantillas _web_ [JADE](http://jade-lang.com/).
* Para desarrollar y controlar la lógica del módulo, se empleará [Node.js](https://nodejs.org/en/).
* Para validar la integración del módulo con un sistema de autenticación externo, se configurará un servidor _LDAP_, utilizando [OpenLDAP](http://www.openldap.org/).
* A fin de simular la distribución y carga de datos de empleados de diversas fuentes de datos, se definirán al menos dos (2) bases de datos: una con [MySQL](http://www.mysql.com/), y otra con [VoltDB](https://voltdb.com/).
* Se utilizará el _framework_ [Express](http://expressjs.com/), para el desarrollo de aplicaciones _web_ basadas en _Node.js_
* Para la realización de pruebas se empleará el _framework_ [Mocha](https://mochajs.org/).
* Para la ejecución de la integración continua se planea utilizar el servicio [Travis CI](https://travis-ci.org/).
* El despliegue automático se realizará mediante [Flightplan](https://www.npmjs.com/package/flightplan).
* Finalmente, y al haber alcanzado un nivel de funcionalidad estable, desplegar el módulo en una plataforma ofrecida como servicio (_PaaS_), tal como [Microsoft Azure](https://azure.microsoft.com/en-us/). 

##Relación con la asignatura

El desarrollo del módulo de Administración de Usuarios de Gesco, se corresponde con la asignatura de _Cloud Computing_, al menos, en los siguientes aspectos:

* La implementación, proceso de pruebas y despliegue del módulo se realizará aplicando los conceptos indicados en la asignatura, a saber: Desarrollo Basado en Pruebas, Distribución de Componentes, Integración Continua, Automatización de tareas y actividades, Aprovisionamiento de Software y Despliegue Automático.
* La integración del presente módulo con sistemas externos que no forman parte de la aplicación Gesco, y que, en principio, podrían estar distribuidos geográfica y tecnológicamente, tales como las fuentes de datos de empleados de cada oficina, o el sistema LDAP de autenticación centralizada.