import {
  REFACTORING_PREVIEW,
  SINGLE_ELEMENT_SELECTION,
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class TurnSelectIntoAutocompleteApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Select a select on the page',
      view: SINGLE_ELEMENT_SELECTION,
    },
    {
      title: 'Turn Select Into Autocomplete Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default TurnSelectIntoAutocompleteApplication;
