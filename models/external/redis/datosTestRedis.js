// Cargar módulo de Redis
var redis = require('redis');

// Cargar módulo de Criptografia
var MD5 = require('crypto-js/md5');

// Configurar conexion a servidor Redis
// Incluida portabilidad con OpenShift
redis_host = process.env.OPENSHIFT_REDIS_HOST || '127.0.0.1';
redis_port = process.env.OPENSHIFT_REDIS_PORT || '6379';
redis_passw = process.env.REDIS_PASSWORD || '';
			
redis_url = "redis://:"+redis_passw+"@"+redis_host+":"+redis_port;
			
// Crear cliente para acceder al servidor Redis
client = redis.createClient(redis_url, {});

// Conectar a base de datos "2"
client.select(2);

// Vaciar base de datos actual
client.flushdb();

// Crear atributos de usuarios
client.hset(["usuario1", "username", "usuario1"], redis.print);
client.hset(["usuario1", "password", MD5("usuario1")], redis.print);
client.hset(["usuario1", "oficina", "Oficina1"], redis.print);
client.hset(["usuario1", "cargo", "Lider"], redis.print);

client.hset(["usuario2", "username", "usuario2"], redis.print);
client.hset(["usuario2", "password", MD5("usuario2")], redis.print);
client.hset(["usuario2", "oficina", "Oficina1"], redis.print);
client.hset(["usuario2", "cargo", "Secretario"], redis.print);

client.hset(["usuario3", "username", "usuario3"], redis.print);
client.hset(["usuario3", "password", MD5("usuario3")], redis.print);
client.hset(["usuario3", "oficina", "Oficina2"], redis.print);
client.hset(["usuario3", "cargo", "Lider"], redis.print);

client.hset(["usuario4", "username", "usuario4"], redis.print);
client.hset(["usuario4", "password", MD5("usuario4")], redis.print);
client.hset(["usuario4", "oficina", "Oficina2"], redis.print);
client.hset(["usuario4", "cargo", "Administrador"], redis.print);

client.hset(["usuario5", "username", "usuario5"], redis.print);
client.hset(["usuario5", "password", MD5("usuario5")], redis.print);
client.hset(["usuario5", "oficina", "Oficina3"], redis.print);
client.hset(["usuario5", "cargo", "Gerente"], redis.print);

client.hset(["usuario6", "username", "usuario6"], redis.print);
client.hset(["usuario6", "password", MD5("usuario6")], redis.print);
client.hset(["usuario6", "oficina", "Oficina3"], redis.print);
client.hset(["usuario6", "cargo", "Lider"], redis.print);

client.hset(["usuario7", "username", "usuario7"], redis.print);
client.hset(["usuario7", "password", MD5("usuario7")], redis.print);
client.hset(["usuario7", "oficina", "Oficina4"], redis.print);
client.hset(["usuario7", "cargo", "Lider"], redis.print);

client.hset(["usuario8", "username", "usuario8"], redis.print);
client.hset(["usuario8", "password", MD5("usuario8")], redis.print);
client.hset(["usuario8", "oficina", "Oficina4"], redis.print);
client.hset(["usuario8", "cargo", "Asistente"], redis.print);

client.quit();