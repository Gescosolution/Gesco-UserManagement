// Cargar módulo de Redis
var redis = require('redis');

// Cargar módulo de Criptografia
var MD5 = require('crypto-js/md5');

// Crear cliente para acceder al servidor Redis
client = redis.createClient();

// Conectar a base de datos "2"
client.select(2);

// Crear atributos de usuarios
client.hset(["usuario1", "username", "usuario1"], redis.print);
client.hset(["usuario1", "password", MD5("usuario1")], redis.print);
client.hset(["usuario1", "oficina", "oficina1"], redis.print);
client.hset(["usuario1", "cargo", "lider"], redis.print);

client.hset(["usuario2", "username", "usuario2"], redis.print);
client.hset(["usuario2", "password", MD5("usuario2")], redis.print);
client.hset(["usuario2", "oficina", "oficina1"], redis.print);
client.hset(["usuario2", "cargo", "secretario"], redis.print);

client.hset(["usuario3", "username", "usuario3"], redis.print);
client.hset(["usuario3", "password", MD5("usuario3")], redis.print);
client.hset(["usuario3", "oficina", "oficina2"], redis.print);
client.hset(["usuario3", "cargo", "lider"], redis.print);

client.hset(["usuario4", "username", "usuario4"], redis.print);
client.hset(["usuario4", "password", MD5("usuario4")], redis.print);
client.hset(["usuario4", "oficina", "oficina2"], redis.print);
client.hset(["usuario4", "cargo", "administrador"], redis.print);

client.hset(["usuario5", "username", "usuario5"], redis.print);
client.hset(["usuario5", "password", MD5("usuario5")], redis.print);
client.hset(["usuario5", "oficina", "oficina3"], redis.print);
client.hset(["usuario5", "cargo", "gerente"], redis.print);

client.hset(["usuario6", "username", "usuario6"], redis.print);
client.hset(["usuario6", "password", MD5("usuario6")], redis.print);
client.hset(["usuario6", "oficina", "oficina3"], redis.print);
client.hset(["usuario6", "cargo", "lider"], redis.print);

client.hset(["usuario7", "username", "usuario7"], redis.print);
client.hset(["usuario7", "password", MD5("usuario7")], redis.print);
client.hset(["usuario7", "oficina", "oficina4"], redis.print);
client.hset(["usuario7", "cargo", "lider"], redis.print);

client.hset(["usuario8", "username", "usuario8"], redis.print);
client.hset(["usuario8", "password", MD5("usuario8")], redis.print);
client.hset(["usuario8", "oficina", "oficina4"], redis.print);
client.hset(["usuario8", "cargo", "asistente"], redis.print);

client.quit();