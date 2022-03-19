import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";

class AddLinkRefactoring extends UsabilityRefactoringOnElement {

  constructor() {
    super();
  }

  transform() {
    this.linkElement = document.createElement("a");
    this.linkElement.textContent = this.getLinkName();
    this.linkElement.href = this.getTargetURL();
    this.getElement().appendChild(this.linkElement);
    // this.applyStyles([this.linkElement], this.getStyle().targetElement);
  }

  checkPreconditions() {
    return super.checkPreconditions() && this.getLinkName() && this.getTargetURL();
  }

  unDo() {
    this.linkElement.parentNode.removeChild(this.linkElement);
  }

  getTargetURL() {
    return this.targetURL;
  }

  setTargetURL(aUrl) {
    this.targetURL = aUrl;
  }

  getLinkName() {
    return this.linkName;
  }

  setLinkName(aName) {
    this.linkName = aName;
  }

  targetElements() {
    return "div, ul, nav, section, header";
  }

  serialize() {
    let json = super.serialize();
    json.linkName = this.getLinkName();
    json.targetURL = this.getTargetURL();
    return json;
  }

  static asString() {
    return "Add Link";
  }

  getDescription() {
    return "Add a new link in a specific element of the target page. Link's name and destination URL must be provided";
  }

}

export default AddLinkRefactoring;