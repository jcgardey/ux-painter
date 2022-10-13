import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';

class FormatInputRefactoring extends UsabilityRefactoringOnElement {
  constructor() {
    super();
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

  transform() {
    const me = this;
    let input = this.getElement();
    input.placeholder = this.getPlaceholder();
    input.addEventListener('input', (event) => {
      if (me.getFormatString().length >= input.value.length) {
        if (me.getFormatString()[input.value.length - 1] == 0) {
          if (isNaN(input.value[input.value.length - 1])) {
            input.value = input.value.substring(0, input.value.length - 1);
          } else {
            let character = input.value.length;
            while (
              event.data != null &&
              me.getFormatString().length > input.value.length &&
              me.getFormatString()[character] != 0 &&
              me.getFormatString()[character] != 'S' &&
              me.getFormatString()[character] != 'A'
            ) {
              input.value = input.value + me.getFormatString()[character];
              character += 1;
            }
          }
        } else {
          if (me.getFormatString()[input.value.length - 1] == 'S') {
            if (isNaN(input.value[input.value.length - 1]) == false) {
              input.value = input.value.substring(0, input.value.length - 1);
            } else {
              let character = input.value.length;
              while (
                event.data != null &&
                me.getFormatString().length > input.value.length &&
                me.getFormatString()[character] != 0 &&
                me.getFormatString()[character] != 'S' &&
                me.getFormatString()[character] != 'A'
              ) {
                input.value = input.value + me.getFormatString()[character];
                character += 1;
              }
            }
          } else {
            if (me.getFormatString()[input.value.length - 1] == 'A') {
              let character = input.value.length;
              while (
                event.data != null &&
                me.getFormatString().length > input.value.length &&
                me.getFormatString()[character] != 0 &&
                me.getFormatString()[character] != 'S' &&
                me.getFormatString()[character] != 'A'
              ) {
                input.value = input.value + me.getFormatString()[character];
                character += 1;
              }
            } else {
              if (
                event.data != null &&
                (isNaN(me.getFormatString()[input.value.length]) ==
                  isNaN(event.data) ||
                  me.getFormatString()[input.value.length] == 'A')
              ) {
                input.value = input.value.substring(0, input.value.length - 1);
                let character = input.value.length;
                while (
                  me.getFormatString().length > input.value.length &&
                  me.getFormatString()[character] != 0 &&
                  me.getFormatString()[character] != 'S' &&
                  me.getFormatString()[character] != 'A'
                ) {
                  input.value = input.value + me.getFormatString()[character];
                  character += 1;
                }
                input.value = input.value + event.data;
              } else {
                if (event.data != null) {
                  input.value = input.value.substring(
                    0,
                    input.value.length - 1
                  );
                }
              }
            }
          }
        }
      } else {
        input.value = input.value.substring(0, input.value.length - 1);
      }
    });
  }

  unDo() {}

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
