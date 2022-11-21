import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';

class TurnInputIntoSelectRefactoring extends UsabilityRefactoringOnElement {
  style = [
    {
      name: 'Select',
      properties: {
        float: 'none',
        width: 'none',
        color: 'black',
        backgroundColor: 'white',
        textAlign: 'left',
      },
    },
    {
      name: 'Input',
      properties: {
        float: 'none',
        width: 'none',
        color: 'black',
        backgroundColor: 'white',
        textAlign: 'left',
        marginTop: '0px',
        marginBottom: '0px',
        marginRight: '0px',
        marginLeft: '0px',
      },
    },
  ];

  constructor() {
    super();
    this.values = [];
  }

  createOption(value) {
    let optionElement = document.createElement('option');
    optionElement.textContent = value;
    this.selectElement.appendChild(optionElement);
  }

  applyStyle() {
    let selectStyle = {
      border: '',
      borderRadius: '25px 0px 0px 25px',
      height: '47.5px',
      margin: '0px 0px 5px 0px',
      padding: '10px 10px 10px 25px',
      width: '400px',
    };
    this.applyStyles([this.selectElement], selectStyle);
    super.applyStyle(this.selectElement, 'Select');

    this.applyStyles([this.otherElement], this.getStyle().otherInput);
  }

  transform() {
    let anElement = this.getElement();
    if (typeof anElement === 'undefined') {
      return;
    }
    anElement.setAttribute('type', 'hidden');
    this.otherElement = document.createElement('input');
    this.otherElement.setAttribute('type', 'text');
    this.otherElement.setAttribute('placeholder', 'Enter new value');
    this.otherElement.style.display = 'none';
    super.applyStyle(this.otherElement, 'Input');

    this.selectElement = document.createElement('select');

    for (let i = 0; i < this.values.length; i++) {
      this.createOption(this.values[i]);
    }
    this.createOption('Other');

    anElement.parentNode.insertBefore(this.otherElement, anElement.nextSibling);
    anElement.parentNode.insertBefore(
      this.selectElement,
      anElement.nextSibling
    );

    const me = this;

    // without this line, if you didn't choose any option, the search button doesn't work with the pre-selected option (the first)
    anElement.value = me.selectElement.value;

    this.selectElement.addEventListener('change', function () {
      if (me.selectElement.value == 'Other') {
        me.otherElement.value = '';
        me.otherElement.style.display = 'inline';
        anElement.value = '';
      } else {
        me.otherElement.style.display = 'none';
        anElement.value = me.selectElement.value;
      }
    });
    me.otherElement.addEventListener('keyup', function () {
      anElement.value = me.otherElement.value;
    });

    this.applyStyle();
  }

  checkPreconditions() {
    return (
      super.checkPreconditions() &&
      this.getValues() &&
      this.getValues().length > 0
    );
  }

  unDo() {
    this.getElement().parentNode.removeChild(this.selectElement);
    this.getElement().parentNode.removeChild(this.otherElement);
    this.getElement().setAttribute('type', 'text');
  }

  setValues(valuesList) {
    this.values = valuesList;
  }

  getValues() {
    return this.values;
  }

  targetElements() {
    return "input[type='text']";
  }

  serialize() {
    let json = super.serialize();
    json.values = this.getValues();
    return json;
  }

  static asString() {
    return 'Turn Input into Select';
  }

  getDescription() {
    return "Turn a regular text field into a select box with predefined values. 'Other' option is included to enter a different value";
  }
}

export default TurnInputIntoSelectRefactoring;
