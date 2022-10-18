import {
  REFACTORING_PREVIEW,
  DATE_INPUT_INTO_SELECTS,
  SINGLE_ELEMENT_SELECTION,
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class DateInputIntoSelectsApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Select a date input on the page',
      view: SINGLE_ELEMENT_SELECTION,
    },
    {
      title: 'Date Input Format',
      view: DATE_INPUT_INTO_SELECTS,
    },
    {
      title: 'Date Input Into Selects Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default DateInputIntoSelectsApplication;
