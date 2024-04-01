#!/bin/sh

# Define a function to handle the signals
handle_interrupt() {
    echo "Script interrupted. Clearing"
    exit 1
}

# Use trap to catch SIGINT (Ctrl+C) and EXIT signals
trap handle_interrupt SIGINT EXIT

BACKEND="/Users/yangwoolee/repo/captured-filter/backend/"
GO_COMPILE="CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -ldflags='-s -w' -installsuffix cgo -o compiler/GO_DEPLOYMENT ./main.go"

DOCKER_DIR="/Users/yangwoolee/repo/captured-filter/bin/"
DOCKER_DEPLOYMENT="docker-compose -f ./docker/deployment/docker_compose_build.deployment.yml"

DOCKER_SERVER="docker-compose -f docker_compose_server.deployment.yml"

echo "제품 배포 중 ......"

# Run npm build and Go compile in parallel
npm run build --prefix frontend &

echo "Compiling Golang...."
cd "$BACKEND" && eval "$GO_COMPILE" &

# Wait for all background jobs to finish
wait

if [ $? -eq 0 ]; then
    echo "Finished!!"
else
    echo "Compiling Failed"
    exit 1
fi

cd "$DOCKER_DIR" &&
$DOCKER_DEPLOYMENT build &&
$DOCKER_DEPLOYMENT push

if [ $? -eq 0 ]; then
    echo "로컬 내 Dockerfile 빌드 및 푸시 성공"
else
    echo "로컬 내 Dockerfile 빌드 및 푸시 실패"
    exit 1
fi

ssh -i ~/.ssh/captured.pem ubuntu@43.201.98.25 "cd captured-filter && \
docker system prune -f && \
$DOCKER_SERVER down && \
$DOCKER_SERVER pull && \
$DOCKER_SERVER up -d
"

if [ $? -eq 0 ]; then
    echo "로컬 내 Dockerfile 빌드 및 원격 배포가 성공적으로 완료되었습니다."
else
    echo "로컬 내 Dockerfile 빌드 및 원격 배포 실패"
    exit 1
fi