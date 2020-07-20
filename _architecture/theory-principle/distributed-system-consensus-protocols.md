---
layout: tutorial
key: architecture
title: "Distributed System - Consensus Protocols"
index: 3002
subcategory: theory-principle
date: 2018-08-15
tags: [Paxos, Raft]
---

> Paxos and Raft

## 1. Consensus Algorithm
Consensus is a fundamental problem in fault-tolerant distributed systems. Consensus involves multiple servers agreeing on values. Once they reach a decision on a value, that decision is final. Typical consensus algorithms make progress when any majority of their servers is available; for example, a cluster of 5 servers can continue to operate even if 2 servers fail. If more servers fail, they stop making progress (but will never return an incorrect result).

Consensus typically arises in the context of replicated state machines, a general approach to building fault-tolerant systems. Each server has a state machine and a log. The state machine is the component that we want to make fault-tolerant, such as a hash table. It will appear to clients that they are interacting with a single, reliable state machine, even if a minority of the servers in the cluster fail. Each state machine takes as input commands from its log. In our hash table example, the log would include commands like set x to 3. A consensus algorithm is used to agree on the commands in the servers' logs. The consensus algorithm must ensure that if any state machine applies set x to 3 as the nth command, no other state machine will ever apply a different nth command. As a result, each state machine processes the same series of commands and thus produces the same series of results and arrives at the same series of states.

## 2. Paxos
Paxos is a family of protocols for solving consensus in a network of unreliable processors (that is, processors that may fail).

## 3. Raft
`Raft` is a consensus algorithm that is designed to be easy to understand. It's equivalent to Paxos in fault-tolerance and performance. The difference is that it's decomposed into relatively independent subproblems, and it cleanly addresses all major pieces needed for practical systems.


## 9. References
* [Paxos protocols at wikipedia](https://en.wikipedia.org/wiki/Paxos_(computer_science))
* [The Raft Consensus Algorithm](https://raft.github.io/)
