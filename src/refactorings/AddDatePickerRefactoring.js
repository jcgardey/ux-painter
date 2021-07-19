import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import $ from 'jquery';
import datepickerFactory from 'jquery-datepicker';
import 'jquery-ui-bundle/jquery-ui.css';
import ColorPreviewer from "../previewers/ColorPreviewer";

datepickerFactory($);

class AddDatePickerRefactoring extends UsabilityRefactoringOnElement {


    transform () {
        $(this.getElement()).datepicker({
            dateFormat: "d/m/y"});
        const me = this;
        //TODO the style is removed when the user change the month
        this.getElement().addEventListener("focus", function () {
            me.applyStyles(me.getDatePickerTitle(), me.getStyle().title);
            me.applyStyles(me.getSelectableElements(), me.getStyle().selectableElements);
            me.applyStyles(me.getDatePickerTable(), me.getStyle().table);
            me.applyStyles(me.getHeaderElements(), me.getStyle().header);
        });
    }
    
    unDo() {
        $(this.getElement()).datepicker( "hide" );
        $(this.getElement()).datepicker("destroy");
    }

    targetElements () {
        return "input[type='text']";
    }

    static asString() {
        return "Add DatePicker";
    }

    static getPreviewer() {
        return new ColorPreviewer();
    }

    static getClassName() {
        return "AddDatePickerRefactoring";
    }

    getDatePickerTitle() {
        return document.querySelectorAll(".ui-datepicker-header");
    }

    getHeaderElements() {
        return document.querySelectorAll("table.ui-datepicker-calendar > thead > tr > th");
    }

    getSelectableElements() {
        return document.querySelectorAll("table.ui-datepicker-calendar > tbody > tr > td > a");
    }

    getDatePickerTable() {
        return document.querySelectorAll("table.ui-datepicker-calendar");
    }

    getStyledElementsQty () {
        return 3;
    }

    assignStyle (styles) {
        //const headerStyle = this.getStyleScrapper().getRandomStyle(this.getElement());
        this.getStyle()["title"] = styles[0];

        // selectable elements style
        //const selectableElementStyle = this.getStyleScrapper().getRandomStyle(this.getElement());
        this.getStyle()["selectableElements"] = styles[1];

        // table style
        this.getStyle()["table"] = {"background-color": styles[2]["background-color"]};

        this.getStyle()["header"] = {"color": styles[2].color};
    }

    getStylesFromExistingElement() {
        let existingStyle = [];
        let containerStyle = document.querySelector(".datepicker");
        let dayElementStyle = document.querySelectorAll(".day, .selectDay");
        if (containerStyle && dayElementStyle) {
            existingStyle.push({"color": containerStyle.style.color, "backgroundColor": containerStyle.style.backgroundColor});
            existingStyle.push({"color": dayElementStyle.style.color, "backgroundColor": dayElementStyle.style.backgroundColor});
        }
        return existingStyle;

    }

    getDescription() {
        return "Add a calendar to choose a date in a text input";
    }

    codeAvaiable() {
        return false
    }
}

export default AddDatePickerRefactoring;