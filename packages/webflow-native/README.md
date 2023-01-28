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

1. [A schema proposal to use to create the integrated UIs in Webflow.](#schema-proposal)
2. A tool to validate and publish those schemas to Webflow.

To create new integrations, developers would create a schema that defines the relationship between the UI elements under the Settings panel and the applied HTML attributes.

This schema would then be sent to Webflow to include it in the Designer as a new integration option. Ideally there would be an option to integrate in a CI/CD workflow.

## Schema proposal

You can see an example of a real schema in `packages/example`, or you can visit an [Interactive Playground in Stackblitz](https://stackblitz.com/edit/webflow-native?file=README.md).

The example represents how would the Settings in the previous picture be defined through this schema proposal.

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

type SolutionAttribute = SolutionAttributeInput & {
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
};

type SolutionAttributeInput =
  | {
      /**
       * Defines the setting as a checkbox type.
       * The UI in the Settings panel would render this setting as a checkbox.
       * If the user checkes the checkbox, Webflow would apply a boolean HTML attribute to the element using the {@link SolutionAttribute.attributeName} field.
       * @example "[fs-cmsload-resetix]"
       */
      optionsType: 'checkbox';
    }
  | {
      /**
       * Defines the setting as a dropdown type.
       * The UI in the Settings panel would render this setting as a dropdown.
       * If the user selects an option from the dropdown, Webflow would use it as the HTML attribute value.
       * @example "[fs-cmsload-element="list"]"
       */
      optionsType: 'dropdown';

      /**
       * Defines a default value.
       * The UI would display this value pre-selected.
       */
      attributeValue?: string;

      /**
       * Defines the list of options in the dropdown.
       */
      options: SolutionSettingOption[];
    }
  | {
      /**
       * Defines the setting as a text input type.
       * The UI in the Settings panel would render this setting as a text input.
       * If the user inputs a value in the field, Webflow would use it as the HTML attribute value.
       * @example "[fs-cmsnest-collection="my-collection"]"
       */
      optionsType: 'text-input';

      /**
       * Defines a default value.
       * The UI would display this value pre-populated.
       */
      attributeValue?: string;
    }
  | {
      /**
       * Defines the setting as a numeric integer type.
       * The UI in the Settings panel would render this setting as a number input, only allowing integers.
       * If the user inputs a value in the field, Webflow would use it as the HTML attribute value.
       * @example "[fs-cmsload-duration="500"]"
       */
      optionsType: 'integer-input';

      /**
       * Defines a default value.
       * The UI would display this value pre-populated.
       */
      attributeValue?: number;
    }
  | {
      /**
       * Defines the setting as a numeric float type.
       * The UI in the Settings panel would render this setting as a number input, allowing floats.
       * If the user inputs a value in the field, Webflow would use it as the HTML attribute value.
       * @example "[fs-cmsload-threshold="25.5"]"
       */
      optionsType: 'float-input';

      /**
       * Defines a default value.
       * The UI would display this value pre-populated.
       */
      attributeValue?: number;
    };

type SolutionSettingOption = {
  /**
   * Defines the option name.
   * @example "Ease-out"
   */
  name: string;

  /**
   * A description that the UI can display the user if he/she needs more information.
   */
  description: string;

  /**
   * Defines the value that would be applied to the HTML attribute when selecting this option.
   */
  attributeValue: string;
};

type SolutionCondition =
  | {
      /**
       * Defines the type as a single condition.
       */
      type: 'condition';

      /**
       * Defines the {@link SolutionAttribute.id} who's value will be assessed.
       */
      attributeId: string;

      /**
       * Defines the value that must match the Attribute setting to fulfill the condition.
       * This is helpful when a setting can only be applied if another attribute has been already added to the element.
       * Example: `fs-cmsload-mode` can only be applied to those elements that have a `[fs-cmsload-element="list"]` attribute.
       */
      attributeValue: string | number;
    }
  | {
      /**
       * Defines the type as a group of conditions.
       */
      type: 'group';

      /**
       * Defines the conditions operator.
       */
      operator: 'or' | 'and';

      /**
       * Defines all conditions that must be fulfilled using the operator.
       */
      conditions: SolutionCondition[];
    };

/**
 * Defines Webflow's internal node types.
 */
type NodeType =
  | 'BackgroundVideoWrapper'
  | 'Block'
  | 'Blockquote'
  | 'Body'
  | 'FormCheckboxWrapper'
  | 'FormCheckboxInput'
  | 'Container'
  | 'Column'
  | 'CommerceCartWrapper'
  | 'CommerceCartOpenLink'
  | 'CommerceCartOpenLinkIcon'
  | 'DropdownLink'
  | 'DropdownList'
  | 'DropdownToggle'
  | 'DropdownWrapper'
  | 'DynamoEmpty'
  | 'DynamoItem'
  | 'DynamoList'
  | 'DynamoWrapper'
  | 'Facebook'
  | 'Grid'
  | 'HtmlEmbed'
  | 'Heading'
  | 'Icon'
  | 'Image'
  | 'FormTextInput'
  | 'FormWrapper'
  | 'FormForm'
  | 'FormInlineLabel'
  | 'FormSuccessMessage'
  | 'FormErrorMessage'
  | 'FormBlockLabel'
  | 'LineBreak'
  | 'Link'
  | 'List'
  | 'ListItem'
  | 'LightboxWrapper'
  | 'MapWidget'
  | 'NavbarWrapper'
  | 'NavbarContainer'
  | 'NavbarBrand'
  | 'NavbarMenu'
  | 'NavbarLink'
  | 'NavbarButton'
  | 'Paragraph'
  | 'FormRadioWrapper'
  | 'FormRadioInput'
  | 'FormReCaptcha'
  | 'RichText'
  | 'Row'
  | 'FormSelect'
  | 'SearchButton'
  | 'SearchForm'
  | 'SearchInput'
  | 'Span'
  | 'Strong'
  | 'Symbol'
  | 'Section'
  | 'FormButton'
  | 'SliderWrapper'
  | 'SliderMask'
  | 'SliderSlide'
  | 'SliderArrow'
  | 'SliderNav'
  | 'TabsWrapper'
  | 'TabsMenu'
  | 'TabsLink'
  | 'TabsContent'
  | 'TabsPane'
  | 'FormTextarea'
  | 'Twitter'
  | 'Video'
  | 'YouTubeVideo';
```

## Validation and deployments tool

`webflow-native` is a real npm package that has been created and deployed specifically for this proposal.

It is a tool that would allow developers to create their own solutions via a type-safe schema, and validate it before sending it to Webflow.

Validation uses [zod](https://github.com/colinhacks/zod) under the hood to ensure the data follows the correct schema.

Publishing is currently just a simple mock that represents the idea. We assume that this part would have to be discussed thoroughly to decide the best approach.

Ideally, developers would be able to add a publish step in their CI/CD workflows. But as a early MVP, other methods like manually sending a `.json` file to Webflow would be more than enough.

### Install

```bash
# install as project dependency
$ npm install --save-dev webflow-native

# or install globally
$ npm install --global webflow-native
```

### Usage

You can see an example of usage in `packages/example`, or you can visit an [Interactive Playground in Stackblitz](https://stackblitz.com/edit/webflow-native?file=README.md).

```bash
# validates and builds a schema
# "src/index.ts" would be the entry file that default-exports the schema
$ webflow-native build src/index.ts

# validates, builds and publishes (mock) a schema to Webflow
$ webflow-native publish src/index.ts
```
