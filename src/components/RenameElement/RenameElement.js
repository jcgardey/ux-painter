import React, { useState } from 'react';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';
import { FormField, Input } from '../Form/Form';

export const RenameElement = ({ refactoringApplication }) => {
  const refactoring = refactoringApplication.refactoring;
  const [newName, setNewName] = useState(refactoring.getNewName() || '');

  const onChange = (event) => {
    setNewName(event.target.value);
    refactoring.setNewName(event.target.value);
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
          value={newName}
        />
      </FormField>
    </RefactoringApplicationSteps>
  );
};