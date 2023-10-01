set -e
echo "INFO: copy mginx.conf"
cp nginx.conf ../nginx/conf/

echo "INFO: remove  document root folder"
rm -rf ../nginx/html/*

echo "INFO: build document root folder html/"
cp -r html/* ../nginx/html/

