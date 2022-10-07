import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';

class DateInputIntoSelectsRefactoring extends UsabilityRefactoringOnElement {
  transform2 = function () {
    var dateInput = $(this.getElement());
    if (typeof dateInput[0] != 'undefined') {
      this.submitFieldName = dateInput.attr('name');
      dateInput.attr('name', '');
      dateInput.dropdownDatepicker({
        ...{
          submitFieldName: this.submitFieldName,
          daySuffixes: false,
          monthSuffixes: false,
        },
        ...this.getLanguageOptions()['es'],
      });
      this.applyStyles(this.getSelects(), this.getStyle().selectElement);
    }
  };

  day(date) {
    let day = date.getDate();
    if (day.toString().length === 1) {
      day = '0' + day;
    }
    return day;
  }

  month(date) {
    let month = date.getMonth() + 1;
    if (month.toString().length === 1) {
      month = '0' + month;
    }
    return month;
  }

  createOption(value, select) {
    let optionElement = document.createElement('option');
    optionElement.textContent = value;
    select.appendChild(optionElement);
  }

  transform() {
    let dateInput = this.getElement();
    dateInput.style.display = 'none';
    console.log(dateInput);
    console.log('ANTES: ', dateInput.value);

    const me = this;

    this.actualDate = new Date(`January 1 ${new Date().getFullYear()}`);

    this.selectYear = document.createElement('select');

    for (let i = new Date().getFullYear(); i >= 1970; i--) {
      this.createOption(i, this.selectYear);
    }

    this.selectYear.addEventListener('change', function () {
      me.actualDate = new Date(
        `${me.actualDate.getMonth() + 1} ${me.actualDate.getDate()} ${
          me.selectYear.value
        }`
      );
      dateInput.value = `${me.actualDate.getFullYear()}-${me.month(
        me.actualDate
      )}-${me.day(me.actualDate)}`;
      // dateInput.value = new Date('09/25/2022');
      // dateInput.value = `${me.actualDate.getDate()}/${me.actualDate.getMonth()}/${me.actualDate.getFullYear()}`;
    });

    dateInput.parentNode.insertBefore(this.selectYear, dateInput.nextSibling);

    this.selectMonth = document.createElement('select');

    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    for (let i = 0; i <= 11; i++) {
      this.createOption(months[i], this.selectMonth);
    }

    this.selectMonth.addEventListener('change', function () {
      me.actualDate = new Date(
        `${
          me.selectMonth.value
        } ${me.actualDate.getDate()} ${me.actualDate.getFullYear()}`
      );
      dateInput.value = `${me.actualDate.getFullYear()}-${me.month(
        me.actualDate
      )}-${me.day(me.actualDate)}`;
      // dateInput.value = new Date(dateInput.value);
      dateInput.value = `${me.actualDate.getDate()}/${
        me.actualDate.getMonth() + 1
      }/${me.actualDate.getFullYear()}`;
      // dateInput.value = '30/10/2022';
      // dateInput.value = new Date();
    });

    dateInput.parentNode.insertBefore(this.selectMonth, dateInput.nextSibling);

    this.selectDay = document.createElement('select');

    for (let i = 1; i <= 31; i++) {
      this.createOption(i, this.selectDay);
    }

    this.selectDay.addEventListener('change', function () {
      me.actualDate = new Date(
        `${me.actualDate.getMonth() + 1} ${
          me.selectDay.value
        } ${me.actualDate.getFullYear()}`
      );
      dateInput.value = `${me.actualDate.getFullYear()}-${me.month(
        me.actualDate
      )}-${me.day(me.actualDate)}`;
      // dateInput.value = new Date(dateInput.value);
      // dateInput.value = `${me.actualDate.getDate()}/${me.actualDate.getMonth()}/${me.actualDate.getFullYear()}`;
    });

    dateInput.parentNode.insertBefore(this.selectDay, dateInput.nextSibling);
  }

  unDo() {
    $(this.getElement()).dropdownDatepicker('destroy');
    this.getElement().setAttribute('type', 'text');
    this.getElement().setAttribute('name', this.submitFieldName);
  }

  targetElements() {
    return "input[type='date'],input[type='text']";
  }

  getSelects() {
    return this.getElement().parentNode.querySelectorAll('select');
  }

  getLanguageOptions() {
    return {
      es: {
        dayLabel: 'Día',
        monthLabel: 'Mes',
        yearLabel: 'Año',
        monthLongValues: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        monthShortValues: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic',
        ],
        initialDayMonthYearValues: ['Día', 'Mes', 'Año'],
      },
      en: {
        dayLabel: 'Day',
        monthLabel: 'Month',
        yearLabel: 'Year',
        monthLongValues: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        monthShortValues: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        initialDayMonthYearValues: ['Day', 'Month', 'Year'],
      },
    };
  }

  static asString() {
    return 'Date Input into Selects';
  }

  getDescription() {
    return 'Turn simple text field for dates into 3 selects for Day - Month - Year';
  }
}

export default DateInputIntoSelectsRefactoring;
