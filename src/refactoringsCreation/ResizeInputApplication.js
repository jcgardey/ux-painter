import {
  REFACTORING_PREVIEW,
  RESIZE_INPUT,
  SINGLE_ELEMENT_SELECTION,
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class ResizeInputApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Select an input on the page',
      view: SINGLE_ELEMENT_SELECTION,
    },
    {
      title: 'New Input Width (in pixels)',
      view: RESIZE_INPUT,
    },
    {
      title: 'Resize Input Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default ResizeInputApplication;
