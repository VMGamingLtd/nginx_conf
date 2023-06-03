set -x
openssl req -x509 -newkey rsa:4096 -keyout cert.key -out cert.pem -sha256 -days 10000 -nodes -subj '/C=xx/ST=unknown/L=unknown/O=unknown/OU=unknown/CN=test.galacticodyssey.space'
