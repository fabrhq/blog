---
title: "Terraform Provider Docs for CDKTF"
date: "2023-03-29T14:14:03.000Z"
author: "Janaka Abeywardhana"
description: "Ever wanted CDKTF docs for TypeScript? Announcing (unofficial) Terraform provider docs with HCL code blocks converted to CDKTF."
---

Have you found it a pain that there aren't any Terraform provider docs for CDKTF? We couldn't find docs for TypeScript or Python. Having to translate HCL to CDKTF in our heads was making life just a little bit harder on top of everything else. So we decided to do something about it. We publish a version with code blocks and references converted into CDKTF. The initial providers are AWS, Azure, and Google. TypeScript is the first language.

Check it out:

[https://openfabr.github.io/terraform-provider-cdk-docs](https://openfabr.github.io/terraform-provider-cdk-docs/])

There are likely a few rough edges. The Hashicorp converter itself has limitations, but they are working on it. The next release is expected to have improvements to the converter functionality.
If you find a problem please let us know. Create an issue on the [repo](https://github.com/openfabr/terraform-provider-cdk-docs).

We would also love to hear which language and provider you want us to prioritise next.
Hit us up on Twitter: [@openfabr](https://twitter.com/openfabr) and [Discord](https://discord.com/invite/3MrGSrFwM2)

## How are the docs converted?

Well not manually, of course not, we are engineers. Also, there are 100s of markdown files per provider so manual isn't an option, even if we wanted to - as if we needed an excuse.

The plan is to open-source the converter when we get some time. In the meantime here's a little detail if you are curious.

The key technologies used in the converter are:

- [UnifiedJS](https://github.com/unifiedjs/unified) via [RemarkJS](https://github.com/remarkjs/remark) - to parse a markdown doc, run our custom converter, and serialise the result back to a markdown file. 
- [@cdktf/hcl2cdk](https://github.com/hashicorp/terraform-cdk/blob/main/packages/%40cdktf/hcl2cdk/README.md) - to convert a code block. This is the converter library used under the hood by the CDKTF CLI `CONVERT` command.
- [Material for Mkdocs](https://squidfunk.github.io/mkdocs-material/) - to publish the markdown docs as a website (GH Actions for CI/CD and GH pages for hosting).

We wrote a UnifiedJS Markdown transformer (plugin) to convert an entire doc. A doc contains many inline code and block code elements. RemarkJS parses the markdown (and frontmatter) into an AST (Abstract Syntax Tree). Our transformer traverses the AST, finds the nodes we want to convert, and then applies the treatment needed. Unfortunately, the UnifiedJS function for processing a folder full of docs didn't quite work as needed. So that functionality needed to be written as well.

The two main challenges are 

1. Efficiently processing a large number of documents, both converting and static site generation. 

2. Dealing with the slight style variations between each provider's docs.

## Why not contribute to the main project?

That would be a better user experience for sure. The system that publishes the provider HCL docs is a bit complicated. There didn't appear to be a clear path to contribute this feature easily. So we felt taking that path would take more effort/time vs publishing standalone and getting it out.
