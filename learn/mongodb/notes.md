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

## Document databases

This type of databases stores data in a different forms like JSON, BSON, XML, etc. The data is stored in a document which is a collection of key-value pairs. The document is stored in a collection. The collection is stored in a database.

## Column-oriented databases

This type of databases stores data in columns. The data is stored in a column family. The column family is stored in a keyspace. The keyspace is stored in a cluster.

## Graph databases

This type of databases stores data in a graph structure. The data is stored in a graph. The graph is stored in a database.

## Wide-column store

A wide-column store (or extensible record store) is a type of NoSQL database. It uses tables, rows, and columns, but unlike a relational database, the names and format of the columns can vary from row to row in the same table. A wide-column store can be interpreted as a two-dimensional key–value store.

## Binary Javascript Object Notion (BSON)

This is a binary-encoded serialization of JSON-like documents. It is the native format for storing and transmitting data in MongoDB. BSON is a superset of JSON, meaning that every JSON document is also a valid BSON document.
