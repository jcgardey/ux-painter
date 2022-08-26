import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';

class ResizeInputRefactoring extends UsabilityRefactoringOnElement {
  constructor() {
    super();
  }

  transform() {
    this.getElement().style.width = this.getInputWidth() + 'px';
  }

  checkPreconditions() {
    return super.checkPreconditions() && this.getInputWidth();
  }

  unDo() {
    this.getElement().style.width = '';
  }

  setInputWidth(inputWidth) {
    this.inputWidth = inputWidth;
  }

  getInputWidth() {
    return this.inputWidth;
  }

  targetElements() {
    return 'input';
  }

  serialize() {
    let json = super.serialize();
    json.inputWidth = this.getInputWidth();
    return json;
  }

  static asString() {
    return 'Resize Input';
  }

  getDescription() {
    return 'Change the length of a text field according to the average text length that is usually entered';
  }
}

export default ResizeInputRefactoring;
