import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';

class TurnInputIntoTextareaRefactoring extends UsabilityRefactoringOnElement {
  style = [
    {
      name: 'Text area',
      properties: {
        float: 'none',
        color: 'black',
        backgroundColor: 'white',
        marginTop: '0px',
        marginBottom: '0px',
        marginRight: '0px',
        marginLeft: '0px',
      },
    },
  ];

  transform() {
    this.getElement().setAttribute('type', 'hidden');
    this.textArea = document.createElement('textarea');
    this.getElement().parentNode.insertBefore(this.textArea, this.getElement());
    const me = this;
    me.textArea.addEventListener('keyup', function () {
      me.getElement().value = me.textArea.value;
    });
    this.applyStyle(this.textArea, 'Text area');
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
