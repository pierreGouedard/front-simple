# Authentication microservice

### Description
This module implement a react app.

### Run test 
TODO

### Run locally:

```commandline
npm run devwebpack
```

/!\ Make sure there is a Postgres server & the authentication service running locally. In addition, make sure connection information in dev.env 
are correct.  

### Run with docker
**Step 1**: Create env file to use in dockerfile. /!\ No secret should be kept here.

**Step 2**: Build Docker file:

```commandline
docker build --pull --build-arg FRONT_PORT=3000 -t front-simple:latest .
```

**Step 3** run container:

```commandline
sudo docker run -e ENV_PATH='envs/dckr.env' \
    --volume ${HOME}/api-simple/front-simple/src:/opt/front/src -a STDOUT -a STDERR front-simple:latest
```

/!\ Make sure there is a Postgres server & the authentication service running locally. In addition, make sure connection information in dev.env 
are correct.  

### RUN with deploy-simple (Preferred)

Go to deploy-simple and read the doc.