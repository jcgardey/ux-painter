class RefactoringApplication {
  steps = [];
  current = null;
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

  back() {
    return this.currentIndex() - 1 >= 0
      ? this.steps[this.currentIndex() - 1]
      : this.currentStep();
  }

  next() {
    return this.currentIndex() + 1 <= this.steps.length - 1
      ? this.steps[this.currentIndex() + 1]
      : this.currentStep();
  }

  goNext() {
    this.current = this.next();
  }

  goBack() {
    this.current = this.back();
  }

  nextSteps() {
    return this.currentIndex() === this.steps.length
      ? []
      : this.steps.slice(this.currentIndex() + 1, this.steps.length);
  }

  backSteps() {
    return this.currentIndex() === 0
      ? []
      : this.steps.slice(0, this.currentIndex());
  }
}

export default RefactoringApplication;
