#!/bin/bash
# Sample docker start script that exposes the ip address to connect
# and mount the following directories to easily change them outside of docker
# - app: to allow change of app.js
# - example: to allow to change the maze
# - textures: to allow to change the textures in particular wall_special
ifconfig | grep 10.165.
docker run -it -p 8080:8080 -v $(pwd)/app/:/workspace/app/ -v $(pwd)/app/examples/:/workspace/app/examples/ -v $(pwd)/app/textures/:/workspace/app/textures/ fbrnc/workshop-maze-vr:v1
