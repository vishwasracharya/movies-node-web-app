## CAP Theorem

A system used to make system design decisions based on the following three requirements:

- Consistency
- Availability
- Partition Tolerance

### Consistency:

All nodes see the same data at the same time

### Availability:

Every request receives a response, without error, regardless of the state of the system

### Partition Tolerance:

The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes

A system can only have two of the three.

- CA - Strong consistency, high availability
- CP - Strong consistency, low availability
- AP - Weak consistency, high availability

## Key-Value pair storage

A NoSQL database that stores data in key-value pairs. The key is used to retrieve the value. The value can be any type of data, including a document, a list, or a set.

E.g: name: "John", age: 30

> where name is the key and "John" is the value.
