set -xe
cp certs/cert.key ../nginx/certs/
cp certs/cert.pem ../nginx/certs/
cp nginx.conf ../nginx/conf/
cp www/index.html ../nginx/html/
