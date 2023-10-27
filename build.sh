## Build to docker image with version.
VERSION=$(node get-version.js)
docker build --no-cache -t "postdesign:$VERSION" .

## Extract docker image to file.
mkdir @releases
docker save postdesign | gzip > "@releases/postdesign-v.$VERSION.tar.gz"

## Remove image.
docker image rm "postdesign:$VERSION"

## Auto run image.
# docker-compose up -d
