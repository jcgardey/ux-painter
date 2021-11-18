import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';

class AddAutocompleteRefactoring extends UsabilityRefactoringOnElement {
  style = [
    {
      name: 'List Container',
      properties: {
        padding: '0.4em',
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

  constructor() {
    super();
    this.showSuggestedValues = this.showSuggestedValues.bind(this);
    this.values = [];
  }

  hasSelectInputTarget() {
    return false;
  }

  setAutocompleteInput() {
    this.autocompleteInput = this.getElement();
  }

  createListContainer() {
    let container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.zIndex = 9999;
    container.style.width = window
      .getComputedStyle(this.getElement())
      .getPropertyValue('width');
    container.style.display = 'none';
    this.applyStyle(container, 'List Container');
    return container;
  }

  createListItem(itemName) {
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
      this.container.style.display = 'none';
    });
    return itemContainer;
  }

  transform() {
    this.container = this.createListContainer();
    this.getElement().nextElementSibling !== null
      ? this.getElement().parentNode.insertBefore(
          this.getElement().nextElementSibling,
          this.container
        )
      : this.getElement().parentNode.appendChild(this.container);

    this.getElement().addEventListener('keyup', this.showSuggestedValues);
  }

  showSuggestedValues(event) {
    this.container.innerHTML = '';
    const matchingValues = this.values
      .filter((value) => value.includes(event.target.value))
      .map((value) => this.createListItem(value));
    if (matchingValues.length > 0 && event.target.value !== '') {
      matchingValues.forEach((item) => this.container.appendChild(item));
      this.container.style.display = 'block';
    } else {
      this.container.style.display = 'none';
    }
  }

  isApplicable() {
    return super.isApplicable() && this.values && this.values.length > 0;
  }

  unDo() {
    this.getElement().removeEventListener('keyup', this.showSuggestedValues);
    this.getElement().parentNode.removeChild(this.container);
  }

  setValues(aList) {
    this.values = aList;
  }

  getValues() {
    return this.values;
  }

  static asString() {
    return 'Add Autocomplete';
  }

  targetElements() {
    return "input[type='text']";
  }

  clone() {
    let clonedRefactoring = super.clone();
    clonedRefactoring.setValues(this.getValues());
    return clonedRefactoring;
  }

  serialize() {
    let json = super.serialize();
    json.values = this.getValues();
    return json;
  }

  getDescription() {
    return 'Possible values to an input are suggested automatically when users complete it';
  }
}

export default AddAutocompleteRefactoring;
