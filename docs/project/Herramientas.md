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