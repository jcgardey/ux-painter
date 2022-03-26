import {
  REFACTORING_PREVIEW
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class LinkToTopApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Link to Top Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default LinkToTopApplication;