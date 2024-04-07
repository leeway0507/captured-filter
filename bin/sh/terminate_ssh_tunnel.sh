PIDS=($(ps aux | grep '[s]sh -fN' | awk '{print $2}'))

if [ ${#PIDS[@]} -gt 0 ]; then
    echo "SSH tunnel processes found with PIDs: ${PIDS[@]}. Terminating..."
    # Terminate the SSH tunnel processes
    for PID in "${PIDS[@]}"; do
        kill "$PID"
    done
    echo "SSH tunnel processes terminated."
else
    echo "No SSH tunnel process found."
fi
