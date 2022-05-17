import {
  REFACTORING_PREVIEW,
  TURN_INPUT_INTO_SELECT,
  SINGLE_ELEMENT_SELECTION,
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class TurnInputIntoSelectApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Select an input on the page',
      view: SINGLE_ELEMENT_SELECTION,
    },
    {
      title: 'Suggested Values',
      view: TURN_INPUT_INTO_SELECT,
    },
    {
      title: 'Turn Input Into Select Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default TurnInputIntoSelectApplication;
