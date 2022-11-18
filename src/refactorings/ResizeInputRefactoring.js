import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';

class ResizeInputRefactoring extends UsabilityRefactoringOnElement {
  style = [
    {
      name: 'Input',
      properties: {
        color: 'black',
        backgroundColor: 'white',
        textAlign: 'left',
        marginTop: '0px',
        marginBottom: '0px',
        marginRight: '0px',
        marginLeft: '0px',
        border: 'none',
      },
    },
  ];

  constructor() {
    super();
  }

  transform() {
    this.getElement().style.width = this.getInputWidth() + 'px';
    this.applyStyle(this.getElement(), 'Input');
  }

  checkPreconditions() {
    return super.checkPreconditions() && this.getInputWidth();
  }

  unDo() {
    this.getElement().style.width = '';
  }

  setInputWidth(inputWidth) {
    this.inputWidth = inputWidth;
  }

  getInputWidth() {
    return this.inputWidth;
  }

  targetElements() {
    return 'input';
  }

  serialize() {
    let json = super.serialize();
    json.inputWidth = this.getInputWidth();
    return json;
  }

  static asString() {
    return 'Resize Input';
  }

  getDescription() {
    return 'Change the length of a text field according to the average text length that is usually entered';
  }
}

export default ResizeInputRefactoring;
