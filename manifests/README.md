# Deployment

To deploy the module make sure you do the following:

- Update the container versions in `web.yaml`
- Verify the environmental variables for the containers

After that run:

```bash
kubectl create namespace podkrepi-frontend
kubectl apply -f web.yaml
```
