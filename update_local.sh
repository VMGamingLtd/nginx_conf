set -e
echo "INFO: copy mginx.conf"
cp nginx.conf ../nginx/conf/
echo "INFO: remove  document root folder"
rm -rf ../nginx/html/*
echo "INFO: copy document root folder"
cp -r html/* ../nginx/html/
