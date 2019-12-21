#!/bin/bash

if [ "$1" = "--not-only-for-localhost" ] || [ "$1" = "-n" ]; then
    PUBLISH_HOST=""
else
    PUBLISH_HOST="127.0.0.1:"
fi

PUBLISH_PORT=1890

echo "Starting Node-RED with node-red-contrib-vestel-tv installed."
echo "Running in (publishing) port $PUBLISH_HOST$PUBLISH_PORT ..."
echo "Stop the container with 'docker stop node-red-with-vestel-testing'"
echo "NOTE: Any flows get deleted when the container is stopped!"

docker run --entrypoint "npm" --rm -d -p $PUBLISH_HOST$PUBLISH_PORT:1880 --name node-red-with-vestel-testing node-red-vestel-test start -- --userDir /data

echo "Logs (hit CTRL+C to exit):"
docker logs -f node-red-with-vestel-testing
