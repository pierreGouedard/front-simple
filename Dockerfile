ARG FRONT_PORT
FROM node:lts-alpine3.15 AS build

  # Enable bash
  RUN apk update && apk add bash 

  # Set working directory
  ENV APP_PATH /opt/front
  WORKDIR ${APP_PATH}

  # Install requirements
  COPY package.json ${APP_PATH}
  RUN npm config set registry http://registry.npmjs.org/ && npm install

  # Copy curr dir
  COPY . ${APP_PATH}

  # Build bundle
  #RUN npm run magic
  
  # Expose to local network
  EXPOSE 3000

  # Dev entry point for now
  CMD ["npm", "run", "devwebpack"]


