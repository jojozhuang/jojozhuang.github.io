# https://github.com/envygeeks/jekyll-docker/blob/master/README.md
#
# Builder stage.
# This state compile our jekyll site to get static files
#
FROM jekyll/minimal:4.2.0 AS builder

WORKDIR /usr/src/app

COPY . .

RUN chmod 777 /usr/src/app -R

RUN JEKYLL_ENV=nas jekyll build

#
# Production stage.
# This state compile get back the static files from builder stage
#
FROM nginx:1.19.8-alpine

## We just need the build to execute the command
COPY --from=builder /usr/src/app/_site /usr/share/nginx/html/