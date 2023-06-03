set -x

# see: https://stackoverflow.com/questions/7250130/how-to-stop-mingw-and-msys-from-mangling-path-names-given-at-the-command-line/34386471#34386471
export MSYS_NO_PATHCONV=1

SUBJ='/C=xx/ST=unknown/L=unknown/O=unknown/OU=unknown/CN=local.galacticodyssey.space'
openssl req -x509 -newkey rsa:4096 -keyout cert.key -out cert.pem -sha256 -days 10000 -nodes -subj "$SUBJ"
