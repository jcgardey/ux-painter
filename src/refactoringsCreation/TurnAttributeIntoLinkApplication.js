import {
  REFACTORING_PREVIEW,
  TURN_ATTRIBUTE_INTO_LINK,
  SINGLE_ELEMENT_SELECTION,
} from '../routing/types';
import RefactoringApplication from './RefactoringApplication';

class TurnAttributeIntoLinkApplication extends RefactoringApplication {
  steps = [
    {
      title: 'Select the text or the image that will be converted into a link',
      view: SINGLE_ELEMENT_SELECTION,
    },
    {
      title: 'Target URL',
      view: TURN_ATTRIBUTE_INTO_LINK,
    },
    {
      title: 'Turn Attribute Into Link Preview',
      view: REFACTORING_PREVIEW,
    },
  ];
}

export default TurnAttributeIntoLinkApplication;