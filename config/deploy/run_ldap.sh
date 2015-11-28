#!/bin/bash
mkdir /tmp/slapd
slapd -f config/ldap/slapd.conf -h ldap://localhost:3389 &
sleep 3
ldapadd -h localhost:3389 -D cn=admin,dc=localhost -w test -f models/local/ldap/ldap_empresa.ldif
ldapadd -h localhost:3389 -D cn=admin,dc=localhost -w test -f models/local/ldap/ldap_oficinas.ldif
ldapadd -h localhost:3389 -D cn=admin,dc=localhost -w test -f models/local/ldap/ldap_roles.ldif
ldapadd -h localhost:3389 -D cn=admin,dc=localhost -w test -f models/local/ldap/ldap_empleados.ldif