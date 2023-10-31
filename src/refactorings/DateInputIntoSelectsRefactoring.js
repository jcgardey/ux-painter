import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';

class DateInputIntoSelectsRefactoring extends UsabilityRefactoringOnElement {
  style = [
    {
      name: 'Selects',
      properties: {
        float: 'none',
        color: 'black',
        backgroundColor: 'white',
        border: '1px solid grey',
        borderRadius: '5px',
      },
    },
  ];

  setFormat(format) {
    this.format = format;
  }

  getFormat() {
    return this.format;
  }

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

  setValue(dateInput) {
    const me = this;

    if (me.getFormat() == '1') {
      dateInput.value = `${me.day(me.actualDate)}/${me.month(
        me.actualDate
      )}/${me.actualDate.getFullYear()}`;
    } else {
      if (me.getFormat() == '2') {
        dateInput.value = `${me.month(me.actualDate)}/${me.day(
          me.actualDate
        )}/${me.actualDate.getFullYear()}`;
      } else {
        if (me.getFormat() == '3') {
          dateInput.value = `${me.actualDate.getFullYear()}/${me.month(
            me.actualDate
          )}/${me.day(me.actualDate)}`;
        } else {
          if (me.getFormat() == '4') {
            dateInput.value = `${me.day(me.actualDate)}-${me.month(
              me.actualDate
            )}-${me.actualDate.getFullYear()}`;
          } else {
            if (me.getFormat() == '5') {
              dateInput.value = `${me.month(me.actualDate)}-${me.day(
                me.actualDate
              )}-${me.actualDate.getFullYear()}`;
            } else {
              if (me.getFormat() == '6') {
                dateInput.value = `${me.actualDate.getFullYear()}-${me.month(
                  me.actualDate
                )}-${me.day(me.actualDate)}`;
              }
            }
          }
        }
      }
    }
  }

  transform() {
    let dateInput = this.getElement();
    dateInput.style.display = 'none';

    const me = this;

    this.actualDate = new Date(`January 1 ${new Date().getFullYear()}`);

    this.selectYear = document.createElement('select');
    this.selectYear.id = 'select_year';
    this.selectYear.style.marginBottom = '5px';
    this.selectYear.style.marginRight = '5px';
    this.applyStyle(this.selectYear, 'Selects');

    for (let i = new Date().getFullYear(); i >= 1970; i--) {
      this.createOption(i, this.selectYear);
    }

    this.selectYear.addEventListener('change', function () {
      me.actualDate = new Date(
        `${me.actualDate.getMonth() + 1} ${me.actualDate.getDate()} ${
          me.selectYear.value
        }`
      );
      me.setValue(dateInput);
    });

    dateInput.parentNode.insertBefore(this.selectYear, dateInput.nextSibling);

    this.selectMonth = document.createElement('select');
    this.selectMonth.id = 'select_month';
    this.selectMonth.style.marginBottom = '5px';
    this.selectMonth.style.marginRight = '5px';
    this.applyStyle(this.selectMonth, 'Selects');

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
      me.setValue(dateInput);
    });

    dateInput.parentNode.insertBefore(this.selectMonth, dateInput.nextSibling);

    this.selectDay = document.createElement('select');
    this.selectDay.id = 'select_day';
    this.selectDay.style.marginBottom = '5px';
    this.selectDay.style.marginRight = '5px';
    this.applyStyle(this.selectDay, 'Selects');

    for (let i = 1; i <= 31; i++) {
      this.createOption(i, this.selectDay);
    }

    this.selectDay.addEventListener('change', function () {
      me.actualDate = new Date(
        `${me.actualDate.getMonth() + 1} ${
          me.selectDay.value
        } ${me.actualDate.getFullYear()}`
      );
      me.setValue(dateInput);
    });

    dateInput.parentNode.insertBefore(this.selectDay, dateInput.nextSibling);
  }

  unDo() {
    let dateInput = this.getElement();
    dateInput.style.display = 'block';
    let element = document.getElementById('select_year');
    element.remove();
    element = document.getElementById('select_month');
    element.remove();
    element = document.getElementById('select_day');
    element.remove();
  }

  targetElements() {
    return "input[type='date'],input[type='text']";
  }

  getSelects() {
    return this.getElement().parentNode.querySelectorAll('select');
  }

  static asString() {
    return 'Date Input into Selects';
  }

  getDescription() {
    return 'Turn simple text field for dates into 3 selects for Day - Month - Year';
  }

  isApplicable() {
    return super.isApplicable() && this.getElement().style.display !== 'none';
  }
}

export default DateInputIntoSelectsRefactoring;
