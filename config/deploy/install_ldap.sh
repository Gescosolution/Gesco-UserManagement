#!/bin/bash
if [ -z ${OPENSHIFT_NODEJS_IP+x} ]; then 
	echo "Despliegue en OpenShift? No..."; 
else 
	apt-get install ldap-utils
	apt-get install slapd
fi