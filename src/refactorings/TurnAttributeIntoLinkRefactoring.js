import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";

class TurnAttributeIntoLinkRefactoring extends UsabilityRefactoringOnElement {

  transform() {
    this.linkElement = document.createElement("a");
    this.linkElement.href = this.getTargetURL();
    if (this.isTargetAnImage()) {
      this.getElement().parentNode.replaceChild(this.linkElement, this.getElement());
      this.linkElement.appendChild(this.getElement());
    }
    else {
      this.linkElement.innerHTML = this.getElement().innerHTML;
      this.getElement().innerHTML = "";
      this.getElement().appendChild(this.linkElement);
    }
    // this.applyStyles([this.linkElement], this.getStyle().targetElement);
  }

  checkPreconditions() {
    return super.checkPreconditions() && this.getTargetURL();
  }

  unDo() {
    if (this.isTargetAnImage()) {
      this.linkElement.parentNode.replaceChild(this.getElement(), this.linkElement);
    }
    else {
      this.getElement().removeChild(this.linkElement);
      this.getElement().innerHTML = this.linkElement.innerHTML;
    }
  }

  setTargetURL(aUrl) {
    this.targetURL = aUrl;
  }

  getTargetURL() {
    return this.targetURL;
  }

  targetElements() {
    return "p, span, h1, h2, h3, h4, h5, h6, img, li";
  }

  serialize() {
    let json = super.serialize();
    json.targetURL = this.getTargetURL();
    return json;
  }

  static asString() {
    return "Turn Attribute into Link";
  }

  getDescription() {
    return "Provide navigation features to a static content that users intend to click";
  }

}

export default TurnAttributeIntoLinkRefactoring;