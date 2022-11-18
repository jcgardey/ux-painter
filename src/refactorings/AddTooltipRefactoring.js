import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';

class AddTooltipRefactoring extends UsabilityRefactoringOnElement {
  style = [
    {
      name: 'Tooltip',
      properties: {
        color: 'black',
        backgroundColor: 'white',
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingRight: '17px',
        paddingLeft: '17px',
      },
    },
  ];

  transform() {
    this.originalElement = this.getElement().cloneNode(true);
    this.getElement().className += ' tip';
    this.getElement().setAttribute('data-tip', this.tooltipName);

    let tooltip = document.createElement('span');
    tooltip.backgroundClip = 'paddingBox';
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
      container.style.display = 'block';
      this.applyStyle(tooltip, 'Tooltip');
    });
    this.getElement().addEventListener('mouseleave', (e) => {
      container.style.display = 'none';
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
