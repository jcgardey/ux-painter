import {
  REFACTORING_PREVIEW,
  LINK_TO_TOP
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class LinkToTopApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Link to Top',
      view: LINK_TO_TOP,
    },
    {
      title: 'Link to Top Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default LinkToTopApplication;