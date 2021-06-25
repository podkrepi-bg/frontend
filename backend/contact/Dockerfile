FROM ghcr.io/podkrepi-bg/go-devcontainer:v1.0.0 AS build
WORKDIR /app
COPY . /app

RUN task build

FROM alpine:3.14
EXPOSE 5000

COPY --from=build /app/output/contact /app/
CMD [ "/app/contact" ]