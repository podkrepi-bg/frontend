# Base Stage
FROM golang:1.16-alpine as base
ARG APP_PATH=/app
ARG DB_MIGRATIONS_PATH=/db/migrations
WORKDIR $APP_PATH
RUN apk --no-cache add curl
COPY . $APP_PATH
RUN go mod download && mkdir -p dist
EXPOSE 5000

# Development Stage
FROM base as development
RUN go get github.com/githubnemo/CompileDaemon
ENTRYPOINT CompileDaemon --build="go build -o dist/api main.go" --command=./dist/api

# Test Stage
FROM base as test
ENTRYPOINT make test

# Build Production Stage
FROM base as builder
ARG APP_PATH=/app
WORKDIR $APP_PATH
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o dist/api main.go

# Production Stage
FROM alpine:latest as production
RUN apk --no-cache add ca-certificates curl
COPY --from=builder /app/dist/api /app/dist/api
CMD ["/app/dist/api"]
