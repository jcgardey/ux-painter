import {
  REFACTORING_PREVIEW,
  ADD_LINK,
  SINGLE_ELEMENT_SELECTION,
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class AddLinkApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Select the element in the page where the new link will be placed',
      view: SINGLE_ELEMENT_SELECTION,
    },
    {
      title: 'Link Name and Target URL',
      view: ADD_LINK,
    },
    {
      title: 'Add Link Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default AddLinkApplication;