import UXRefactoring from '@/refactorings/UXRefactoring';
import RefactoringStorage from './RefactoringStorage';
import Version from './Version';

class RefactoringManager {
  private refactoringStorage: RefactoringStorage;
  private dirtyRefactorings: UXRefactoring[] = [];

  constructor() {
    this.refactoringStorage = new RefactoringStorage();
  }

  getCurrentVersion(): Version {
    return this.refactoringStorage.getCurrentVersion();
  }

  setCurrentVersion(aVersion: Version): void {
    this.refactoringStorage.setCurrentVersion(aVersion);
  }

  addVersion(aVersion: Version): void {
    this.refactoringStorage.addVersion(aVersion);
  }

  executeCurrentVersion(): void {
    this.getCurrentVersion().execute();
  }

  getOriginalVersion(): Version {
    return this.refactoringStorage.getOriginalVersion();
  }

  getOriginalVersionName(): string {
    return this.refactoringStorage.getOriginalVersionName();
  }

  save(): void {
    this.refactoringStorage.save();
  }

  getVersions(): Version[] {
    return this.refactoringStorage.getVersions();
  }

  getAllVersions(): Version[] {
    return this.refactoringStorage.getAllVersions();
  }

  addDirtyRefactoring(aRefactoring: UXRefactoring): void {
    this.dirtyRefactorings.push(aRefactoring);
  }

  getDirtyRefactorings(): UXRefactoring[] {
    return this.dirtyRefactorings;
  }

  clearDirtyRefactorings(): void {
    this.dirtyRefactorings = [];
  }

  saveDirtyRefactorings(): void {
    this.getDirtyRefactorings().forEach((dirtyRefactoring) => {
      this.getCurrentVersion().addRefactoring(dirtyRefactoring);
    });
    this.save();
    this.clearDirtyRefactorings();
  }

  getRefactoringCatalogue(): Array<{ constructor: { name: string } }> {
    // Add new refactorings here to make them available in the catalogue
    return [];
  }
}

export default RefactoringManager;
