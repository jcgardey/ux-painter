import React, { useState } from 'react';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';
import { FormField, Input } from '../Form/Form';

export const FormatInput = ({ refactoringApplication }) => {
  const refactoring = refactoringApplication.refactoring;
  const [formatString, setFormatString] = useState(
    refactoring.getFormatString() || ''
  );

  const onChange = (event) => {
    setFormatString(event.target.value);
    refactoring.setFormatString(event.target.value);
  };

  return (
    <RefactoringApplicationSteps
      refactoringApplication={refactoringApplication}
    >
      <FormField>
        <Input
          type={'text'}
          placeholder={''}
          onChange={onChange}
          value={formatString}
        />
      </FormField>
      <div className={'form-group'}>
        <ul>
          <li>0: allows a number</li>
          <li>S: allows a letter</li>
          <li>A: allows a number or a letter</li>
        </ul>
        <p>E.g 00/00/0000 for a date DD/MM/YYYY</p>
      </div>
    </RefactoringApplicationSteps>
  );
};
