# Deployment

To deploy the module make sure you do the following:

- Update the container versions in `frontend/manifests/overlays/production/deployment.patch.yaml`
- Verify the environmental variables for the containers

View resulting yaml via Kustomize:

```shell
kubectl kustomize manifests/overlays/development
```

Apply via Kustomize:

```shell
kubectl apply -k manifests/overlays/development
```
