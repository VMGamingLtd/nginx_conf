pids=$(ps -ef | egrep 'nginx$' | awk -c '{print $2}')
for pid in $pids
do
  echo "kiling proceess: $pid"
  kill $pid
done
