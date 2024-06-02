set -x
openssl req -x509 -nodes -days 30000 -newkey rsa:2048 -keyout cert.key -out cert.pem -config config.txt
