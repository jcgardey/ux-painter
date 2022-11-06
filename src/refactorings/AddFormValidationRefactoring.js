import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';
import XPathInterpreter from '../utils/XPathInterpreter';

class AddFormValidationRefactoring extends UsabilityRefactoringOnElement {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  checkValidations(requiredInput, index) {
    if (
      this.getRequiredInputXpaths()[1][index] == 'required' &&
      requiredInput.value != ''
    ) {
      return false;
    } else {
      if (
        this.getRequiredInputXpaths()[1][index] == 'regular_expression' &&
        new RegExp(
          this.getRequiredInputXpaths()[2][index].substring(
            1,
            this.getRequiredInputXpaths()[2][index].length - 1
          )
        ).test(requiredInput.value)
      ) {
        return false;
      } else {
        return true;
      }
    }
  }

  onSubmit(event) {
    let invalidInputs = false;
    const me = this;
    this.getRequiredInputs().map((requiredInput, index) => {
      if (me.checkValidations(requiredInput, index)) {
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
    this.submit = this.getElement();
    this.button = this.submit.cloneNode(true);
    this.button.setAttribute('type', 'button');
    this.button.addEventListener('click', this.onSubmit);
    this.submit.style.display = 'none';
    this.submit.parentNode.insertBefore(this.button, this.submit);
  }

  unDo() {
    this.button.parentNode.removeChild(this.button);
    this.submit.style.display = '';
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
    return this.getRequiredInputXpaths()[0].map(function (inputXpath) {
      return new XPathInterpreter().getElementByXPath(
        inputXpath,
        me.getElement()
      );
    });
  }

  targetElements() {
    return "input[type='submit'],button[type='submit']";
  }

  static asString() {
    return 'Add Form Validation';
  }

  getDescription() {
    return 'Provide client validation to a form when the user submits it. Mandatory fields must be indicated';
  }
}

export default AddFormValidationRefactoring;
