import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import TurnAttributeIntoLinkView from "../components/TurnAttributeIntoLinkView";
import TurnAttributeIntoLinkPreviewer from "../previewers/TurnAttributeIntoLinkPreviewer";
import TurnAttributeIntoLinkSelection from "../components/TurnAttributeIntoLinkSelection";

class TurnAttributeIntoLinkRefactoring extends UsabilityRefactoringOnElement {

    checkPreconditions() {
        return super.checkPreconditions() && this.getTargetURL();
    }

    transform() {
        this.linkElement = document.createElement("a");
        this.linkElement.href = this.getTargetURL();
        if (this.isTargetAnImage()) {
            this.getElement().parentNode.replaceChild(this.linkElement, this.getElement());
            this.linkElement.appendChild(this.getElement());
        }
        else {
            this.linkElement.innerHTML = this.getElement().innerHTML;
            this.getElement().innerHTML = "";
            this.getElement().appendChild(this.linkElement);
        }
        this.applyStyles([this.linkElement], this.getStyle().targetElement);
    }

    unDo() {
        if (this.isTargetAnImage()) {
            this.linkElement.parentNode.replaceChild(this.getElement(), this.linkElement);
        }
        else {
            this.getElement().removeChild(this.linkElement);
            this.getElement().innerHTML = this.linkElement.innerHTML;
        }
    }

    getTargetURL() {
        return this.targetURL;
    }

    setTargetURL(aUrl) {
        this.targetURL = aUrl;
    }

    targetElements() {
        return "p, span, h1, h2, h3, h4, h5, h6, img, li";
    }

    getView() {
        return TurnAttributeIntoLinkView;
    }

    clone(aContext) {
        let refactoring = super.clone(aContext);
        refactoring.setTargetURL(this.getTargetURL());
        return refactoring;
    }

    serialize() {
        let json = super.serialize();
        json.targetURL = this.getTargetURL();
        return json;
    }

    static asString() {
        return "Turn Attribute into Link";
    }

    static getPreviewer() {
        return new TurnAttributeIntoLinkPreviewer();
    }

    static getClassName() {
        return "TurnAttributeIntoLinkRefactoring";
    }

    getDescription() {
        return "Provide navigation features to a static content that users intend to click";
    }

    getSelectionView() {
        return TurnAttributeIntoLinkSelection;
    }

    getDemoResources() {
        return ["TurnAttributeIntoLinkBefore.gif", "TurnAttributeIntoLinkAfter.gif"];
    }

    codeAvaiable() {
        return false
    }
}

export default TurnAttributeIntoLinkRefactoring;