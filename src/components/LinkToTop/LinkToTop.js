import React, { useEffect } from 'react';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';

export const LinkToTop = ({ refactoringApplication }) => {
  const refactoring = refactoringApplication.refactoring;

  useEffect(()=>{
    refactoring.setElement(refactoring);
  })

  return (
    <RefactoringApplicationSteps
      refactoringApplication={refactoringApplication}
    >
    </RefactoringApplicationSteps>
  );
};