import {
  REFACTORING_PREVIEW,
  TURN_INPUT_INTO_RADIOS,
  SINGLE_ELEMENT_SELECTION,
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class TurnInputIntoRadiosApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Select an input on the page',
      view: SINGLE_ELEMENT_SELECTION,
    },
    {
      title: 'Suggested Values',
      view: TURN_INPUT_INTO_RADIOS,
    },
    {
      title: 'Turn Input Into Radios Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default TurnInputIntoRadiosApplication;
