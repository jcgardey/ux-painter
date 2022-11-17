import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';
import { Datepicker } from 'vanillajs-datepicker';
import '../../node_modules/vanillajs-datepicker/dist/css/datepicker.min.css';

class AddDatePickerRefactoring extends UsabilityRefactoringOnElement {
  constructor() {
    super();
    this.onFocus = this.onFocus.bind(this);
  }

  style = [
    {
      name: 'Header',
      properties: {
        color: 'black',
        backgroundColor: 'white',
      },
    },
    {
      name: 'Grid',
      properties: {
        color: 'black',
        backgroundColor: 'white',
      },
    },
    {
      name: 'Selected',
      properties: {
        color: 'white',
        backgroundColor: '#3273dc',
      },
    },
  ];

  onFocus() {
    if (document.querySelector('.datepicker-cell.selected')) {
      this.applyStyle(
        document.querySelector('.datepicker-cell.selected'),
        'Selected'
      );
    }
  }

  transform() {
    this.datepicker = new Datepicker(this.getElement(), {
      format: 'dd/mm/yyyy',
    });
    this.applyStyle(document.querySelector('.datepicker-main'), 'Grid');
    Array.from(document.querySelectorAll('.datepicker-header .button')).forEach(
      (elem) => this.applyStyle(elem, 'Header')
    );
    this.getElement().addEventListener('focus', this.onFocus);
  }

  unDo() {
    this.datepicker.destroy();
    this.getElement().removeEventListener('focus', this.onFocus);
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
