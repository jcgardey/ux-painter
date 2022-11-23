import AddFormValidationRefactoring from './AddFormValidationRefactoring';
import XPathInterpreter from '../utils/XPathInterpreter';

class AddInlineValidationRefactoring extends AddFormValidationRefactoring {
  style = [
    {
      name: 'Error message',
      properties: {
        'font-size': '16px',
        'font-weight': 'normal',
        textAlign: 'left',
      },
    },
  ];

  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.xpathInterpreter = new XPathInterpreter();
  }

  onBlur(e) {
    for (let i = 0; i < this.requiredInputXpaths[0].length; i++) {
      if (
        this.requiredInputXpaths[0][i] ==
        this.xpathInterpreter.getPath(e.target, document.body)
      ) {
        if (this.requiredInputXpaths[1][i] == 'required') {
          if (!e.target || !e.target.value) {
            e.target.style.backgroundColor = 'rgb(255,200,200)';
            this.inputStates[
              this.xpathInterpreter.getPath(e.target, document.body)
            ] = false;
            if (
              this.getRequiredInputs()[i].nextElementSibling.id !=
              'error_message_' + i
            ) {
              let error = document.createElement('p');
              error.id = 'error_message_' + i;
              error.style.color = 'red';
              error.style.margin = '0px';
              error.innerText = this.getRequiredInputXpaths()[3][i];
              this.getRequiredInputs()[i].parentNode.insertBefore(
                error,
                this.getRequiredInputs()[i].nextElementSibling
              );
            }
            let node = document.getElementById('error_message_' + i);
            this.applyStyle(node, 'Error message');
          } else {
            e.target.style.backgroundColor = '';
            this.inputStates[
              this.xpathInterpreter.getPath(e.target, document.body)
            ] = true;
            if (
              this.getRequiredInputs()[i].nextElementSibling.id ==
              'error_message_' + i
            ) {
              let node = document.getElementById('error_message_' + i);
              this.getRequiredInputs()[i].parentNode.removeChild(node);
            }
          }
        } else {
          if (
            new RegExp(
              this.requiredInputXpaths[2][i].substring(
                1,
                this.requiredInputXpaths[2][i].length - 1
              )
            ).test(e.target.value)
          ) {
            e.target.style.backgroundColor = '';
            this.inputStates[
              this.xpathInterpreter.getPath(e.target, document.body)
            ] = true;
            if (
              this.getRequiredInputs()[i].nextElementSibling.id ==
              'error_message_' + i
            ) {
              let node = document.getElementById('error_message_' + i);
              this.getRequiredInputs()[i].parentNode.removeChild(node);
            }
          } else {
            e.target.style.backgroundColor = 'rgb(255,200,200)';
            this.inputStates[
              this.xpathInterpreter.getPath(e.target, document.body)
            ] = false;
            if (
              this.getRequiredInputs()[i].nextElementSibling.id !=
              'error_message_' + i
            ) {
              let error = document.createElement('p');
              error.id = 'error_message_' + i;
              error.style.color = 'red';
              error.style.margin = '0px';
              error.innerText = this.getRequiredInputXpaths()[3][i];
              this.getRequiredInputs()[i].parentNode.insertBefore(
                error,
                this.getRequiredInputs()[i].nextElementSibling
              );
            }
            let node = document.getElementById('error_message_' + i);
            this.applyStyle(node, 'Error message');
          }
        }
      }
    }
  }

  onSubmit(event) {
    let invalidInput = false;
    const me = this;
    Object.keys(this.inputStates).forEach(function (key, index) {
      if (!me.inputStates[key]) {
        let input = me.xpathInterpreter.getSingleElementByXpath(
          key,
          document.body
        );
        input.style.backgroundColor = 'rgb(255,200,200)';
        invalidInput = true;
        if (input.nextElementSibling.id != 'error_message_' + index) {
          let error = document.createElement('p');
          error.id = 'error_message_' + index;
          error.style.color = 'red';
          error.style.margin = '0px';
          error.innerText = me.getRequiredInputXpaths()[3][index];
          input.parentNode.insertBefore(error, input.nextElementSibling);
        }
        let node = document.getElementById('error_message_' + index);
        me.applyStyle(node, 'Error message');
        return false;
      }
    });
    if (invalidInput) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return false;
    } else {
      this.getElement().click();
    }
  }

  transform() {
    this.inputStates = {};
    for (let i = 0; i < this.requiredInputXpaths[0].length; i++) {
      this.inputStates[this.requiredInputXpaths[0][i]] = false;
      let input = this.xpathInterpreter.getSingleElementByXpath(
        this.requiredInputXpaths[0][i],
        document.body
      );
      input.addEventListener('blur', this.onBlur);
    }

    this.submit = this.getElement();
    this.button = this.submit.cloneNode(true);
    this.button.setAttribute('type', 'button');
    this.button.addEventListener('click', this.onSubmit);
    this.submit.style.display = 'none';
    this.submit.parentNode.insertBefore(this.button, this.submit);
  }

  unDo() {
    this.button.parentNode.removeChild(this.button);
    this.submit.style.display = '';
    const me = this;
    this.getRequiredInputs().map((requiredInput) => {
      requiredInput.removeEventListener('blur', me.onBlur);
    });
  }

  static asString() {
    return 'Add Inline Validation';
  }

  getDescription() {
    return 'Provide client inline validation to a form. Mandatory fields must be indicated';
  }
}

export default AddInlineValidationRefactoring;
