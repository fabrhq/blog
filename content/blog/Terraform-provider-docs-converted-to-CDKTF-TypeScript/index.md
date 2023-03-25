---
title: "Terraform Provider Docs for CDKTF"
date: "2023-03-25T10:14:03.000Z"
author: "Janaka Abeywardhana"
description: "Announcing Terraform provider docs with code blocks conversed to CDKTF"
---

When working with CDKTF have you found it a pain that the provider docs are for HCL? We did and was suprised we couldn't find any. It was making life just a little bit harder on top of everything else. So we decided to do something about it. We started to re-publish a version of provider docs with code blocks and references converted into CDKTF. We've started with TypeScript as the first language. AWS, Azure, and Google are the initial providers.

Check it out:

https://openfabr.github.io/terraform-provider-cdk-docs/

Let us know which language and providers you want us to prioritise next. You can find us on Twitter: [@openfabr](https://twitter.com/openfabr) and [Discord](https://discord.com/invite/3MrGSrFwM2)

## How did we do this?

Well not manually, of course not, we are engineers. Also, there are 100s of markdown files per provider so manual isn't an option even if we wanted to. As if I needed and excuse.

The key technologies used in the converter are:

- [UnifiedJS](https://github.com/unifiedjs/unified/tree/main) via [RemarkJS](https://github.com/remarkjs/remark) - to parse a markdown doc, run our custom converter, and serialise the result back to a markdown file. 
- [@cdktf/hcl2cdk](https://github.com/hashicorp/terraform-cdk/blob/main/packages/%40cdktf/hcl2cdk/README.md) - to convert a code block. This is the converter library used under-the-hood by the CDKTF CLI `CONVERT` command.
- [Material for Mkdocs](https://squidfunk.github.io/mkdocs-material/) - to publish the markdown docs as a website (GH Actions for CI/CD and GH pages for hosting).

We wrote a UnifiedJS marketdown transformer to convert an entire doc. A doc obviously contains multiple inline and block code elements. RemarkJS parses the markdown (and frontmatter) into an AST (Abstract Syntax Tree). The transfomer traverses the AST, finds the nodes we are interested in by type then apply the treatment needed. Unfortunately the UnifiedJS function for processing a folder full of docs didn't quite work as needed. So I had to write that myself.

The plan is to open source the converter when we get sometime.