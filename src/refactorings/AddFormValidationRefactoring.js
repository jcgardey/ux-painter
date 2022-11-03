import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';
import XPathInterpreter from '../utils/XPathInterpreter';

class AddFormValidationRefactoring extends UsabilityRefactoringOnElement {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    let invalidInputs = false;
    this.getRequiredInputs().map(function (requiredInput) {
      if (!requiredInput || !requiredInput.value) {
        requiredInput.style.backgroundColor = 'rgb(255,200,200)';
        invalidInputs = true;
      } else {
        requiredInput.style.backgroundColor = '';
      }
    });
    if (invalidInputs) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return false;
    } else {
      this.getElement().click();
    }
  }

  transform() {
    this.getElement().addEventListener('click', this.onSubmit);
  }

  unDo() {
    this.getElement().removeEventListener('click', this.onSubmit);
  }

  checkPreconditions() {
    return (
      super.checkPreconditions() &&
      this.requiredInputXpaths &&
      this.requiredInputXpaths.length > 0
    );
  }

  setRequiredInputXpaths(aCollection) {
    this.requiredInputXpaths = aCollection;
  }

  getRequiredInputXpaths() {
    return this.requiredInputXpaths;
  }

  getRequiredInputs() {
    const me = this;
    return this.getRequiredInputXpaths().map(function (inputXpath) {
      return new XPathInterpreter().getElementByXPath(
        inputXpath,
        me.getElement()
      );
    });
  }

  targetElements() {
    return "input[type='submit'],button[type='submit']";
  }

  clone(aContext) {
    let clonedRefactoring = super.clone(aContext);
    clonedRefactoring.setRequiredInputXpaths(this.getRequiredInputXpaths());
    return clonedRefactoring;
  }

  static asString() {
    return 'Add Form Validation';
  }

  getDescription() {
    return 'Provide client validation to a form when the user submits it. Mandatory fields must be indicated';
  }
}

export default AddFormValidationRefactoring;
