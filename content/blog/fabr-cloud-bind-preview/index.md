---
title: "FABR Cloud Bind Preview"
date: "2023-05-11T10:26:03.000Z"
author: "Janaka Abeywardhana"
description: "An easier way to securely bind your application code to backends like databases."
---

Do you copypaste database credentials or connection strings around to hook up your app code? It seems like this is what many people do because they aren't ready for a more elaborate setup. Or maybe you've hand-rolled code in your app to grab values from a secret store?

We've experienced this ourselves and seen it in infrastructure implementations out there. So been wondering if there's a way to make this easier. We've spent a little time developing a solution. There's an early preview and would love your feedback.

The working name is FABR Cloud Bind. Check it out [https://github.com/openfabr/fabr-cloud-bind/tree/main/fabr-bind-cli](https://github.com/openfabr/fabr-cloud-bind/tree/main/fabr-bind-cli).

At a high level, it's a CLI that takes a simple config file with secret key names as input. It spits out source code for a client library with named properties that bind to the list of secrets. The example below is what it looks like in TypeScript. The preview only implements TypeScript at the moment.

Example generated class:

```typescript
export class MySecrets extends Secrets {
  database1() { // property name from the key in params.fabr.json file 
    return this.getSecret("database1"); // probably should add caching here?
  }
}
```

Example usage in app code:

```typescript
import { FakeSecretService } from "./fabr-bind/libs/FakeSecretService";
import { MySecrets } from "./fabr-bind/MySecrets";

// instantiating the generated class with an instance of your secret store adaptor
const mysecrets = new MySecrets(new FakeSecretService()); 

console.log(`'database1' connection string with username/password: ${mysecrets.database1()}`)
```

The CLI supports generating client code in one of two modes:

- direct: grab directly from your secret store of choice. This means your code has a dependency on your secret store (both SDK and runtime).
- environment variable: grab from environment variables. This removes the dependency on a secret store. 

The CLI will have helpers to grab and set environment variables. This should make it easy to automate in a CI/CD pipeline.

The Repo [readme](https://github.com/openfabr/fabr-cloud-bind/tree/main/fabr-bind-cli) has more detail. Apologies if it's out of sync with the implementation as we iterate.

Any sort of feedback is welcome but we'd specifically like to hear about:

- How do you handle getting secrets and endpoint addresses into your app code? Copypaste, elaborate authN/Z system, service discovery, or something else?
- As an app dev, is this generated library-based approach a great DX?
- As a DevOps engineer, does the CLI enable you to fully automate and provide a great DX?
