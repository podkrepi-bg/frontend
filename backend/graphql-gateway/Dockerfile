FROM ghcr.io/podkrepi-bg/go-devcontainer:v1.0.0 AS build
WORKDIR /app
COPY . /app

RUN task build

FROM alpine:3.14
COPY --from=build /app/output/graphql-gateway /app/
CMD [ "/app/graphql-gateway" ]