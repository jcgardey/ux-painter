import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import 'tipr/tipr/tipr.css';
const $ = require('jquery');
window.jQuery = $;
global.jQuery = $;
require('tipr');

class AddTooltipRefactoring extends UsabilityRefactoringOnElement {

  transform() {
    this.originalElement = this.getElement().cloneNode(true);
    this.getElement().className += " tip";
    this.getElement().setAttribute("data-tip", this.tooltipName);

    $(this.getElement()).tipr();
    // const me = this;
    // this.getElement().addEventListener("mousemove", function () {
    //   me.applyStyles(me.getTooltipElement(), me.getStyle().tooltip);
    // });
  }

  checkPreconditions() {
    return super.checkPreconditions() && this.tooltipName;
  }

  unDo() {
    this.getElement().parentNode.replaceChild(this.originalElement, this.getElement());
    this.setElement(null);
  }

  setTooltipName(aTooltipName) {
    this.tooltipName = aTooltipName;
  }

  getTooltipName() {
    return this.tooltipName;
  }

  targetElements() {
    return "a, div, img, input, span, p, button";
  }

  serialize() {
    let json = super.serialize();
    json.tooltipName = this.getTooltipName();
    return json;
  }

  static asString() {
    return "Add Tooltip";
  }

  getDescription() {
    return "Add an instant tooltip to an element to make clear its purpose";
  }
}

export default AddTooltipRefactoring;