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
   * @example "Finsweet Attributes"
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
   * @example "CMS Load"
   */
  name: string;

  /**
   * Defines the scripts that correspond to this solution.
   * If any element on the page uses this solution, Webflow Would automatically inject that script on the page.
   */
  scripts: SolutionScript[];

  /**
   * Defines the available HTML attributes that will be displayed as options in the UI.
   * Attributes can either be a single setting or a group of settings.
   */
  attributes: (SolutionAttributesGroup | SolutionAttribute)[];
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
  location: 'head' | 'body';
};

type SolutionAttributesGroup = {
  /**
   * Defines that it's a group of settings.
   */
  type: 'group';

  /**
   * The group name.
   * @example "List settings"
   */
  name: string;

  /**
   * The settings under this group.
   */
  attributes: SolutionAttribute[];

  /**
   * The node types where this group can be applied.
   * Options will just appear under the Settings panel of the elements that match any of these nodes.
   * Uses Webflow's internal naming of node types.
   * @example ["DynamoList", "DynamoWrapper"]
   */
  nodeTypes?: NodeType[];

  /**
   * The conditions that must be fulfilled to display this group of settings in the Settings panel.
   */
  conditions?: SolutionCondition[];
};

type SolutionAttribute = {
  /**
   * Defines that it's a setting for an HTML attribute.
   */
  type: 'attribute';

  /**
   * Defines the setting ID.
   */
  id: string;

  /**
   * Defines the setting name.
   * @example "Element"
   */
  name: string;

  /**
   * A description that the UI can display the user if he/she needs more information.
   */
  description: string;

  /**
   * The node types where this setting can be applied.
   * Options will just appear under the Settings panel of the elements that match any of these nodes.
   * Uses Webflow's internal naming of node types.
   * @example ["DynamoList", "DynamoWrapper"]
   */
  nodeTypes?: NodeType[];

  /**
   * Defines if it's a required setting.
   */
  required?: boolean;

  /**
   * The conditions that must be fulfilled to display this setting in the Settings panel.
   */
  conditions?: SolutionCondition[];

  /**
   * The HTML attribute name that would be applied to the element when defining this setting in Webflow.
   * @example "fs-cmsload-element"
   */
  attributeName: string;
} & SolutionAttributeInput;

type SolutionAttributeInput =
  | {
      /**
       * Defines a checkbox type.
       * The UI in the Settings panel would render this option as a checkbox.
       * If the user checkes the checkbox, Webflow would apply a boolean HTML attribute to the element.
       * @example "[fs-cmsload-element]"
       */
      optionsType: 'checkbox';
    }
  | {
      optionsType: 'dropdown';
      attributeValue?: string;
      options: SolutionSettingOption[];
    }
  | {
      optionsType: 'text-input';
      attributeValue?: string;
    }
  | {
      optionsType: 'integer-input';
      attributeValue?: number;
    }
  | {
      optionsType: 'float-input';
      attributeValue?: number;
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
