---
title: "Real World FABR: w.r.t. Crane, Uber's Next-Gen infrastructure Stack"
date: "2023-01-23T11:20:00.000Z"
author: "Chen Wang"
description: "Real World FABR: w.r.t. Crane, Uber's Next-Gen infrastructure Stack"
---

*This is part of the series introducing FABR, including OpenFABR CDF and FABR infrastructure, in real-world scenarios where actionable recommendations can be applied to solve infrastructure challenges.*

TODO: add a title image with CDF + Uber Crane

On [Uber](https://uber.com)'s [Engineering Blog](https://www.uber.com/blog/engineering/), there is an insightful post about [Crane: Uber's Next-Gen infrastructure Stack](https://www.uber.com/en-GB/blog/crane-ubers-next-gen-infrastructure-stack/) that reveals many intrigue details about the effort behind rebuilding Uber's infrastructure. 

A few surprising facts from the post:

- It was a mix of on-prem and cloud, moving towards a true multi-cloud setup.
- Manual operations were still prominent, moving towards "cattle, not pets", i.e. push for automation.
- Having circular dependencies among infrastructure components was a challenge, to be eliminated.

There are in-depth descriptions of how Uber tackles those challenges throughout the post, which makes an excellent read.

We thought it would be a fun thought experiment to run through how OpenFABR CDF could help resolve some of the challenges.

## Repeatable infrastructure & Layered Dependencies

The *Zone Turn-Up* section of the post describes two challenges:

- Manual infrastructure management - made it slow to spin up a new zone. They adopted Infrastructure-as-Code (IaC) to solve this, nothing ground breaking.
- Circular dependencies - among infrastructure components made it even more challenging to spin up a new zone. Adopting their *Layered Dependencies* approach for infrastructure services was their approach here. A variation of the typical DAG in dependency management.

These two things significantly reduced the time to spin up a new zone, from months to days.

### Using OpenFABR CDF

OpenFABR CDF is a framework for building IaC using imperative programming languages like TypeScript, Python, or Golang. It's the glue that gives IaC the full software lifecycle support.

- Pick either CDK Terraform or Pulumi as the IaC runtime and language. Because Uber needs to support hybrid and multi-cloud AWS CDK out of the mix. We'll pick CDK TF and Golang.
- We'll have to build custom providers for the on-prem custom infrastructure (see [Writing Custom Terraform Providers](https://www.hashicorp.com/blog/writing-custom-terraform-providers)). We assume they have the needed control plane APIs.
- Develop contructs to represent the various infrastructure abstractions. Publish them as a Go package(s) into your standard Go package repository. They can then be imported as dependencies in other IaC codebase.
- Transitive dependencies can cause the circular dependencies problem as mentioned earlier, however some dependency-focused static code analysis tools could pick out abnormal inter-layer dependencies easily, similar to how [GitHub Dependabot](https://github.com/dependabot) works.

In this way, using CDF, a complex infrastructure like Uber's could be designed and implemented from small, single-purpose components all the way up to powerful high-level packages that are developer-facing for them to self-manage their own pieces of infrastructure.

## Config & Change Management

The *Config and Change Management* section of the post describes that they did some discovery and research to decide on how developers would interact with the infrastructure automation. They decided to use base this on [Starlark](https://github.com/bazelbuild/starlark).

### What OpenFABR CDF & FABR infrastructure Can Help

Firstly, CDF defines an open standard for an extensible configuration format, tied to individual infrastructure packages. So by selecting CDF you get an integrated configuration format out-of-the-box.

Secondly, CDF aims to establish an abstraction layer between platform and product functions in any engineering organisation so that you do not have to spend time researching and discovering the optimal UI/UX for application developers.

Last but not least, our SaaS product FABR Infra offers great convenience for developers to discover, experiment and utilise top-level infrastructure components published by the platform team. Features such as rollback and release history are built into the product. That saves platform engineering effort custom implementing such DX functionality.

## Example Setup with FABR

Given Uber didn't share specifics about their architecture we'll make something up based what they did not share. 

- A public-facing web server on cloud vendor A.
- An on-prem database and another database on cloud vendor B;
- The web server has connectivity to both databases.

Remember the requirements repeatable infrastructure, layered dependencies, config, and change management. Also, we picked CDK TF and Golang.

Let's see how we achieve this with FABR as a platform team:

1. first we'll have to develop a Terraform provider for our on-prem infrastructure (assumes it's not based on an off-the-shelf stack that has a provider).
2. Develop a package with small, single-purpose, constructs for provisioning a database and web server on-prem and the cloud.
3. then develop another package at a higher level to include the packages in step 2, plus a few other existing packages such as networking to establish connectivities between the web server and the two databases;
4. The platform teams will consider the developer-configurable attributes for the web server and the two databases, such as those related to CPU and memory allocation, according to what OpenFABR CDF lays out.
5. Write automated tests using Testify (or insert you favourite Go test framework).
6. The platform teams will then publish the high-level package which contains the constructs for the on-prem database, cloud database, and one web server. Constructs in CDF are typed. The databases are type `Component`, the web server type `Service` (any code deployment target), connectivity between then represented by construct type `Relation`. These are automatically exposed to developers in product teams via the FABR Infra UI.
7. Now product engineers can make use of the package by creating a CDF-based configuration file to compose the proposed infrastructure setup earlier.
8. FABR offers two ways for product teams to spin up infrastructure like this:
   1. Keep everything in the version control system and use OpenFABR CDF directly in your project with a CI/CD pipeline set up. In this example it would be a standard Terraform CI/CD setup that runs `terraform apply`.
   2. Use FABR Infrastructure, click the _apply_ button.
9. Rinse and repeat to fine-tune:
   1. For the platform teams, Step 1-5.
   2. For the product teams: Step 6-7.
10. :rocket: :money: (or whatever metrics you are tracking).

## Summary

The original post from Uber is a case of an engineering-heavy large scale-up re-thinking and re-architecting infrastructure to better serve the entire engineering organisation. Ultimately it's about reducing the time, cost, and risk around making engineering changes.

In our view:

- **IaC** is the centre piece of the implementation, enabling automation.
- **Abstraction** is the keyword given the mix of on-prem + multi-cloud. Because asking developers to understand and then utilise different infrastructure components with different characteristics is considered unrealistic and unattainable. Resulting in a small platform or infrastructure team being a bottleneck.

By adopting OpenFABR CDF (our OSS project) and FABR Infrastructure (our SaaS product), we think there are immediate benefits:

- It becomes drastically easier to develop, test, and package infrastructure components in such a mixed infrastructure environment. CDF is designed to make this task easier for infrastructure package authors.
- The standardised configuration format defined by CDF's modular approach not only makes config and change management easier, but also offers a free abstraction layer between organisation-wide shared infrastructure platforms and developers in the same organisation.
- Developer self-serve wasn't stressed enough. With the adoption of FABR Infra, developer experience around infrastructure self-service is drastically improved. Developers can easily discover and use top-level infrastructure components and services made available to them.

*If you have infrastructure challenges similar to Uber, we would love to chat.*