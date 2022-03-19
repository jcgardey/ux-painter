import AddAutocompleteApplication from './AddAutocompleteApplication';
import RefactoringWithoutParametersApplication from './RefactoringWithoutParametersApplication';
import RenameElementApplication from './RenameElementApplication';
import TurnAttributeIntoLinkApplication from './TurnAttributeIntoLinkApplication';
import AddLinkApplication from './AddLinkApplication';
import AddTooltipApplication from './AddTooltipApplication';

const applications = {
  AddAutocompleteRefactoring: AddAutocompleteApplication,
  AddDatePickerRefactoring: RefactoringWithoutParametersApplication,
  RenameElementRefactoring: RenameElementApplication,
  TurnAttributeIntoLinkRefactoring: TurnAttributeIntoLinkApplication,
  AddLinkRefactoring: AddLinkApplication,
  AddTooltipRefactoring: AddTooltipApplication
};

export const locateRefactoringApplication = (refactoringName) =>
  applications[refactoringName];