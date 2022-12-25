#!/bin/bash

echo "Hello from shell script"

check=$(curl http://localhost:8080/health)

if [[ "$check" == "ok" ]]; then
exit 0 # exit status 1 means that the script "fails"
fi

exit 1 