#!/bin/zsh
source ~/.zshrc

DIR="/Users/yangwoolee/repo/captured-filter/bin/"
BACKEND="/Users/yangwoolee/repo/captured-filter/backend/"
DOCKER_LOCAL="docker-compose -f ./docker/local/docker_compose.local.yml up --build"
GO_COMPILE="CGO_ENABLED=0 GOOS=linux go build -a -ldflags='-s -w' -installsuffix cgo -o compiler/GO_LOCAL ./main.go"

npm run build --prefix frontend &&

echo "Compiling Golang...."
cd "$BACKEND" && eval "$GO_COMPILE"
echo "Finished!!"


cd "$DIR" && eval $DOCKER_LOCAL

echo "Current directory: $current_dir"

if [ $? -eq 0 ]; then
    echo "로컬 내 Dockerfile 빌드 성공"
elif [ $? -eq 127 ]; then
    echo "에러 : Colima 실행 필요"
    exit 1
else
    echo "로컬 내 Dockerfile 빌드 실패"
    exit 1
fi



