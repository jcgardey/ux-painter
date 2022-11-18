import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement.js';

class RenameElementRefactoring extends UsabilityRefactoringOnElement {
  style = [
    {
      name: 'Element',
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
    this.oldName = this.getElement().innerHTML;
    this.getElement().innerHTML = this.getNewName();
    this.applyStyle(this.getElement(), 'Element');
  }

  checkPreconditions() {
    return super.checkPreconditions() && this.getNewName();
  }

  unDo() {
    this.getElement().innerHTML = this.oldName;
  }

  setNewName(newName) {
    this.newName = newName;
  }

  getNewName() {
    return this.newName;
  }

  targetElements() {
    return "a, button, input[type='button'], input[type='submit'], span, p, h1, h2, h3, h4, h5, h6, label";
  }

  serialize() {
    let json = super.serialize();
    json.newName = this.getNewName();
    return json;
  }

  static asString() {
    return 'Rename Element';
  }

  getDescription() {
    return "Make more clear an interactive element's label (e.g. button or link)";
  }
}

export default RenameElementRefactoring;
