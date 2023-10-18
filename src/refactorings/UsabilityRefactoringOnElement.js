import XPathInterpreter from '../utils/XPathInterpreter';
import UsabilityRefactoring from './UsabilityRefactoring';

class UsabilityRefactoringOnElement extends UsabilityRefactoring {
  constructor() {
    super();
  }

  setElementXpath(elementXpath) {
    this.elementXpath = elementXpath;
  }

  setElement(anElement) {
    this.targetElement = anElement;
  }

  getElementXpath() {
    return this.elementXpath;
  }

  getElement() {
    if (!this.targetElement) {
      this.targetElement = new XPathInterpreter().getSingleElementByXpath(
        this.elementXpath,
        document.body
      );
    }
    return this.targetElement;
  }

  isApplicable() {
    return this.getElement() !== null;
  }

  serialize() {
    let json = super.serialize();
    json.elementXpath = this.getElementXpath();
    return json;
  }

  isOnElement() {
    return true;
  }

  clone() {
    let clonedRefactoring = super.clone();
    clonedRefactoring.setElementXpath(this.getElementXpath());
    return clonedRefactoring;
  }

  isTargetAnImage() {
    return this.getElement().tagName == 'IMG';
  }
}

export default UsabilityRefactoringOnElement;
