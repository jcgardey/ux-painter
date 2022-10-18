import React, { useState } from 'react';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';
import { FormField } from '../Form/Form';

export const DateInputIntoSelects = ({ refactoringApplication }) => {
  const refactoring = refactoringApplication.refactoring;
  const [format, setFormat] = useState(refactoring.getFormat() || '');

  const onClick = (event) => {
    setFormat(event.target.id);
    refactoring.setFormat(event.target.id);
  };

  return (
    <RefactoringApplicationSteps
      refactoringApplication={refactoringApplication}
    >
      <FormField>
        <input id="1" type={'radio'} name={'format'} onClick={onClick}></input>
        <label>DD/MM/YYYY</label>

        <br></br>
        <br></br>

        <input id="2" type={'radio'} name={'format'} onClick={onClick}></input>
        <label>MM/DD/YYYY</label>

        <br></br>
        <br></br>

        <input id="3" type={'radio'} name={'format'} onClick={onClick}></input>
        <label>YYYY/MM/DD</label>

        <br></br>
        <br></br>

        <input id="4" type={'radio'} name={'format'} onClick={onClick}></input>
        <label>DD-MM-YYYY</label>

        <br></br>
        <br></br>

        <input id="5" type={'radio'} name={'format'} onClick={onClick}></input>
        <label>MM-DD-YYYY</label>

        <br></br>
        <br></br>

        <input id="6" type={'radio'} name={'format'} onClick={onClick}></input>
        <label>YYYY-MM-DD</label>
      </FormField>
    </RefactoringApplicationSteps>
  );
};
