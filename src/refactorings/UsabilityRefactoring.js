class UsabilityRefactoring {
  initialize() {}
  transform() {}

  static asString() {}

  execute() {
    this.initialize();
    if (this.isApplicable()) {
      this.transform();
    } else {
      console.log('Invalid refactoring');
    }
  }

  isApplicable() {
    return true;
  }

  isOnElement() {
    return false;
  }

  serialize() {
    return {
      refactoring: this.constructor.name,
      url: this.getURL(),
      style: this.getStyle(),
    };
  }

  createRefactoring(json) {
    return new window[json.refactoring](json);
  }

  setStyle(style) {
    this.style = style;
  }

  setURL(url) {
    this.url = url;
  }

  getURL() {
    return this.url;
  }

  clone() {
    let clone = new this.constructor();
    return clone;
  }

  getElementsXpath(elements) {
    const me = this;
    return elements.map((element) => {
      return me.xpathInterpreter.getPath(
        me.getElementInContext(element),
        me.getContext()
      )[0];
    });
  }

  applyStyles(element, styleObject) {
    for (var property in styleObject)
      element.style[property] = styleObject[property];
  }

  static fromJSON(json) {
    let refactoring = new (window.refactoringManager.getRefactoringClass(
      json.refactoring
    ))();
    Object.keys(json).map(function (key) {
      refactoring[key] = json[key];
    });
    return refactoring;
  }

  getDescription() {
    return '';
  }
}

export default UsabilityRefactoring;
