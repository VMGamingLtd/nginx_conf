set -xe
cp certs/cert.key ../nginx/certs/
cp certs/cert.pem ../nginx/certs/
cp nginx.conf ../nginx/conf/
rm -rf ../nginx/html/*
cp -r www/* ../nginx/html/
