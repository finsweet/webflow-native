import type { Schema } from 'webflow-native';

const schema: Schema = {
  id: 'fs-attributes',
  name: 'Finsweet Attributes',
  solutions: [
    {
      id: 'cmsload',
      name: 'CMS Load',
      scripts: [
        {
          id: 'main',
          src: 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsload@1/cmsload.js',
          async: true,
          location: 'head',
        },
      ],
      attributes: [
        {
          type: 'attribute',
          id: 'element',
          name: 'Element',
          description: 'Defines the type of element.',
          required: true,
          attributeName: 'fs-cmsload-element',
          nodeTypes: ['DynamoList'],
          optionsType: 'dropdown',
          options: [
            {
              name: 'List',
              description: 'Defines a list instance.',
              attributeValue: 'list',
            },
            {
              name: 'Loader',
              description: 'Defines an element that will display while the list is being populated',
              attributeValue: 'loader',
            },
          ],
        },
        {
          type: 'group',
          name: 'List settings',
          nodeTypes: ['DynamoList'],
          conditions: [
            {
              type: 'condition',
              attributeId: 'element',
              attributeValue: 'list',
            },
          ],
          attributes: [
            {
              id: 'mode',
              type: 'attribute',
              name: 'Mode',
              description: 'Defines the loading mode',
              required: true,
              attributeName: 'fs-cmsload-mode',
              attributeValue: 'load-under',
              optionsType: 'dropdown',
              options: [
                {
                  name: 'Load Under',
                  description: 'Loads new items when clicking the Next button',
                  attributeValue: 'load-under',
                },
                {
                  name: 'Render All',
                  description: 'Loads all items at once',
                  attributeValue: 'render-all',
                },
                {
                  name: 'Pagination',
                  description: 'Creates pagination buttons',
                  attributeValue: 'pagination',
                },
                {
                  name: 'Infinite',
                  description: 'Loads new items when the user scrolls at the bottom of the list',
                  attributeValue: 'infinite',
                },
              ],
            },
            {
              type: 'attribute',
              id: 'animation',
              name: 'Animation',
              description: 'Defines the animation that runs when rendering new items.',
              attributeName: 'fs-cmsload-animation',
              required: true,
              attributeValue: 'ease-out',
              optionsType: 'dropdown',
              options: [
                {
                  name: 'Ease-out',
                  description: 'Ease-out animation.',
                  attributeValue: 'ease-out',
                },
                {
                  name: 'Ease-in',
                  description: 'Ease-in animation.',
                  attributeValue: 'ease-in',
                },
              ],
            },
            {
              type: 'attribute',
              id: 'duration',
              name: 'Duration',
              description: 'Defines the list animation duration.',
              required: true,
              attributeName: 'fs-cmsload-duration',
              attributeValue: 500,
              optionsType: 'integer-input',
            },
            {
              type: 'attribute',
              id: 'stagger',
              name: 'Stagger load',
              description: 'Defines if the items animation should be staggered',
              attributeName: 'fs-cmsload-stagger',
              required: false,
              attributeValue: 0,
              optionsType: 'integer-input',
            },
            {
              type: 'attribute',
              id: 'resetix',
              name: 'Stagger load',
              description: 'Defines if the items animation should be staggered',
              attributeName: 'fs-cmsload-resetix',
              required: false,
              optionsType: 'checkbox',
            },
          ],
        },
        {
          type: 'group',
          name: 'Pagination settings',
          nodeTypes: ['DynamoList'],
          conditions: [
            {
              type: 'group',
              operator: 'and',
              conditions: [
                {
                  type: 'condition',
                  attributeId: 'element',
                  attributeValue: 'list',
                },
                {
                  type: 'condition',
                  attributeId: 'mode',
                  attributeValue: 'pagination',
                },
              ],
            },
          ],
          attributes: [
            {
              type: 'attribute',
              id: 'siblings',
              name: 'Siblings',
              description:
                'Defines the amount of digits to display either side of the current page.',
              required: true,
              attributeName: 'fs-cmsload-siblings',
              attributeValue: 2,
              optionsType: 'integer-input',
            },
            {
              type: 'attribute',
              id: 'boundary',
              name: 'Boundary',
              description:
                'Customize the page siblings by breakpoint by using comma separated values for each breakpoint: "desktop, tablet, mobile landscape, mobile portrait". For example: "3,2,1,1',
              attributeName: 'fs-cmsload-boundary',
              attributeValue: '2,2,1,1',
              optionsType: 'text-input',
            },
          ],
        },
      ],
    },
  ],
};

export default schema;
