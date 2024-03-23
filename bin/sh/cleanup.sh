#!/bin/zsh

source ~/.zshrc

cleanup() {
    ports=(3000 3001 3002 3003 8080)

    for port in "${ports[@]}"; do
        pid=$(lsof -i :"$port" | awk 'NR==2 {print $2}')

        # Check if the PID is not empty before using it
        if [ -n "$pid" ]; then
            echo "Found PID $pid for port $port. Killing the process..."
            kill "$pid"
        fi
    done
}

cleanup