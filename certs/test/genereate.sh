set -x
openssl req -newkey rsa:4096 -keyout cert.key -x509 -days 10000 -out cert.pem -nodes
