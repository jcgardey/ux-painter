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
      style: this.style,
    };
  }

  createRefactoring(json) {
    return new window[json.refactoring](json);
  }

  setStyle(style) {
    this.style = style;
  }

  getStyle() {
    if (!this.style) {
      this.style = {};
    }
    return this.style;
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

  getStyleGroupWithName(styleGroupName) {
    return this.style.filter(
      (elementStyle) => elementStyle.name === styleGroupName
    )[0].properties;
  }

  applyStyle(element, styleGroupName) {
    for (var property in this.getStyleGroupWithName(styleGroupName))
      element.style[property] =
        this.getStyleGroupWithName(styleGroupName)[property];
  }

  removeStyle(element, styleGroupName) {
    for (var property in this.getStyleGroupWithName(styleGroupName))
      element.style[property] = '';
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
