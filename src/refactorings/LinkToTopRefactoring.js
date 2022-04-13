import UsabilityRefactoring from "./UsabilityRefactoring";

class LinkToTopRefactoring extends UsabilityRefactoring {

  constructor() {
    super();
    this.onScroll = this.onScroll.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  transform() {
    this.link = document.createElement("a");
    document.body.appendChild(this.link);
    this.link.style.cssText = "display:block;position:fixed;bottom:30px;right:30px;width:35px;height:35px;cursor:pointer;background: url(https://selfrefactoring.s3.amazonaws.com/resources/refactorings/totop.png) no-repeat;display:none";
    this.link.style.opacity = 0;
    this.link.style.display = 'flex';
    window.addEventListener("scroll", this.onScroll(this.link));
    this.link.addEventListener("click", this.onClick);
  }

  checkPreconditions() {
    return true;
  }

  unDo() {
    document.body.removeChild(this.link);
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll(button) {
    window.onscroll = function() {
      if (document.documentElement.scrollTop > 0) {
        button.style.opacity = 1;
        button.style.transition = 'opacity 0.75s';
      }
      else {
        button.style.opacity = 0;
        button.style.transition = 'opacity 0.75s';
      }
    };
  }

  onClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return false;
  }

  static asString() {
    return "Link to Top";
  }

  getDescription() {
    return "Add a link for scrolling to the top of the page that only appears when scrolling down";
  }

}

export default LinkToTopRefactoring;