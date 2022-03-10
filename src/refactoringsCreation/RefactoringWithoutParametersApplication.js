import {
  REFACTORING_PREVIEW,
  SINGLE_ELEMENT_SELECTION,
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class RefactoringWithoutParametersApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Select an element on the page',
      view: SINGLE_ELEMENT_SELECTION,
    },
    {
      title: 'Refactoring Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default RefactoringWithoutParametersApplication;
