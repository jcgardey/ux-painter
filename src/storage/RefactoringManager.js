import RefactoringStorage from './RefactoringStorage';
import AddAutocompleteRefactoring from '../refactorings/AddAutocompleteRefactoring';
import AddDatePickerRefactoring from '../refactorings/AddDatePickerRefactoring';
import RenameElementRefactoring from '../refactorings/RenameElementRefactoring';
import TurnAttributeIntoLinkRefactoring from '../refactorings/TurnAttributeIntoLinkRefactoring';

class RefactoringManager {
  constructor() {
    this.refactoringStorage = new RefactoringStorage();
    this.dirtyRefactorings = [];
  }

  getCurrentVersion() {
    return this.refactoringStorage.getCurrentVersion();
  }

  setCurrentVersion(aVersion) {
    this.refactoringStorage.setCurrentVersion(aVersion);
  }

  addVersion(aVersion) {
    this.refactoringStorage.addVersion(aVersion);
  }

  executeCurrentVersion() {
    this.getCurrentVersion().execute();
  }

  getOriginalVersion() {
    return this.refactoringStorage.getOriginalVersion();
  }

  getOriginalVersionName() {
    return this.refactoringStorage.getOriginalVersionName();
  }

  save() {
    this.refactoringStorage.save();
  }

  getVersions() {
    return this.refactoringStorage.getVersions();
  }

  getAllVersions() {
    return this.refactoringStorage.getAllVersions();
  }

  addDirtyRefactoring(aRefactoring) {
    this.dirtyRefactorings.push(aRefactoring);
  }

  getDirtyRefactorings() {
    return this.dirtyRefactorings;
  }

  clearDirtyRefactorings() {
    this.dirtyRefactorings = [];
  }

  saveDirtyRefactorings() {
    const me = this;
    this.getDirtyRefactorings().map((dirtyRefactoring) => {
      me.getCurrentVersion().addRefactoring(dirtyRefactoring);
    });
    this.save();
    this.clearDirtyRefactorings();
  }

  getRefactoringCatalogue() {
    return [
      AddAutocompleteRefactoring,
      AddDatePickerRefactoring,
      RenameElementRefactoring,
      TurnAttributeIntoLinkRefactoring
      
      /*AddFormValidationRefactoring, AddInlineFormValidationRefactoring,
            AddLinkRefactoring,AddProcessingPageRefactoring, AddTooltipRefactoring, DateInputIntoSelectsRefactoring, DistributeMenuRefactoring, FormatInputRefactoring, LinkToTopRefactoring, RenameElementRefactoring,
            ResizeInputRefactoring, SplitPageRefactoring, TurnAttributeIntoLinkRefactoring,
        TurnInputIntoRadiosRefactoring, TurnInputIntoSelectRefactoring, TurnInputIntoTextareaRefactoring, TurnSelectIntoAutocompleteRefactoring*/,
      ,
    ];
  }

  getRefactoringClass(aString) {
    let classes = this.getRefactoringCatalogue().filter(function (classObject) {
      return classObject.name === aString;
    });
    return classes ? classes[0] : null;
  }
}

export default RefactoringManager;
