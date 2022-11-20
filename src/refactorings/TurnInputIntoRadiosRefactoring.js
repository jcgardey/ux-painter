import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';

class TurnInputIntoRadiosRefactoring extends UsabilityRefactoringOnElement {
  style = [
    {
      name: 'Radios',
      properties: {
        float: 'none',
        marginTop: '0px',
        marginBottom: '0px',
        marginRight: '0px',
        marginLeft: '0px',
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
    this.radios = document.createElement('div');
    this.otherInput = document.createElement('input');
    this.otherElementText = document.createElement('p');
  }

  handleChange = (event) => {
    this.getElement().value = event.target.value;
    if (event.target.type == 'radio') {
      this.otherElementText.style.display = 'none';
    }
  };

  handleOtherRadio = () => {
    this.getElement().value = '';
    this.otherInput.value = '';
    this.otherElementText.style.display = 'inline';
  };

  createRadios(radioName) {
    this.getValues().map((value, i) => {
      let radio = document.createElement('input');
      radio.type = 'radio';
      radio.style.width = 'auto';
      radio.value = value;
      radio.name = radioName;
      radio.addEventListener('click', (e) => this.handleChange(e));

      let labelStyle = this.getLabelsStyle();
      labelStyle.cursor = 'pointer';
      labelStyle.display = 'inline';

      let label = document.createElement('label');
      label.style = labelStyle;
      label.style.marginLeft = '3px';
      label.style.marginRight = '3px';
      label.textContent = value;

      let element = document.createElement('p');
      element.key = i;
      element.style = this.getItemStyle();
      element.appendChild(radio);
      element.appendChild(label);
      this.applyStyle(element, 'Radios');

      this.radios.appendChild(element);
    });
  }

  createOtherRadio(radioName) {
    let otherRadio = document.createElement('input');
    otherRadio.type = 'radio';
    otherRadio.style.width = 'auto';
    otherRadio.value = 'Other';
    otherRadio.name = radioName;
    otherRadio.addEventListener('click', (e) => this.handleOtherRadio(e));

    let otherLabelStyle = this.getLabelsStyle();
    otherLabelStyle.cursor = 'pointer';
    otherLabelStyle.display = 'inline';

    let otherLabel = document.createElement('label');
    otherLabel.style = otherLabelStyle;
    otherLabel.style.marginLeft = '3px';
    otherLabel.style.marginRight = '3px';
    otherLabel.textContent = 'Other';

    let otherElement = document.createElement('p');
    otherElement.style = this.getItemStyle();
    otherElement.appendChild(otherRadio);
    otherElement.appendChild(otherLabel);
    this.applyStyle(otherElement, 'Radios');

    return otherElement;
  }

  createTextInput() {
    let otherInputStyle = this.getOtherInputStyle();
    otherInputStyle.display = 'none';
    otherInputStyle['marginLeft'] = '5px';

    this.otherInput.type = 'text';
    this.otherInput.style = otherInputStyle;
    this.otherInput.placeholder = 'Enter new value';
    this.otherInput.addEventListener('change', (e) => this.handleChange(e));
    this.applyStyle(this.otherInput, 'Input');

    this.otherElementText.style.display = 'none';
    this.otherElementText.appendChild(this.otherInput);
  }

  transform() {
    let radioName =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    // is necesary to reset radios
    this.radios = document.createElement('div');

    this.createRadios(radioName);

    let otherRadio = this.createOtherRadio(radioName);

    this.radios.appendChild(otherRadio);

    this.getElement().parentNode.insertBefore(
      this.radios,
      this.getElement().nextElementSibling
    );

    this.createTextInput();

    this.getElement().parentNode.appendChild(this.otherElementText);

    this.getElement().setAttribute('type', 'hidden');
  }

  checkPreconditions() {
    return (
      super.checkPreconditions() &&
      this.getValues() &&
      this.getValues().length > 0
    );
  }

  unDo() {
    this.getElement().parentNode.removeChild(this.radios);
    this.getElement().parentNode.removeChild(this.otherElementText);
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
