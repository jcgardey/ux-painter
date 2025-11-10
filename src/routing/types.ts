const ROUTING_TYPES = {
  VERSION_LIST: 'version_list',
  VERSION: 'version',
  EDIT_VERSION: 'edit_version',
  REFACTORING_CATALOGUE: 'refactoring_list',

  SINGLE_ELEMENT_SELECTION: 'single_element_selection',
  REFACTORING_PREVIEW: 'refactoring_preview',

  ADD_AUTOCOMPLETE_SUGGESTED_VALUES: 'add_autocomplete_suggested_values',
  RENAME_ELEMENT: 'rename_element',
  TURN_ATTRIBUTE_INTO_LINK: 'turn_attribute_into_link',
  ADD_LINK: 'add_link',
  ADD_TOOLTIP: 'add_tooltip',
  TURN_INPUT_INTO_RADIOS: 'turn_input_into_radios',
  TURN_INPUT_INTO_SELECT: 'turn_input_into_select',
  RESIZE_INPUT: 'resize_input',
  FORMAT_INPUT: 'format_input',
  DATE_INPUT_INTO_SELECTS: 'date_input_into_selects',
  ADD_FORM_VALIDATION: 'add_form_validation',
};

export type RouteName = keyof typeof ROUTING_TYPES;

// Named exports for backward compatibility
export const {
  VERSION_LIST,
  VERSION,
  EDIT_VERSION,
  REFACTORING_CATALOGUE,
  SINGLE_ELEMENT_SELECTION,
  REFACTORING_PREVIEW,
  ADD_AUTOCOMPLETE_SUGGESTED_VALUES,
  RENAME_ELEMENT,
  TURN_ATTRIBUTE_INTO_LINK,
  ADD_LINK,
  ADD_TOOLTIP,
  TURN_INPUT_INTO_RADIOS,
  TURN_INPUT_INTO_SELECT,
  RESIZE_INPUT,
  FORMAT_INPUT,
  DATE_INPUT_INTO_SELECTS,
  ADD_FORM_VALIDATION,
} = ROUTING_TYPES;

export default ROUTING_TYPES;
