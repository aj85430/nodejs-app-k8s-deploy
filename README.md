# nodejs-app-k8s-deploy

# steps


Task 1:

We can use minikube, kind, self-hosted Kubernetes cluster, cloud-managed Kubernetes cluster or killerkoda/kodekloud provided playgrounds. As I don't have much resources on local system I have used Killerkoda. We can install specific tools we required in playground such as helm , docker, git, npmn, node etc.

Task 2:

I have taken a simple node-express-based hello world app.

Added the Dockerfile for the same. Build the docker image and push the image to the docker hub (self account) so that we can pull it at the time of deployment.

commands:

docker login
docker build -t aj85430/nodejs-k8s-app:1.0 .
docker push aj85430/nodejs-k8s-app:1.0

Task 3: 

Created the helm chart for the repo using the command "helm create node-app-chart"

Remove the unnecessary files.

Edited the values.yaml file as per the requirement. Changed image path, replicas, enabled ingress, disabled service account etc. Modified the ingress section as per the requirement.


Task 4:

Test and Deploy the chart using the below commands:

helm lint .
helm install --dry-run my-release node-app-chart/
helm install aman node-app-chart/   //here the release name is aman

Check the status now

helm list
k get deploy
k get svc
k get po 
k get ing

Deploy the nginx ingress controller:

We can use the helm chart for the same: 

helm upgrade --install ingress-nginx ingress-nginx   --repo https://kubernetes.github.io/ingress-nginx   --namespace ingress-nginx --create-namespace

Check the status of pod, service, and other objects in the ingress-nginx namespace.

To verify whether it is working or not I have added the host in the /etc/hosts file as the load-balancer is not provisioned as not using any cloud or any provider.

vi /etc/hosts

add and save it --> 127.0.0.1 chart-example.local

Now to test forward the traffic to the port 80 and curl the host

k port-forward -n ingress-nginx services/ingress-nginx-controller 3000:80

curl --resolve chart-example.local:3000:127:0.0.1 http://chart-example.local:3000

the above command should print "Hello World"

Task 5

Update the server.js file and put anything else in place of "Hello World".
Build the dockerfile again and create the image and push it to the docker hub.
Update the new image path in the values.yaml file.
Run the helm upgrade command:  helm upgrade aman node-app-chart/
Check the status of pods.
Do a curl again. You should be able to see the new content instead of Hello World.

To roll back:
helm rollback aman
Check the status of pods.
Do a curl again. 

To un-install:
helm uninstall aman

Best Practices:

For different environments we can use different values file such as for sit values-sit.yaml, for uat values-uat.yaml and for prod values-prod.yaml. In this way we can use generic templates and rendered the required values as per the enviroments.

 













