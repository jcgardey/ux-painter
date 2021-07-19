import $ from 'jquery';
import 'jquery-dropdown-datepicker/dist/jquery-dropdown-datepicker';
import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';
import DateInputIntoSelectsPreviewer from "../previewers/DateInputIntoSelectsPreviewer";

class DateInputIntoSelectsRefactoring extends UsabilityRefactoringOnElement {

    transform = function () {
        var dateInput = $(this.getElement());
        if (typeof(dateInput[0]) != "undefined") {
            this.submitFieldName = dateInput.attr("name");
            dateInput.attr("name", "");
            dateInput.dropdownDatepicker({...{
                submitFieldName: this.submitFieldName,
                daySuffixes: false,
                monthSuffixes: false
            }, ...this.getLanguageOptions()["es"]});
            this.applyStyles(this.getSelects(), this.getStyle().selectElement);
        }
    }

    unDo() {
        $(this.getElement()).dropdownDatepicker('destroy');
        this.getElement().setAttribute("type", "text");
        this.getElement().setAttribute("name", this.submitFieldName);
    }

    targetElements() {
        return "input[type='text']";
    }

    getSelects() {
        return this.getElement().parentNode.querySelectorAll("select");
    }

    getLanguageOptions() {
        return {
            es: {
                dayLabel: "Día",
                monthLabel: "Mes",
                yearLabel: "Año",
                monthLongValues: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                monthShortValues: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                initialDayMonthYearValues: ['Día', 'Mes', 'Año']
            },
            en: {
                dayLabel: "Day",
                monthLabel: "Month",
                yearLabel: "Year",
                monthLongValues: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                monthShortValues: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                initialDayMonthYearValues: ['Day', 'Month', 'Year']
            }
        }
    }

    static asString() {
        return "Date Input into Selects";
    }

    static getPreviewer() {
        return new DateInputIntoSelectsPreviewer();
    }

    static getClassName() {
        return "DateInputIntoSelectsRefactoring";
    }

    getDescription() {
        return "Turn simple text field for dates into 3 selects for Day - Month - Year";
    }

    codeAvaiable() {
        return false
    }
}

export default DateInputIntoSelectsRefactoring;




