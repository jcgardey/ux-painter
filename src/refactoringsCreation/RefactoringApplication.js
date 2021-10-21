class RefactoringApplication {
  steps = [];
  current = this.steps[0];
  refactoring = null;

  constructor(aRefactoring) {
    this.refactoring = aRefactoring;
  }

  currentIndex() {
    return this.steps.indexOf(this.current);
  }

  currentStep() {
    return this.current;
  }

  currentStepNumber() {
    return this.currentIndex() + 1;
  }

  stepNumber(step) {
    return this.steps.indexOf(step) + 1;
  }

  nextStep() {
    if (this.currentIndex() + 1 < this.steps.length) {
      this.current = this.steps[this.currentIndex() + 1];
    }
    return this.current;
  }

  back() {
    if (this.currentIndex() - 1 >= 0) {
      this.current = this.steps[this.currentIndex() - 1];
    }
    return this.current;
  }

  nextSteps() {
    return this.currentIndex() === this.steps.length
      ? []
      : this.steps.slice(this.currentIndex() + 1, this.steps.length);
  }

  backSteps() {
    return this.currentIndex() === 0
      ? []
      : this.steps.slice(0, this.currentIndex() - 1);
  }
}

export default RefactoringApplication;
