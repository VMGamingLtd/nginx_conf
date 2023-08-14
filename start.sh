set -e
if [ "$1" = "--no-update" ]; then
  echo "INFO: no update"
else
  echo "INFO: update"
  ./update_local.sh
fi
cd ../nginx/
echo "INFO: start nginx"
./nginx.exe 
