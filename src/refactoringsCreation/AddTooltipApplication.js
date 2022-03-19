import {
  REFACTORING_PREVIEW,
  ADD_TOOLTIP,
  SINGLE_ELEMENT_SELECTION,
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class AddTooltipApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Select an element in the page',
      view: SINGLE_ELEMENT_SELECTION,
    },
    {
      title: 'Tooltip Name',
      view: ADD_TOOLTIP,
    },
    {
      title: 'Add Tooltip Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default AddTooltipApplication;