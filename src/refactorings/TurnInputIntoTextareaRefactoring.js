import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';

class TurnInputIntoTextareaRefactoring extends UsabilityRefactoringOnElement {
  transform() {
    this.getElement().setAttribute('type', 'hidden');
    this.textArea = document.createElement('textarea');
    this.getElement().parentNode.insertBefore(this.textArea, this.getElement());
    const me = this;
    me.textArea.addEventListener('keyup', function () {
      me.getElement().value = me.textArea.value;
    });
    // this.applyStyles([this.textArea], this.getStyle().targetElement);
  }

  unDo() {
    this.textArea.parentNode.removeChild(this.textArea);
    this.getElement().setAttribute('type', 'text');
  }

  targetElements() {
    return "input[type='text']";
  }

  static asString() {
    return 'Turn Input into Textarea';
  }

  getDescription() {
    return 'Replace a text field with a text area to make easier the input of a long text';
  }
}

export default TurnInputIntoTextareaRefactoring;
