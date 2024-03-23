# using ubuntu LTS version
FROM ubuntu:20.04 AS builder-image

# avoid stuck build due to user prompt
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y software-properties-common && \
	add-apt-repository ppa:deadsnakes/ppa &&\
	apt-get --no-install-recommends -y install python3.10 python3.10-dev python3.10-venv build-essential && \
	apt-get clean && rm -rf /var/lib/apt/lists/*

# create and activate virtual environment
# using final folder name to avoid path issues with packages
RUN python3.10 -m venv /home/myuser/venv
ENV PATH="/home/myuser/venv/bin:$PATH"

# install requirements
COPY requirements.txt .
RUN pip3 install --no-cache-dir wheel
RUN pip3 install --no-cache-dir -r requirements.txt

FROM ubuntu:20.04 AS runner-image
RUN apt-get update && apt-get install -y software-properties-common && \
	add-apt-repository ppa:deadsnakes/ppa &&\
	apt-get --no-install-recommends -y install python3.10 python3.10-venv && \
	apt-get clean && rm -rf /var/lib/apt/lists/*

RUN useradd --create-home myuser
COPY --chown=myuser:myuser --from=builder-image /home/myuser/venv /home/myuser/venv

RUN mkdir /home/myuser/code
WORKDIR /home/myuser/code
USER myuser
COPY --chown=myuser:myuser . .


EXPOSE 8000

# make sure all messages always reach console
ENV PYTHONUNBUFFERED=1

# activate virtual environment
ENV VIRTUAL_ENV=/home/myuser/venv
ENV PATH="/home/myuser/venv/bin:$PATH"
ENV ProductionLevel=True


CMD ["python","main.py"]
