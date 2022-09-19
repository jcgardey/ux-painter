import AddAutocompleteRefactoring from './AddAutocompleteRefactoring';

class TurnSelectIntoAutocompleteRefactoring extends AddAutocompleteRefactoring {
  constructor() {
    super();
  }

  style = [
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
        backgroundColor: 'black',
        color: 'white',
      },
    },
  ];

  createListContainer() {
    let container = document.createElement('div');
    container.style.position = 'relative';
    container.style.zIndex = 9999;
    container.style.width = '400px';
    container.style.display = 'block';
    this.applyStyle(container, 'List Container');
    return container;
  }

  showSuggestedValues(input, container, textInput) {
    container.innerHTML = '';
    let suggested_values = document.createElement('div');
    const matchingValues = this.values
      .filter((value) => value.includes(input))
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
    item.textContent = itemName;
    itemContainer.appendChild(item);

    this.applyStyle(itemContainer, 'List Item');
    itemContainer.addEventListener('mouseenter', (e) => {
      this.applyStyle(itemContainer, 'List Item Hovered');
    });
    itemContainer.addEventListener('mouseleave', (e) => {
      this.removeStyle(itemContainer, 'List Item Hovered');
    });

    itemContainer.addEventListener('click', (e) => {
      this.getElement().value =
        e.currentTarget.querySelector('span').textContent;
      textInput.value = e.currentTarget.querySelector('span').textContent;
      container.style.display = 'none';
    });
    return itemContainer;
  }

  setElement(anElement) {
    this.targetElement = anElement;
    this.values = Array.from(this.targetElement.options).map((option) => {
      return option.label;
    });
  }

  transform() {
    this.getElement().style.display = 'none';

    let textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.style.border = 0;
    textInput.style.width = '385px';

    let container = this.createListContainer();
    let container_of_suggested_values = document.createElement('div');

    textInput.addEventListener('keyup', (e) => {
      this.getElement().value = e.currentTarget.value;
      this.showSuggestedValues(
        e.currentTarget.value,
        container_of_suggested_values,
        textInput
      );
    });

    container.appendChild(textInput);
    container.appendChild(container_of_suggested_values);

    this.getElement().parentNode.insertBefore(container, this.getElement());
  }

  unDo() {
    super.unDo();
    this.getElement().style.display = '';
    this.autocompleteInput.parentNode.removeChild(this.autocompleteInput);
  }

  targetElements() {
    return 'select';
  }

  getDescription() {
    return 'Select field is turned into a text field in which the select options are suggested as the user types';
  }

  static asString() {
    return 'Turn Select into Autocomplete';
  }
}

export default TurnSelectIntoAutocompleteRefactoring;
