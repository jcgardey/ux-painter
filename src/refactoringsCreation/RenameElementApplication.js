import {
  SINGLE_ELEMENT_SELECTION,
  RENAME_ELEMENT,
  REFACTORING_PREVIEW
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class RenameElementApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Select an element on the page',
      view: SINGLE_ELEMENT_SELECTION,
    },
    {
      title: 'Element Name',
      view: RENAME_ELEMENT,
    },
    {
      title: 'Add Autocomplete Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default RenameElementApplication;