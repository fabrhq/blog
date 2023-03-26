---
title: "Terraform Provider Docs for CDKTF"
date: "2023-03-25T10:14:03.000Z"
author: "Janaka Abeywardhana"
description: "Announcing Terraform provider docs with code blocks conversed to CDKTF"
---

When working with CDKTF have you found it a pain that the provider docs are in HCL? We did and were suprised we couldn't find version for TypeScript, Python etc. It was making life just a little bit harder on top of everything else. So we decided to do something about it and publish a version with code blocks and references converted into CDKTF. We've started with AWS, Azure, and Google providers and TypeScript as the first language.

Check it out:

https://openfabr.github.io/terraform-provider-cdk-docs/

There are likely a few ruff edges. The Hashi converter itself has limitation. But they are working on it. The next release is expected to have improvements to the converter.

If you find a problem please let us know, create an issue on the [repo](https://github.com/openfabr/terraform-provider-cdk-docs).

We would also love to hear which language and provider you want us to prioritise next.

Hit us up on Twitter: [@openfabr](https://twitter.com/openfabr) and [Discord](https://discord.com/invite/3MrGSrFwM2)

## How are the docs converted?

Well not manually, of course not, we are engineers. Also, there are 100s of markdown files per provider so manual isn't an option even if we wanted to (as if we needed an excuse).

The plan is to open source the converter when we get sometime but in the meantime here's a little detail if you are curious.

The key technologies used in the converter are:

- [UnifiedJS](https://github.com/unifiedjs/unified) via [RemarkJS](https://github.com/remarkjs/remark) - to parse a markdown doc, run our custom converter, and serialise the result back to a markdown file. 
- [@cdktf/hcl2cdk](https://github.com/hashicorp/terraform-cdk/blob/main/packages/%40cdktf/hcl2cdk/README.md) - to convert a code block. This is the converter library used under-the-hood by the CDKTF CLI `CONVERT` command.
- [Material for Mkdocs](https://squidfunk.github.io/mkdocs-material/) - to publish the markdown docs as a website (GH Actions for CI/CD and GH pages for hosting).

We wrote a UnifiedJS marketdown transformer to convert an entire doc. A doc obviously contains multiple inline and block code elements. RemarkJS parses the markdown (and frontmatter) into an AST (Abstract Syntax Tree). The our transfomer traverses the AST, finds the nodes we are interested in by type then applies the treatment needed. Unfortunately the UnifiedJS function for processing a folder full of docs didn't quite work as needed. So that functionality needed to be written as well.

The two main challenges are 1) fficiently processing a large number of documents, both converting and static site generation. 2) dealing with the slight variations between each providers docs.

## Why not contribute into the main project?

That would be a better user experience. But the system that publishes the provider HCL docs is a bit complicated. There didn't appear to be a clear path to contribute this sort of change easily. Overall we felt is would take more effort/time taking that path vs publishing standalone.
