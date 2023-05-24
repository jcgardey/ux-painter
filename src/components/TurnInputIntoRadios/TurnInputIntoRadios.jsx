import React, { useState } from 'react';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';
import { FormField, Input } from '../Form/Form';

export const TurnInputIntoRadios = ({ refactoringApplication }) => {
  const refactoring = refactoringApplication.refactoring;
  const [values, setValues] = useState(refactoring.getValues().join(','));

  const onChange = (event) => {
    setValues(event.target.value);
    refactoring.setValues(event.target.value.split(','));
  };

  return (
    <RefactoringApplicationSteps
      refactoringApplication={refactoringApplication}
    >
      <FormField>
        <Input
          type={'text'}
          placeholder={'apple,orange,banana'}
          onChange={onChange}
          value={values}
        />
      </FormField>
    </RefactoringApplicationSteps>
  );
};
