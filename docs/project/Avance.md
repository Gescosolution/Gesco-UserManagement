# Gesco-UserManagement
Submódulo correspondiente a la administración y control de datos de Usuarios y Empleados, enmarcado en la aplicación Gesco.

**Elaborado por:** Abel Josué Francisco Agra ([@jfrancisco4490](https://github.com/jfrancisco4490))

##Avance del Proyecto

###Estructura del proyecto

El proyecto _Gesco-UserManagement_ sigue los lineamientos de desarrollo del patrón MVC (Modelo-Vista-Controlador), por tanto se identifican los siguientes directorios:

* **_models:_** para incluir la definición de los esquemas de las fuentes de datos, así como la carga inicial de datos de prueba en las mismas. Los modelos pueden ser internos del sistema _Gesco_ (directorio _local_) o simulaciones de almacenamientos de datos externos (_external_).
* **_controllers:_** parecido a la definición de rutas (_routes_) en _node.js_. Permiten definir el comportamiento o la implementación de la lógica de la aplicación, definiendo eventos a los cuales el sistema debe responder.
* **_views:_** abarca la implementación de la estructura y estilo visual de la interfaz gráfica de la aplicación. Cada funcionalidad importante del submódulo (autenticación, usuarios y empleados) tiene un subdirectorio de vistas asociado e independiente.

###Autenticación de Usuarios

####Implementación

Para crear el componente de autenticación de usuarios se siguieron, en líneas generales, los siguientes pasos:

* Definir el esquema de base de datos (en _MySQL_) a utilizar para el modelo de datos del sistema _Gesco_, el esquema se encuentra [aquí](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/models/local/mysql/creacionTablasMySQL.sql)

* Especificar los _tests_ unitarios que deben definir la implementación de las funcionalidades del componente. Todos los _tests_ se encuentran en el archivo [_test.js_](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/test/test.js).

* Implementar el controlador asociado a los eventos de autenticación de usuarios, el cual se puede consultar [aquí](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/controllers/authController.js). Este controlador requiere diversos módulos _npm_ para funcionar: el de interacción _Redis_-_node.js_, el de interacción _MySQL_-_node.js_, y el de criptografía _MD5_.

* Definir una vista con los elementos de interfaz (formulario) necesarios para realizar la autenticación de usuarios. El formulario puede encontrarse [aquí](https://github.com/Gescosolution/Gesco-UserManagement/blob/master/views/auth/auth.jade). Para el estilo visual de la interfaz gráfica, se utiliza la librería _Bootstrap 3.3.5_.

####Funcionamiento

La funcionalidad de autenticación de usuarios permite verificar si una determinada persona se encuentra registrada en el sistema centralizado de seguridad de la empresa (simulado por un servidor _Redis_). Si el usuario que intenta acceder es encontrado en dicho sistema, se procede a determinar si el cargo de dicha persona en la empresa corresponde a un rol válido en la plataforma _Gesco_. Si el usuario no existe en el sistema centralizado de seguridad o no tiene un rol válido para el acceso a _Gesco_, el sistema rechaza el acceso del usuario. En caso de superar ambas validaciones, la aplicación presenta la página de inicio del sistema, en la cual aparece el usuario que ha iniciado sesión, la oficina a la que pertenece (que fue obtenida del sistema centralizado de seguridad), y el rol del usuario en la plataforma _Gesco_.

En general, el componente de autenticación de usuario permite realizar las siguientes operaciones/validaciones:

* El usuario no puede dejar ningún campo en blanco (nombre de usuario y/o contraseña).
* Si la combinación de usuario/contraseña ingresada no corresponde a un registro en el servidor centralizado de seguridad, se rechaza el acceso a la plataforma.
* Si la combinación de usuario/contraseña ingresada existe en el sistema de seguridad pero dicho usuario no posee un cargo en la empresa que se asocie con un rol en _Gesco_, el sistema rechaza el acceso.
* Si la combinación de usuario/contraseña ingresada es correcta y además, el cargo del trabajador corresponde a un rol válido, el sistema permite el acceso del usuario a la plataforma.
* Tras iniciar sesión, el usuario puede cerrar dicha sesión, lo cual hace que vuelva a la pantalla de acceso del sistema.