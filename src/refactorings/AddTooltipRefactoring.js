import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';

class AddTooltipRefactoring extends UsabilityRefactoringOnElement {
  style = [
    {
      name: 'Mouse enter',
      properties: {
        color: 'black',
        backgroundColor: 'white',
        display: 'block',
      },
    },
    {
      name: 'Mouse leave',
      properties: {
        display: 'none',
      },
    },
  ];

  transform() {
    this.originalElement = this.getElement().cloneNode(true);
    this.getElement().className += ' tip';
    this.getElement().setAttribute('data-tip', this.tooltipName);

    let tooltip = document.createElement('span');
    tooltip.style.paddingTop = '10px';
    tooltip.style.paddingBottom = '10px';
    tooltip.style.paddingRight = '17px';
    tooltip.style.paddingLeft = '17px';
    tooltip.style.background = 'white';
    tooltip.style.backgroundClip = 'paddingBox';
    tooltip.innerHTML = this.tooltipName;

    let container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.zIndex = 9999;
    container.style.display = 'none';

    container.appendChild(tooltip);

    let container2 = document.createElement('div');
    container2.style.display = 'flex';
    container2.style.justifyContent = 'center';

    container2.appendChild(container);

    this.getElement().appendChild(container2);

    this.getElement().addEventListener('mouseenter', (e) => {
      this.applyStyle(container, 'Mouse enter');
    });
    this.getElement().addEventListener('mouseleave', (e) => {
      this.applyStyle(container, 'Mouse leave');
    });
  }

  checkPreconditions() {
    return super.checkPreconditions() && this.tooltipName;
  }

  unDo() {
    this.getElement().parentNode.replaceChild(
      this.originalElement,
      this.getElement()
    );
    this.setElement(null);
  }

  setTooltipName(aTooltipName) {
    this.tooltipName = aTooltipName;
  }

  getTooltipName() {
    return this.tooltipName;
  }

  targetElements() {
    return 'a, div, img, input, span, p, button';
  }

  serialize() {
    let json = super.serialize();
    json.tooltipName = this.getTooltipName();
    return json;
  }

  static asString() {
    return 'Add Tooltip';
  }

  getDescription() {
    return 'Add an instant tooltip to an element to make clear its purpose';
  }
}

export default AddTooltipRefactoring;
