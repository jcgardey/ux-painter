import React, { useState } from 'react';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';
import { FormField, Input } from '../Form/Form';

export const ResizeInput = ({ refactoringApplication }) => {
  const refactoring = refactoringApplication.refactoring;
  const [inputWidth, setInputWidth] = useState(
    refactoring.getInputWidth() || ''
  );

  const onChange = (event) => {
    setInputWidth(event.target.value);
    refactoring.setInputWidth(event.target.value);
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
          value={inputWidth}
        />
      </FormField>
    </RefactoringApplicationSteps>
  );
};
