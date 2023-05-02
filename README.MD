Kubernetes 101 Series: Part 1 - What is Kubernetes and its fundamental components?

Kubernetes 101 Series: Part 1

Welcome to my new blog series about Kubernetes! With this series, you’ll follow me as we refresh ourselves with Kubernetes and explore everything from containerization to common misconceptions developers have about Kubernetes to how to build a containerized app!

We'll be covering the following Kubernetes topics/themes:
Part 1: What is Kubernetes and its fundamental components?
In this post, we'll review what Kubernetes is and what it does. We'll also cover the basics of containerization, how Kubernetes helps manage containers, and the architecture of Kubernetes, exploring the different components that make up a Kubernetes cluster.
Part 2: What are common misconceptions Developers have about Kubernetes?
Kubernetes has become an essential tool for developers working with containerized applications. However, there are still many misconceptions and myths surrounding Kubernetes that can lead to confusion and frustration. This post will discuss common misconceptions developers may have about Kubernetes and how to avoid them.
Part 3: How do you containerize an application?
In this post, we'll walk through containerizing an application with Kubernetes step-by-step. By the end of this post, you'll have a working application running in a Kubernetes cluster!

Now, let us begin!
 
Background

When I started my advocacy role for a continuous delivery (CD) platform for Kubernetes applications, I needed to learn Kubernetes quickly! Even though I was a backend engineer prior, my team and I never took steps to containerize our applications in the cloud and deploy them to production, so I hadn’t had first-hand experience with Kubernetes in a production environment when I started working with Kubernetes.
Yet, during my advocacy role for a CD platform, I recognized the importance of knowing Kubernetes and how it can help you design, deploy, and manage containerized applications more effectively and make you a more valuable and effective engineer.

What does it mean to “containerize” an application?

Remember when I mentioned that my engineering team and I still needed to take steps to containerize our applications? Let's clarify what a containerized application is and how this ties to Kubernetes.
 A containerized application is a way to package software or an application in a way that runs consistently across different environments. For example, in a production environment, you need to manage the container running your software/application and ensure no outages or downtime.
Traditional Deployment vs. Containerized Deployment
Traditional Deployment vs. Containerized Deployment
Here’s a diagram comparing a traditional application deployment to a containerized application deployment. 
A traditional application deployment runs directly on top of the operating system and hardware of the host machine. This approach can lead to dependencies and compatibility issues between the application and the underlying system, which makes it difficult to move an application between environments when deploying.
With containerized application deployment, the application is packaged in a container that includes all of the necessary dependencies and libraries for that app to run. The container runs on top of a runtime, providing an isolated environment for the application. This approach makes it easier to deploy the application across different environments. Since the container can be stopped and started between different hosts, you don’t have to worry about dependencies or compatibility issues. 

So, imagine if your container containing your application, binaries, dependencies, and hardware is compromised. Yikes! Well, luckily, you can use another container and start it – but wouldn't it be nice if there was a system to handle that? This is where Kubernetes comes into play, and containers' immutability is critical to successfully handling your containerized apps. 
This concept of immutability refers to the idea that once a container is created, it should not be modified or updated directly. A new version of the container should be created with the necessary changes, and the old version should be replaced with the new one. This ensures consistency and predictability in an application’s behavior, and Kubernetes enables rolling updates when a new version of a container can be deployed and replaces the old container version. Kubernetes also uses replica sets to ensure a specified number of container instances are always running. Kubernetes supports read-only file systems, meaning a container file system cannot be modified once deployed.

Overall, Kubernetes provides a range of features that will enable you to implement immutable containers and ensure the reliability and security of your containerized app. Now, let’s review what Kubernetes is, how it operates, and what specific features it offers for your containerized applications.

What is Kubernetes, and what does it do?

Kubernetes is a platform that helps us manage multiple containers across multiple environments. Don’t confuse Kubernetes as a platform; Kubernetes isn't necessarily hardware since it operates at the container level. However, to better understand Kubernetes, it's an open-source orchestration system designed by Google to help manage containers at scale. Kubernetes provides a flexible framework that automates manual processes when deploying and scaling your containerized applications and allows you to manage your applications at scale easier.
So, whenever multiple containers are running your applications, and a container fails, Kubernetes will handle the container failure by replacing the faulty container with a new one. Kubernetes handles this process automatically by restarting, replacing, and then killing failed containers that do not respond to a health check.
Let's be clear – Kubernetes doesn't create the containers; it simply helps you manage and orchestrate them. You can use tools like Docker, Amazon Elastic Kubernetes Service, Google Kubernetes Engine, or others to create a container!

