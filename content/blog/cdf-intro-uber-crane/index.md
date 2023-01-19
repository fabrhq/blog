---
title: "Real World FABR: w.r.t. Crane, Uber's Next-Gen Infra Stack"
date: "2023-01-19T11:20:00.000Z"
author: "Chen Wang"
description: "Real World FABR: w.r.t. Crane, Uber's Next-Gen Infra Stack"
---

*This is part of the series introducing FABR, including OpenFABR CDF and FABR Infra, in real-world scenarios where actionable recommendations can be applied to solve infrastructure challenges.*

TODO: add a title image with CDF + Uber Crane

On [Uber](https://uber.com)'s [Engineering Blog](https://www.uber.com/blog/engineering/), there is an insightful post about [Crane: Uber's Next-Gen Infrastructure Stack](https://www.uber.com/en-GB/blog/crane-ubers-next-gen-infrastructure-stack/) that reveals many intrigue details about the effort behind rebuilding Uber's infrastructure. 

A few surprising facts from the post:
- It was a mix of on-prem and cloud, moving towards a true multi-cloud setup;
- Manual operations were still prominent, moving towards "cattle not cats", i.e. push for automation;
- Having circular dependencies among infra components was a challenge, to be eliminated. 

There are in-depth descriptions of how Uber tackles those challenges throughout the post, which makes an excellent read. 

We will pick two topics in the stack to offer our recommendation with the adoption of OpenFABR CDF.

## Repeatable Infra & Layered Dependencies

As described in *Zone Turn-Up* section of the post, circular dependencies among infra components made the already-manual new cloud zone setup more difficult. *Layered Dependencies* is their approach to isolate infra components and therefore prevent circular situation introduced by a usual DAG in dependency management. 

Infrastructure-as-Code is also utilised to achieve repeatable infra in order to help new cloud zone turn-up. 

### What OpenFABR CDF can Help

CDF is the glue that gives IaC the full software lifecycle support. It means that:
- IaC code can be developed and published as usual software packages to artifact repositories;
- They can then be imported as dependencies in other IaC codebase;
- Transitive dependencies can cause the circular dependencies problem as mentioned earlier, however some dependency-focused static code analysis tools could pick out abnormal inter-layer dependencies easily, similar to how [GitHub Dependabot](https://github.com/dependabot) works.

With CDF, a complex infrastructure like Uber's could be designed and implemented from small, single-purpose components all the way up to powerful high-level packages that are developer-facing for them to self-manage their own pieces of infrastructure. 


## Config & Change Management

As described in *Config and Change Management* section of the post, there were some discovery and research done to decide on how the stack would interface with developers. They end up reusing a configuration format [Starlark](https://github.com/bazelbuild/starlark) as the key ingredient to establish this layer of abstraction.

### What OpenFABR CDF & FABR Infra Can Help

Firstly, CDF defines an open standard for an extensible configuration format, tied to individual infrastructure packages. In this case, no need to shop around for another configuration format as this is built-in as a result of adopting CDF.

Secondly, CDF aims to establish an abstraction layer between platform and product functions in any engineering organisation so that you do not have to spend time researching and discovering how to offer what developers need for infra, in a way they are happy with. 

Last but not least, our SaaS product FABR Infra offers great convenience for developers to discover, experiment and utilise top-level infra components made available to them. Features such as rollback and release history are built into the product so that as requirements, there is no need to implement them in an engineering organisation's own cloud platform.


## Example Setup with FABR

Taking a simple but somehow extreme example of mixing on-prem with multi-cloud infra setup according to Uber's, to provision:
- A public-facing web server in one cloud vendor and both an on-prem database and another database in a different cloud vendor;
- The web server has connectivity to both databases. 

In order to achieve that, primarily addressing the two topics covered above (Repeatable Infra & Layered Dependencies and Config & Change Management):
1. The platform teams will start by developing small, single-purpose packages for provisioning of on-prem and cloud-based databases, and the cloud-based web server;
2. The platform teams will then develop another package at a higher level to include the packages in step 1, plus a few other existing packages such as networking to establish connectivities between the web server and the two databases;
3. The platform teams will consider the developer-configurable attributes for the web server and the two databases, such as those related to resource allocation, according to what OpenFABR CDF lays out;
4. The platform teams will then publish the high-level package whose two databases (two different types of components in CDF speaking), one web server (one type of services in CDF speaking) and connectivities among them (two types of relations in CDF speaking) are automatically exposed to developers in product teams;
5. Now the product teams can take use of the package by creating a CDF-based configuration file to compose the proposed infrastructure setup earlier;
6. To commit a piece of infra change like this by the product teams, FABR offers two ways:
  - Keep everything in the version control system and use OpenFABR CDF directly in your project with a CI/CD pipeline set up;
  - Or use FABR Infra which offers a turnkey setup to react to changes and auto-apply them;
7. Rinse and repeat to fine-tune:
  - For the platform teams, Step 1-4
  - For the product teams: Step 5-6 
8. :rocket: :money: (or whatever metrics you are tracking).

## Summary

This is a case of an engineering-heavy scale-up re-thinking and re-architecting infrastructure to better serve the entire engineering organisation. 

In our view:
- **IaC** is the centre piece of the implementation, enabling automation.
- **Abstraction** is the keyword given the on-prem + multi-cloud mix, where asking developers to understand and then utilise different infra components with different characteristics is considered unrealistic and unattainable. 

By adopting OpenFABR CDF, our OSS project and FABR Infra, our SaaS product, we think there are immediate benefits to be had such as:
- It becomes drastically easy to develop, test and package infra components in such a mixed infra environment, thanks to CDF's framework and how CDF is designed to help infra package creators.
- The standardised configuration format defined by CDF's modular approach not only makes config and change management easier, but also offers a free abstraction layer between organisation-wide shared infra platform and developers in the same organisation.

Furthermore, for certain areas that did not get enough mention in the blog post:
- With the adoption of FABR Infra, developer experience around infrastructure self-service is drastically improved for discovering and utilising the top-level infra components and services made available to them, without any extra development effort.
- 

*Thinking about how we can help with your own cloud infrastructure challenges like what Uber's engineering teams are doing here? Get in touch with FABR today and we will be on hand to advise.*