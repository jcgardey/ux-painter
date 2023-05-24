import React, { useState } from 'react';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';
import { FormField, Input } from '../Form/Form';

export const AddLink = ({ refactoringApplication }) => {
  const refactoring = refactoringApplication.refactoring;
  const [linkName, setLinkName] = useState(refactoring.getLinkName() || '');
  const [targetURL, setTargetURL] = useState(refactoring.getTargetURL() || '');

  const onChangeLinkName = (event) => {
    setLinkName(event.target.value);
    refactoring.setLinkName(event.target.value);
  };

  const onChangeTargetURL = (event) => {
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
          placeholder={'Link Name'}
          onChange={onChangeLinkName}
          value={linkName}
        />
      </FormField>

      <FormField>
        <Input
          type={'text'}
          placeholder={'Target URL'}
          onChange={onChangeTargetURL}
          value={targetURL}
        />
      </FormField>
    </RefactoringApplicationSteps>
  );
};
