import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';
import ReactDOM from 'react-dom';
import React from 'react';
import { RadioSet } from '../components/RadioSet/RadioSet';

class TurnInputIntoRadiosRefactoring extends UsabilityRefactoringOnElement {
  constructor() {
    super();
    this.values = [];
  }

  transform() {
    this.getElement().setAttribute('type', 'hidden');
    this.radioSetContainer = document.createElement('div');
    this.getElement().parentNode.insertBefore(
      this.radioSetContainer,
      this.getElement()
    );
    ReactDOM.render(
      <RadioSet values={this.getValues()} refactoring={this} />,
      this.radioSetContainer
    );
  }

  checkPreconditions() {
    return (
      super.checkPreconditions() &&
      this.getValues() &&
      this.getValues().length > 0
    );
  }

  unDo() {
    this.getElement().parentNode.removeChild(this.radioSetContainer);
    this.getElement().setAttribute('type', 'text');
  }

  setValues(values) {
    this.values = values;
  }

  getValues() {
    return this.values;
  }

  targetElements = function () {
    return "input[type='text']";
  };

  serialize() {
    let json = super.serialize();
    json.values = this.getValues();
    return json;
  }

  static asString() {
    return 'Turn Input into Radios';
  }

  getDescription() {
    return "Turn a regular text field into a set of radio buttons with predefined values. 'Other' option is included to enter a different value";
  }

  setItemStyle(aString) {
    this.getStyle().item = aString;
  }

  getItemStyle() {
    return this.getStyle().item;
  }

  setLabelsPosition(aString) {
    this.getStyle().labelsPosition = aString;
  }

  getLabelsPosition() {
    return this.getStyle().labelsPosition;
  }

  setLabelsStyle(aStyle) {
    this.getStyle().labels = aStyle;
  }

  getLabelsStyle() {
    if (!this.getStyle().labels) {
      return {};
    }
    return this.getStyle().labels;
  }

  getOtherInputStyle() {
    if (!this.getStyle().otherInput) {
      return {};
    }
    return this.getStyle().otherInput;
  }

  setOtherInputStyle(style) {
    this.getStyle().otherInput = style;
  }
}

export default TurnInputIntoRadiosRefactoring;
