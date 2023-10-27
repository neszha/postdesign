## Build command: docker build -t postdesign . || docker build --no-cache -t postdesign .

## Build image.
FROM node:lts-alpine3.16
WORKDIR /app
COPY . .

## Run commands.
RUN mkdir storage

# Run command on container starting.
CMD yarn install --production && node .