Wait - HOW does Kubernetes manage and orchestrate containers?

Let's explore how Kubernetes supports your containerized applications. First, we should clarify that Kubernetes doesn't run your containers directly - Kubernetes wraps one or more containers in a pod. The containers within a pod share resources and a network, allowing containers to communicate easily with one another if they're in the same pod. That said, pods should only hold tightly coupled containers, allowing containers to share resources and dependencies and making it easier to coordinate when and how a container is terminated.
For example, you could have a sidecar container that provides additional functionality to a main application container, such as logging, monitoring, or a security feature. The sidecar container can run alongside the main container in the same Pod (hence the “sidecar” reference), allowing it to share the same namespace and volumes for the network. Allocating multiple containers in a single pod can simplify managing communication between different services and provide additional functionality through sidecar containers. 
However, what is a pod? Pods are a group of containers deployed on a single node that share resources and allow you to move your containers around a cluster easily, hence the example above. Yet, we should note that you don't directly create pods in Kubernetes – you or a controller create the pods.
Kubernetes architecture overview
Kubernetes Architecture
I know, I know – it's confusing! Container? Pod? Node? Cluster? Huh.

Above is a diagram that walks you through the architecture of Kubernetes, yet it's still a bit complex to understand fully. So, let us review the complexities of the Kubernetes architecture and its primary components to get a better understanding!

Kubernetes fundamentals

Kubernetes architecture and deployment of containerized applications contain a pod, cluster, container, and node. Together these concepts form the foundation of the Kubernetes system for deploying and managing containerized applications. 

Container

Containers are self-contained environments that run an app or system, such as a small microservice, a software process, or a larger application. A container executes an isolated process for an operating system by leveraging the underlying kernel features of the host operating system. Essentially, it runs a snapshot of your system from a specific time providing consistency in the behavior of an app or system, as opposed to virtualization, where each virtual machine run’s its own kernel. This allows multiple containers to run on the same host system, with their own isolated environment, while still sharing the underlying resources of the host system. 
A container requires bins, libraries, and any necessary runtime components, which are super lightweight and take only seconds to boot up and scale!

Pods

A pod is a unit that hosts the application instance for one or more containers. Typically a pod will have a single type of application or multiple applications within multiple containers that are closely related and share resources provided by the pod, including IP, networking, storage, and metadata. A container image and port information are the metadata needed to run a container.
A pod serves as an abstraction layer between your container and your cluster. To create a pod, you would use a YAML file to define the pod’s configuration, including the container image, ports, volumes, and parameters. The YAML file is one of the key ways to define Kubernetes resources declaratively, allowing users to specify the desired state of the pod. Kubernetes creates the pod to match the desired state and keeps it running as long as it is maintained. It allows the pod's configuration to be updated declaratively instead of making risky imperative changes. The declarative approach allows for better management and maintenance of containerized applications.

Here’s an example of a simple YAML file to create a pod with a single container:

apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: my-image:latest
    ports:
    - containerPort: 80

Once you have created the YAML file, you will execute kubectl apply to create the pod in Kubernetes.

kubectl apply -f my-pod.yaml

This creates the pod and starts the container inside of it. You can then use the command kubectl get pods to check the status of the pod and kubectl logs to view your container logs. 
Containers are the actual units of deployment that contain the application code and its dependencies that run within the context of a pod.

Nodes

A node is often called the “worker machine” in a Kubernetes cluster that runs the pods. Nodes can be physical or virtual machines providing resources such as CPU, storage, and memory needed to run the pod. A node contains certain components that allow it to run the pods efficiently:
Container runtime: This component is responsible for running the containers. Each node can run a Kubernetes container runtime environment to manage the containers running on that node. 

kubelet: This component manages the node's state and ensures that containers running on the node are healthy. Kubelet is the primary agent on each worker node within a Kubernetes cluster responsible for managing the containers, pods, volumes, images, and the cluster's health. For example, the agent will start and stop containers in the pod, monitor their health, and report any issues to the Kubernetes API server.

