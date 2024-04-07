KEY_PATH="~/.ssh/captured.pem"
USERNAME="ubuntu"
IP_ADDRESS="43.201.98.25"
LOCAL_PORT="3336"
REMOTE_DB="db-captured.cheoqn0aa7xs.ap-northeast-2.rds.amazonaws.com:3306"
TERMINATE_SCRIPT="/Users/yangwoolee/repo/captured-filter/bin/sh/terminate_ssh_tunnel.sh"


# Establish the SSH tunnel
ssh -fN -i $KEY_PATH $USERNAME@$IP_ADDRESS -L $LOCAL_PORT:$REMOTE_DB

if [ $? -eq 0 ]; then
   echo "RUN SSH SUCCESSFULL!"
else
    echo "Failed"
    if [ -f $TERMINATE_SCRIPT ]; then
        source $TERMINATE_SCRIPT
    else
        echo "Termination script does not exist"
    fi
    exit 1
fi