import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';
import { Datepicker } from 'vanillajs-datepicker';
import '../../node_modules/vanillajs-datepicker/dist/css/datepicker.min.css';

class AddDatePickerRefactoring extends UsabilityRefactoringOnElement {
  style = [];

  transform() {
    this.datepicker = new Datepicker(this.getElement(), {
      format: 'dd/mm/yyyy',
    });
  }

  unDo() {
    this.datepicker.destroy();
  }

  targetElements() {
    return "input[type='text']";
  }

  static asString() {
    return 'Add DatePicker';
  }

  getDescription() {
    return 'Add a calendar to choose a date in a text input';
  }
}

export default AddDatePickerRefactoring;
