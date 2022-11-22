import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';

class FormatInputRefactoring extends UsabilityRefactoringOnElement {
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
    this.handler = this.handler.bind(this);
  }

  setFormatString(aString) {
    this.formatString = aString;
  }

  getFormatString() {
    return this.formatString;
  }

  checkPreconditions() {
    return super.checkPreconditions() && this.getFormatString();
  }

  handler(event) {
    let input = this.getElement();
    if (this.getFormatString().length >= input.value.length) {
      if (this.getFormatString()[input.value.length - 1] == 0) {
        if (isNaN(input.value[input.value.length - 1])) {
          input.value = input.value.substring(0, input.value.length - 1);
        } else {
          let character = input.value.length;
          while (
            event.data != null &&
            this.getFormatString().length > input.value.length &&
            this.getFormatString()[character] != 0 &&
            this.getFormatString()[character] != 'S' &&
            this.getFormatString()[character] != 'A'
          ) {
            input.value = input.value + this.getFormatString()[character];
            character += 1;
          }
        }
      } else {
        if (this.getFormatString()[input.value.length - 1] == 'S') {
          if (isNaN(input.value[input.value.length - 1]) == false) {
            input.value = input.value.substring(0, input.value.length - 1);
          } else {
            let character = input.value.length;
            while (
              event.data != null &&
              this.getFormatString().length > input.value.length &&
              this.getFormatString()[character] != 0 &&
              this.getFormatString()[character] != 'S' &&
              this.getFormatString()[character] != 'A'
            ) {
              input.value = input.value + this.getFormatString()[character];
              character += 1;
            }
          }
        } else {
          if (this.getFormatString()[input.value.length - 1] == 'A') {
            let character = input.value.length;
            while (
              event.data != null &&
              this.getFormatString().length > input.value.length &&
              this.getFormatString()[character] != 0 &&
              this.getFormatString()[character] != 'S' &&
              this.getFormatString()[character] != 'A'
            ) {
              input.value = input.value + this.getFormatString()[character];
              character += 1;
            }
          } else {
            if (
              event.data != null &&
              (isNaN(this.getFormatString()[input.value.length]) ==
                isNaN(event.data) ||
                this.getFormatString()[input.value.length] == 'A')
            ) {
              input.value = input.value.substring(0, input.value.length - 1);
              let character = input.value.length;
              while (
                this.getFormatString().length > input.value.length &&
                this.getFormatString()[character] != 0 &&
                this.getFormatString()[character] != 'S' &&
                this.getFormatString()[character] != 'A'
              ) {
                input.value = input.value + this.getFormatString()[character];
                character += 1;
              }
              input.value = input.value + event.data;
            } else {
              if (event.data != null) {
                input.value = input.value.substring(0, input.value.length - 1);
              }
            }
          }
        }
      }
    } else {
      input.value = input.value.substring(0, input.value.length - 1);
    }
  }

  transform() {
    let input = this.getElement();
    input.placeholder = this.getPlaceholder();
    this.applyStyle(input, 'Input');
    input.addEventListener('input', this.handler);
  }

  unDo() {
    let input = this.getElement();
    input.removeEventListener('input', this.handler);
  }

  targetElements() {
    return "input[type='text']";
  }

  getPlaceholder() {
    let placeholder = '';
    for (let i = 0; i < this.getFormatString().length; i++) {
      if (['0', 'A', 'S'].indexOf(this.getFormatString()[i]) != -1) {
        placeholder += '_';
      } else {
        placeholder += this.getFormatString()[i];
      }
    }
    return placeholder;
  }

  serialize() {
    let json = super.serialize();
    json.formatString = this.getFormatString();
    return json;
  }

  static asString() {
    return 'Format Input';
  }

  getDescription() {
    return 'Add a mask to a text field in order to limit the input to a certain characters';
  }
}

export default FormatInputRefactoring;
