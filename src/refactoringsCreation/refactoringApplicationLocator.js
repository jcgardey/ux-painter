import AddAutocompleteApplication from './AddAutocompleteApplication';
import RefactoringWithoutParametersApplication from './RefactoringWithoutParametersApplication';
import RenameElementApplication from './RenameElementApplication';
import TurnAttributeIntoLinkApplication from './TurnAttributeIntoLinkApplication';
import AddLinkApplication from './AddLinkApplication';
import AddTooltipApplication from './AddTooltipApplication';
import LinkToTopApplication from './LinkToTopApplication';
import TurnInputIntoRadiosApplication from './TurnInputIntoRadiosApplication';
import TurnInputIntoSelectApplication from './TurnInputIntoSelectApplication';
import ResizeInputApplication from './ResizeInputApplication';
import TurnInputIntoTextareaApplication from './TurnInputIntoTextareaApplication';
import TurnSelectIntoAutocompleteApplication from './TurnSelectIntoAutocompleteApplication';

const applications = {
  AddAutocompleteRefactoring: AddAutocompleteApplication,
  AddDatePickerRefactoring: RefactoringWithoutParametersApplication,
  RenameElementRefactoring: RenameElementApplication,
  TurnAttributeIntoLinkRefactoring: TurnAttributeIntoLinkApplication,
  AddLinkRefactoring: AddLinkApplication,
  AddTooltipRefactoring: AddTooltipApplication,
  LinkToTopRefactoring: LinkToTopApplication,
  TurnInputIntoRadiosRefactoring: TurnInputIntoRadiosApplication,
  TurnInputIntoSelectRefactoring: TurnInputIntoSelectApplication,
  ResizeInputRefactoring: ResizeInputApplication,
  TurnInputIntoTextareaRefactoring: TurnInputIntoTextareaApplication,
  TurnSelectIntoAutocompleteRefactoring: TurnSelectIntoAutocompleteApplication,
};

export const locateRefactoringApplication = (refactoringName) =>
  applications[refactoringName];
