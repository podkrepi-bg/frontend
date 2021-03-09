# Using skaffold for Native Kubernetes development

If you want your code to be dynamically deployed to kubernetes

## Prerequisites

- Install [minikube](https://minikube.sigs.k8s.io/docs/start/) for Linux or [Docker Desktop](https://www.docker.com/products/docker-desktop) for Win or Mac
- Install [skaffold](https://skaffold.dev/docs/install/)

## Quickstart

Just run this directly int the code folder. It will build the image, publish to local docker registry and deploy to Kubernetes. Then will start listening for changes in your workfolder and deploy automatically the new version to Kubernetes

```shell
skaffold dev --port-forward=true
```

to see what was deployed use:

```shell
kubectl get pods --namespace podkrepi-dev
```

## Stopping the listener

- when you press Ctrl+C it will clear the deployment from kubernetes
- if you don't wait the cleanup to finish some resources could remain, to clean just run:

```shell
skaffold delete
```

## Things to know about Cockroachdb install

- cockroachdb is installed in singlenode mode, without passwords to ease development
- cockroachdb is recreated each time, if you don't want recreation, comment the manifest line in skaffold.yaml
- portforwarding for cockroachdb won't work from the first run because it is slow to start. Just Ctrl+C and run skaffold dev again.

## Cleanup

- skaffold will create a lot of temporary images in docker, to clean everything:

```shell
docker system prune
```

or start skaffold like this:

```shell
skaffold dev --no-prune=false --cache-artifacts=false --no-prune-children=false --port-forward=true
```

## How to configure from ground zero

```shell
docker-compose -f ./docker-compose.yml --env-file=.env.example config > docker-compose-resolved.tmp \
  && skaffold init --compose-file docker-compose-resolved.tmp
```
