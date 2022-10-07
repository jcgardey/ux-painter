import {
  REFACTORING_PREVIEW,
  FORMAT_INPUT,
  SINGLE_ELEMENT_SELECTION,
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class FormatInputApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Select an input on the page',
      view: SINGLE_ELEMENT_SELECTION,
    },
    {
      title: 'Input Format',
      view: FORMAT_INPUT,
    },
    {
      title: 'Format Input Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default FormatInputApplication;
