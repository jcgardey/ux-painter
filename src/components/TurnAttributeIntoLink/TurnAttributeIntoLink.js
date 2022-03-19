import React, { useState } from 'react';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';
import { FormField, Input } from '../Form/Form';

export const TurnAttributeIntoLink = ({ refactoringApplication }) => {
  const refactoring = refactoringApplication.refactoring;
  const [targetURL, setTargetURL] = useState(refactoring.getTargetURL() || '');

  const onChange = (event) => {
    setTargetURL(event.target.value);
    refactoring.setTargetURL(event.target.value);
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
          value={targetURL}
        />
      </FormField>
    </RefactoringApplicationSteps>
  );
};