kube-proxy: This component provides network connectivity to services running on the nodes. It also maintains a network proxy for those services using iptables or IPVS (IP Virtual Server) to manage routes of incoming traffic to the appropriate pods. Kube-proxy also supports load balancing across multiple pods.

To summarize, nodes operate by running a container runtime, and an agent, kubelet, communicates with the Kubernetes control plane to manage the containers and pods running on the node. The control plane determines which pods should be running on the nodes and communicates the configuration to the agent, kubelet, which starts the containers in the pod and monitors the health. This allows the control plan to handle Kubernetes’ ‘decision-making’ and leverage a kube-scheduler for assigning those pods to nodes in the cluster, while the control plan manages the overall state of a cluster, and this is achieved with a kube-proxy that routes the network traffic to the appropriate pods.

The kube-proxy then runs on each node in the cluster and maintains a network proxy by listening to the API server for any changes to the desired state of a cluster and updating the network proxy when necessary. This allows a client to access the service provided by pods running on the nodes in the cluster, regardless of which node the pods are running on. 

Cluster

In Kubernetes, a cluster is a set of nodes that work together to run a containerized application. As we mentioned earlier, the node in the cluster is what we refer to as the ‘worker machine,’ which is the force that runs the containers and is managed by the Kubernetes control plane. 
The cluster is responsible for managing the deployment and scaling of containerized applications. It provides the layer between an app and the underlying infra, which allows the apps to be deployed and scaled easily. So, together a Kubernetes cluster, the control plane, and the worker nodes provide a platform to deploy, manage and scale containerized applications. A cluster contains specific components needed to run healthily, such as:
Control Plane Components: This component is responsible for managing and coordinating the state of a cluster, ensuring that the desired state of a cluster matches the actual state. Several components within a control plane are each responsible for a different aspect of cluster management. Here are some of those key components and their responsibilities.

kube-apiserver: This component exposes the Kubernetes API, allowing clients to interact with the cluster. The kube-apiserver validates and processes API requests and ensures the desired state is consistent with the actual state of the cluster.

etcd: This component is a key-value store used to store configurations and the state of the Kubernetes cluster. The control plane reads and writes to etcd to ensure the cluster maintains the desired state. 

kube-scheduler: This component is responsible for scheduling pods to run on nodes based on the available resources. The kube-scheduler determines the best node for each pod based on resource requirements and rules/policies.

kube-controller-manager and cloud-controller-manager: These components are responsible for managing various controllers that will reconcile the state of the cluster with the desired cluster. These controllers manage ReplicaSets, Deployments, resources, and services. They ensure that the desired state of the Kubernetes resources is maintained and take necessary action if needed.

You can create a Kubernetes cluster in multiple ways, such as using a cloud provider, a Kubernetes service, or manually on your infrastructure. Depending on your approach, I’d suggest referring to the provider’s documentation for instructions on creating and configuring a Kubernetes cluster. 

Resources

Hopefully, this overview provides a better understanding of Kubernetes's operation and primary components. However, if you're reading this and you've never worked with cloud technologies or tools, I'd suggest starting with the fundamentals of networking and the cloud to demystify the magic of Kubernetes!
Here are some great resources to start with if you are brand new to Kubernetes and need to learn first about Networking or Linux:
Bash for Programmers

Linux Command Line Basics

Linux and Docker Fundamentals by Kubesimplify, aka Saiyam Pathak

Otherwise, here are some helpful resources to help you continue your Kubernetes basics education:
Kubernetes 101 workshop by Kubesimplify, aka Saiyam Pathak

Understanding Kubernetes in a visual way by Aurélie Vache

KBE, Kube by Example

Learnk8s

100 Days of Kubernetes

100 Days of Kubernetes by Anais Urlichs

vEducate, Kubernetes by Dean Lewis

Lastly, here are some more intermediate resources for Kubernetes education:
Cloud Native Podcast by Saim Safdar

DevOps Toolkit  by Viktor Farcic

Cloud Native Computing Foundation

Production Kubernetes

My next blog post will highlight developers' common misconceptions about Kubernetes and what you can do to ensure you don't fall victim to these misconceptions!  
