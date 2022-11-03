import {
  REFACTORING_PREVIEW,
  ADD_FORM_VALIDATION,
  SINGLE_ELEMENT_SELECTION,
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class AddFormValidationApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Select a submit button on the page',
      view: SINGLE_ELEMENT_SELECTION,
    },
    {
      title: 'Select the required inputs in the form',
      view: ADD_FORM_VALIDATION,
    },
    {
      title: 'Add Form Validation Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default AddFormValidationApplication;
