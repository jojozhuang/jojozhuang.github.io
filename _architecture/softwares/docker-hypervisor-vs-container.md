---
layout: tutorial
key: architecture
title: "Docker - Hypervisor vs Container"
index: 3202
subcategory: softwares
date: 2018-08-10
tags: [Hypervisor, Container]
---

> Hypervisor vs. Container.

## 1. Hypervisor
### 1.1 What is Hypervisor?
`Hypervisor` is a form of virtualization software used in Cloud hosting to divide and allocate the resources on various pieces of hardware.The program which provide partitioning, isolation or abstraction is called `virtualization hypervisor`. Hypervisor is a hardware virtualization technique that allows multiple guest operating systems (OS) to run on a single host system at the same time. A hypervisor is sometimes also called a `virtual machine manager(VMM)`.
### 1.2 Types of Hypervisor
**TYPE-1 Hypervisor**  
Hypervisor runs directly on underlying host system.It is also known as `Native Hypervisor` or `Bare metal hypervisor`. It dose not require any base server operating system.It has direct access to hardware resources.Examples of Type 1 hypervisors include VMware `ESXi`, Citrix `XenServer` and Microsoft `Hyper-V` hypervisor.
![image](/assets/images/architecture/3202/type1-hypervisor.jpg){:width="300px"}
**TYPE-2 Hypervisor**  
A Host operating system runs on underlying host system.It is also known as `Hosted Hypervisor`. Basically a software installed on an operating system.Hypervisor asks operating system to make hardware calls. Example of Type 2 hypervisor include VMware Player or Parallels Desktop. Hosted hypervisors are often found on endpoints like PCs.
![image](/assets/images/architecture/3202/type2-hypervisor.jpg){:width="300px"}
**Type-1 vs Type-2**  
Type 1 hypervisors offer much better performance than Type 2 ones because there’s no middle layer, making them the logical choice for mission-critical applications and workloads. But that’s not to say that hosted hypervisors don’t have their place – they’re much simpler to set up, so they’re a good bet if, say, you need to deploy a test environment quickly. One of the best ways to determine which hypervisor meets your needs is to compare their performance metrics. These include CPU overhead, amount of maximum host and guest memory, and support for virtual processors.

## 2. Container
`Containers` provide a standard way to package your application's code, configurations, and dependencies into a single object. Containers share an operating system installed on the server and run as resource-isolated processes, ensuring quick, reliable, and consistent deployments, regardless of environment.

Unlike a VM which provides hardware virtualization, a container provides operating-system-level virtualization by abstracting the “user space”.

## 3. Hypervisor(VMs) vs. Container
Containers and VMs are similar in their goals: to isolate an application and its dependencies into a self-contained unit that can run anywhere. Moreover, containers and VMs remove the need for physical hardware, allowing for more efficient use of computing resources, both in terms of energy consumption and cost effectiveness.

The main difference between containers and VMs is in their architectural approach.
![image](/assets/images/architecture/3202/vm-vs-container.gif){:width="600px"}
* Virtual machines (VM) are managed by a hypervisor and utilize VM hardware(a).
* Container systems provide operating system services from the underlying host and isolate the applications using virtual-memory hardware(b).

## 4. References
* [Hypervisor at GeeksforGeeks](https://www.geeksforgeeks.org/hypervisor/)
* [Docker overview](https://docs.docker.com/engine/docker-overview/)
* [A Beginner-Friendly Introduction to Containers, VMs and Docker](https://www.freecodecamp.org/news/a-beginner-friendly-introduction-to-containers-vms-and-docker-79a9e3e119b/)
* [What’s the Difference Between Containers and Virtual Machines?](https://www.electronicdesign.com/dev-tools/what-s-difference-between-containers-and-virtual-machines)
