import {
  REFACTORING_PREVIEW,
  ADD_AUTOCOMPLETE_SUGGESTED_VALUES,
  SINGLE_ELEMENT_SELECTION,
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class AddAutocompleteApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Select an input on the page',
      view: SINGLE_ELEMENT_SELECTION,
    },
    {
      title: 'Suggested Values',
      view: ADD_AUTOCOMPLETE_SUGGESTED_VALUES,
    },
    {
      title: 'Add Autocomplete Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default AddAutocompleteApplication;
