import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';

class TurnSelectIntoAutocompleteRefactoring extends UsabilityRefactoringOnElement {
  constructor() {
    super();
  }

  style = [
    {
      name: 'Text Input',
      properties: {},
    },
    {
      name: 'List Container',
      properties: {
        padding: '5px',
        border: '1px solid grey',
        borderRadius: '5px',
        backgroundColor: 'white',
      },
    },
    {
      name: 'List Item',
      properties: {
        margin: '0.5em 0.2em',
        padding: '0.2em 0.6em',
      },
    },
    {
      name: 'List Item Hovered',
      properties: {
        cursor: 'pointer',
        color: 'white',
        backgroundColor: 'black',
      },
    },
  ];

  createListContainer() {
    let container = document.createElement('div');
    container.style.position = 'relative';
    return container;
  }

  showSuggestedValues(input, container, textInput) {
    this.values = Array.from(this.getElement().options).map((option) => {
      return { label: option.label, value: option.value };
    });

    container.innerHTML = '';
    let suggested_values = document.createElement('div');
    const matchingValues = this.values
      .filter((value) => value.label.includes(input))
      .map((value) => this.createListItem(value, textInput, container));
    if (matchingValues.length > 0 && input !== '') {
      matchingValues.forEach((item) => suggested_values.appendChild(item));
      container.appendChild(suggested_values);
      container.style.display = 'block';
    }
  }

  createListItem(itemName, textInput, container) {
    let itemContainer = document.createElement('div');
    itemContainer.width = '100%';
    let item = document.createElement('span');
    item.textContent = itemName.label;
    item.setAttribute('data-value', itemName.value);
    itemContainer.appendChild(item);

    this.applyStyle(itemContainer, 'List Item');
    itemContainer.addEventListener('mouseenter', () => {
      this.applyStyle(itemContainer, 'List Item Hovered');
    });
    itemContainer.addEventListener('mouseleave', () => {
      this.removeStyle(itemContainer, 'List Item Hovered');
    });

    itemContainer.addEventListener('click', (e) => {
      this.getElement().value = e.currentTarget
        .querySelector('span')
        .getAttribute('data-value');
      textInput.value = e.currentTarget.querySelector('span').textContent;
      container.style.display = 'none';
      console.log(this.getElement().value);
      console.log(this.getElement());
    });
    return itemContainer;
  }

  /*
  setElement(anElement) {
    this.targetElement = anElement;
    this.values = Array.from(this.targetElement.options).map((option) => {
      return option.label;
    });
  }*/

  transform() {
    this.getElement().style.display = 'none';

    let textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.style.border = 0;
    this.applyStyle(textInput, 'Text Input');

    this.container = this.createListContainer();
    let container_of_suggested_values = document.createElement('div');
    container_of_suggested_values.style.display = 'none';
    this.applyStyle(container_of_suggested_values, 'List Container');

    textInput.addEventListener('keyup', (e) => {
      this.getElement().value = e.currentTarget.value;
      this.showSuggestedValues(
        e.currentTarget.value,
        container_of_suggested_values,
        textInput
      );
    });

    this.container.appendChild(textInput);
    this.container.appendChild(container_of_suggested_values);

    this.getElement().parentNode.insertBefore(
      this.container,
      this.getElement()
    );
  }

  unDo() {
    this.getElement().style.display = '';
    this.getElement().parentNode.removeChild(this.container);
  }

  targetElements() {
    return 'select';
  }

  getDescription() {
    return 'Select field is turned into a text field in which the select options are suggested as the user types';
  }

  isApplicable() {
    return super.isApplicable() && this.getElement().style.display !== 'none';
  }

  static asString() {
    return 'Turn Select into Autocomplete';
  }
}

export default TurnSelectIntoAutocompleteRefactoring;
