INSERT INTO OFICINA (CODIGO, NOMBRE, DIRECCION) VALUES ('oficina1','Primera Oficina','Direccion Primera Oficina');
INSERT INTO OFICINA (CODIGO, NOMBRE, DIRECCION) VALUES ('oficina2','Segunda Oficina','Direccion Segunda Oficina');
INSERT INTO OFICINA (CODIGO, NOMBRE, DIRECCION) VALUES ('oficina3','Tercera Oficina','Direccion Tercera Oficina');
INSERT INTO OFICINA (CODIGO, NOMBRE, DIRECCION) VALUES ('oficina4','Cuarta Oficina','Direccion Cuarta Oficina');

INSERT INTO ROL (CARGO, ROL_GESCO) VALUES ('Administrador','Administrador');
INSERT INTO ROL (CARGO, ROL_GESCO) VALUES ('Lider','Lider');
INSERT INTO ROL (CARGO, ROL_GESCO) VALUES ('Lider_Proyecto','Lider');
INSERT INTO ROL (CARGO, ROL_GESCO) VALUES ('Lider_Oficina','Lider');
INSERT INTO ROL (CARGO, ROL_GESCO) VALUES ('Gerente','Gerente');

INSERT INTO ROL_OFICINA (ROL_GESCO, COD_OFIC) VALUES ('Administrador','oficina2');
INSERT INTO ROL_OFICINA (ROL_GESCO, COD_OFIC) VALUES ('Gerente','oficina3');
INSERT INTO ROL_OFICINA (ROL_GESCO, COD_OFIC) VALUES ('Lider','oficina1');
INSERT INTO ROL_OFICINA (ROL_GESCO, COD_OFIC) VALUES ('Lider','oficina2');
INSERT INTO ROL_OFICINA (ROL_GESCO, COD_OFIC) VALUES ('Lider','oficina3');
INSERT INTO ROL_OFICINA (ROL_GESCO, COD_OFIC) VALUES ('Lider','oficina4');