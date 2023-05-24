import React, { useEffect, useState } from 'react';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';
import { FormField, Input } from '../Form/Form';

export const AddAutocompleteSuggestedValues = ({ refactoringApplication }) => {
  const refactoring = refactoringApplication.refactoring;
  const [suggestedValues, setSuggestedValues] = useState(
    refactoring.getValues().join(',')
  );

  const onChange = (event) => {
    setSuggestedValues(event.target.value);
  };

  useEffect(
    () => refactoring.setValues(suggestedValues.split(',')),
    [suggestedValues]
  );

  return (
    <RefactoringApplicationSteps
      refactoringApplication={refactoringApplication}
    >
      <FormField>
        <Input
          type={'text'}
          placeholder={'apple,orange,banana'}
          onChange={onChange}
          value={suggestedValues}
        />
      </FormField>
    </RefactoringApplicationSteps>
  );
};
