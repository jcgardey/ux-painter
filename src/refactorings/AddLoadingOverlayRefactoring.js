import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';

class AddLoadingOverlayRefactoring extends UsabilityRefactoringOnElement {
  // this is necessary
  style = [];

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    document.querySelector('#overlay').style.display = '';
    this.getElement().click();
    setTimeout(function () {
      document.querySelector('#overlay').style.display = 'none';
    }, 3000);
  }

  unDo() {
    if (this.button && this.submit) {
      this.button.parentNode?.removeChild(this.button);
      this.submit.style.display = '';
    }
  }

  transform() {
    let overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.textContent = 'Loading...';
    overlay.style.cssText =
      'font-size:2em;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5;z-index:9998;padding:100px 50%';
    overlay.style.display = 'none';
    document.body.appendChild(overlay);

    this.submit = this.getElement();

    this.button = this.submit.cloneNode(true);
    this.button.setAttribute('type', 'button');
    this.button.addEventListener('click', this.onClick);
    this.submit.style.display = 'none';
    this.submit.parentNode.insertBefore(
      this.button,
      this.submit.nextElementSibling
    );
  }

  targetElements() {
    return "input[type='submit'],button";
  }

  isApplicable() {
    console.log(this.getElement());
    return super.isApplicable() && this.getElement().style.display !== 'none';
  }

  static asString() {
    return 'Add Loading Overlay';
  }

  getDescription() {
    return 'Add a loading overlay when click a button';
  }
}

export default AddLoadingOverlayRefactoring;
