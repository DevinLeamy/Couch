# Think Tank Team Coding Challenge Submission (Backend)
#### _Author: Devin Leamy_

### Overview
The backend architecture would be composed of:
1. A `NodeJS` server running `ExpressJS` and `Socket.io` and exposing a REST API.
2. A `MongoDB` database.
3. A `Kubernetes` cluster, deployed via `AWS`'s Elastic Kubernetes Service (`EKS`)

### Server and Interface

The backend exposes a REST API via `ExpressJS`, from a `NodeJS` server. Given that the client is written in `TypeScript`, choosing this server spec allows the full stack to be programmed in the same language. More importantly, `NodeJS` is used on the server side because of its efficiency and proven track record of being able to sustain large workloads; Netflix, LinkedIn, Uber, and Walmart all rely on `NodeJS`.

For similar reasons - a proven track record of supporting production workloads - `ExpressJS` was chosen to serve the backend's REST API. The REST API would provide the front end with the requisite hooks to add new items to the scene, delete items,
provide additional models for the front end to display, and similar CRUD operations. However, the real-time updates are best served through a different (bidirectional) communication channel `Socket.io`. 

Using `Socket.io`, the client and server can more easily stay in sync than if communication was ly done through a REST API. Thus, multiple users could seamlessly collaborate on a layout.

### Database

The database would store information about the models that are displayed by the front end as well as user data, and various layouts that have been created by users. 

Because the bulk of requests are write operations (moving items), `MongoDB` and `Redis` are both strong candidate database solutions. Both can handle large amounts of write requests and both support in-memory (RAM) data storage. However, I believe `MongoDB` is a better choice than `Redis`, in this context, because of its superior out-of-the-box query flexibility. `MongoDB` also has great `NodeJS` support via [`Mongoose`](https://mongoosejs.com/docs/).

### Deployment

A `Kubernetes` cluster served and managed by `EKS` has virtually infinite scaling potential. `AWS` provides robust load balancing via their AWS Load Balancer Controller (`ALB`) which can be seamlessly integrated with `EKS`. And `Kubernetes` smart scheduling, replica sets, and automatic redeployments mean you can bank on there being a low chance of downtime. 

Collectively, this backend stack is well suited for the data managed by our application, the types of requests (user operations or otherwise) it must handle, and the scale it needs to support. 

