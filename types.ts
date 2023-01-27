export type Schema = {
  id: string;
  name: string;
  solutions: Solution[];
};

type Solution = {
  id: string;
  name: string;
  scripts: SolutionScript[];
  attributes: (SolutionAttributesGroup | SolutionAttribute)[];
};

type SolutionScript = {
  id: string;
  src: string;
  defer?: boolean;
  async?: boolean;
  location: 'head' | 'body';
};

type SolutionAttributesGroup = {
  type: 'group';
  name: string;
  attributes: SolutionAttribute[];
  nodeTypes?: NodeType[];
  conditions?: SolutionCondition[];
};

type SolutionAttribute = {
  type: 'attribute';
  id: string;
  name: string;
  description: string;
  nodeTypes?: NodeType[];
  required?: boolean;
  conditions?: SolutionCondition[];
  attributeName: string;
} & SolutionAttributeInput;

type SolutionAttributeInput =
  | {
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

type SolutionSettingOption = {
  name: string;
  description: string;
  attributeValue: string;
};

type SolutionCondition =
  | {
      type: 'condition';
      attributeId: string;
      attributeValue: string | number;
    }
  | { type: 'group'; operator: 'or' | 'and'; conditions: SolutionCondition[] };

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
