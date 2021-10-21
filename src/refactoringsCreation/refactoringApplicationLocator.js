import AddAutocompleteApplication from './AddAutocompleteApplication';

const applications = {
  AddAutocompleteRefactoring: AddAutocompleteApplication,
};

export const locateRefactoringApplication = (refactoringName) =>
  applications[refactoringName];
