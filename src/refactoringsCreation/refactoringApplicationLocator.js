import AddAutocompleteApplication from './AddAutocompleteApplication';
import RefactoringWithoutParametersApplication from './RefactoringWithoutParametersApplication';
import RenameElementApplication from './RenameElementApplication';
import TurnAttributeIntoLinkApplication from './TurnAttributeIntoLinkApplication';
import AddLinkApplication from './AddLinkApplication';
import AddTooltipApplication from './AddTooltipApplication';
import LinkToTopApplication from './LinkToTopApplication';
import TurnInputIntoRadiosApplication from './TurnInputIntoRadiosApplication';

const applications = {
  AddAutocompleteRefactoring: AddAutocompleteApplication,
  AddDatePickerRefactoring: RefactoringWithoutParametersApplication,
  RenameElementRefactoring: RenameElementApplication,
  TurnAttributeIntoLinkRefactoring: TurnAttributeIntoLinkApplication,
  AddLinkRefactoring: AddLinkApplication,
  AddTooltipRefactoring: AddTooltipApplication,
  LinkToTopRefactoring: LinkToTopApplication,
  TurnInputIntoRadiosRefactoring: TurnInputIntoRadiosApplication,
};

export const locateRefactoringApplication = (refactoringName) =>
  applications[refactoringName];
