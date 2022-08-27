import {
  REFACTORING_PREVIEW,
  SINGLE_ELEMENT_SELECTION,
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class TurnInputIntoTextareaApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Select an input on the page',
      view: SINGLE_ELEMENT_SELECTION,
    },
    {
      title: 'Turn Input Into Textarea Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default TurnInputIntoTextareaApplication;
