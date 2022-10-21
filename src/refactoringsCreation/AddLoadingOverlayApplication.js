import {
  REFACTORING_PREVIEW,
  SINGLE_ELEMENT_SELECTION,
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class AddLoadingOverlayApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Select a button on the page',
      view: SINGLE_ELEMENT_SELECTION,
    },
    {
      title: 'Add Loading Overlay Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default AddLoadingOverlayApplication;
