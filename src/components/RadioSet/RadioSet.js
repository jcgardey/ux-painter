import React from 'react';

export const RadioSet = ({ values, refactoring }) => {
  const renderRadioItem = (input, label) => {
    return refactoring.getLabelsPosition() == 'left'
      ? [label, input]
      : [input, label];
  };

  const handleChange = (event) => {
    refactoring.getElement().value = event.target.value;
    if (event.target.type == 'radio') {
      otherFreeInput.current.style.display = 'none';
    }
  };

  const handleOtherRadio = () => {
    refactoring.getElement().value = '';
    otherFreeInput.current.style.display = 'inline';
  };

  const getRandomID = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  let otherFreeInput = React.createRef();

  const radioName = getRandomID();

  let labelsStyle = refactoring.getLabelsStyle();
  labelsStyle.cursor = 'pointer';
  labelsStyle.display = 'inline';

  const radios = values.map((value, i) => {
    let input = (
      <input
        type={'radio'}
        style={{ width: 'auto' }}
        value={value}
        name={radioName}
        onChange={(e) => handleChange(e)}
      />
    );
    let label = <label style={labelsStyle}>{value}</label>;
    // if (!refactoring.getItemStyle().margin) {
    //   refactoring.getItemStyle().margin = '5px';
    // }
    return (
      <p key={i} style={refactoring.getItemStyle()}>
        {renderRadioItem(input, label)}
      </p>
    );
  });

  const otherInput = (
    <input
      type={'radio'}
      style={{ width: 'auto' }}
      value={'Other'}
      name={radioName}
      onChange={(e) => handleOtherRadio(e)}
    />
  );
  const otherLabel = <label>Other</label>;

  let otherInputStyle = refactoring.getOtherInputStyle();
  otherInputStyle.display = 'none';
  otherInputStyle['marginLeft'] = '5px';

  return (
    <div className={'uxpainter-radio-set'}>
      {radios}
      <p>
        {renderRadioItem(otherInput, otherLabel)}
        <input
          type={'text'}
          style={otherInputStyle}
          placeholder={'Enter new value'}
          onChange={(e) => handleChange(e)}
          ref={otherFreeInput}
        />
      </p>
    </div>
  );
};
