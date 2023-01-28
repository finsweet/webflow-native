# Webflow Native

Webflow Native is a schema proposal that attempts to validate a development tool for creating functionality inside Webflow UI.

## About

Developers can write custom solutions and access those solutions inside Webflow Designer Settings panel.
This will allow third-parties to build native-like Webflow integrations directly inside Webflow.
When users select options inside this new Settings UI, Webflow would apply HTML attributes to the elements. This is the same concept as native Webflow components, like Slider and Tabs.

<div align="center" dir="auto">
<img src="https://uploads-ssl.webflow.com/63d40e2bc30a00e32085d4ec/63d454d0e1d279de329eb015_attributes-demo.png" alt="Attributes inside Designer demo" width="512" style="max-width: 100%;">
</div>

Under the hood, when the users select options inside this new Settings UI, Webflow would apply HTML attributes to the elements just like the native components like Slider and Tabs already do.

Example workflow:

1. Select an element.
2. Go to the Settings panel, under the Finsweet Attributes accordion.
3. Open the Finsweet Attributes accordion.
4. Select `Solution = CMS Load` and `Element = List`.

This workflow would apply `fs-cmsload-element="list"` HTML attribute to the element.

The schema approach is universal and does not require any specific development base. It’s not Attributes-specific. It can work with any library that relies on HTML attributes to run.

## Developers

This repository contains

1. A schema proposal to use to create the integrated UIs in Webflow.
2. A tool to validate and publish those schemas to Webflow.

To create new integrations, developers would create a schema that defines the relationship between the UI elements under the Settings panel and the applied HTML attributes.

This schema would then be sent to Webflow to include it in the Designer as a new integration option. Ideally there would be an option to integrate in a CI/CD workflow.

## Schema proposal

```typescript
type Schema = {
  /**
   * Defines the integration ID.
   */
  id: string;

  /**
   * Defines the integration name.
   * This name would appear in the elements Settings panel.
   */
  name: string;

  /**
   * Defines the available solutions.
   * The user would be able to select from them in the elements Settings panel.
   */
  solutions: Solution[];
};

type Solution = {
  /**
   * Defines the solution ID.
   */
  id: string;

  /**
   * Defines the solution name.
   * This name would appear in the `Solution` dropdown.
   */
  name: string;

  /**
   * Defines the scripts that correspond to this solution.
   * If any element on the page uses this solution, Webflow Would automatically inject that script on the page.
   */
  scripts: SolutionScript[];

  /**
   * Defines the available HTML attributes that will be displayed as options in the UI.
   */
  attributes: SolutionAttribute[];
};

type SolutionScript = {
  /**
   * Defines the script ID.
   */
  id: string;

  /**
   * Defines the script src.
   */
  src: string;

  /**
   * Defines if the script must be loaded using `async`.
   */
  async?: boolean;

  /**
   * Defines if the script must be loaded using `defer`.
   */
  defer?: boolean;

  /**
   * Defines the placement of the script.
   */
  location: string;
};
```

## Install

```bash
# install as project dependency
$ npm install --save-dev webflow-native

# or install globally
$ npm install --global webflow-native
```

## Usage

You can see an example of usage in `packages/example`, or you can visit an [Interactive Playground in Stackblitz](https://stackblitz.com/edit/webflow-native?file=README.md).

Index:

1. Schema definition

```bash
# validates and builds a schema
# "src/index.ts" would be the entry file that default-exports the schema
$ webflow-native build src/index.ts

# validates, builds and publishes a schema to Webflow
$ webflow-native publish src/index.ts
```
