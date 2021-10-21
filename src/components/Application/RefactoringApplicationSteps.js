import React from 'react';
import style from './RefactoringApplicationStep.css';

const RefactoringApplicationStepList = ({ refactoringApplication, steps }) => (
  <>
    {steps.map((step) => (
      <DisabledRefactoringApplicationStep
        number={refactoringApplication.stepNumber(step)}
        title={step.title}
      />
    ))}
  </>
);

const CurrentRefactoringApplicationStep = ({
  refactoringApplication,
  children,
}) => (
  <div className={style.step}>
    <p className={style.stepName}>
      <span className={style.stepNumber}>
        {refactoringApplication.currentStepNumber()}
      </span>
      {refactoringApplication.currentStep().title}
    </p>
    <div className={style.stepContent}>{children}</div>
  </div>
);

export const RefactoringApplicationSteps = ({
  refactoringApplication,
  children,
}) => (
  <div>
    <RefactoringApplicationStepList
      refactoringApplication={refactoringApplication}
      steps={refactoringApplication.backSteps()}
    />
    <CurrentRefactoringApplicationStep
      refactoringApplication={refactoringApplication}
    >
      {children}
    </CurrentRefactoringApplicationStep>
    <RefactoringApplicationStepList
      refactoringApplication={refactoringApplication}
      steps={refactoringApplication.nextSteps()}
    />
  </div>
);

export const DisabledRefactoringApplicationStep = ({ number, title }) => (
  <div className={style.disabledStep}>
    <p className={style.disabledStepName}>
      <span className={`${style.stepNumber} ${style.disabledStepNumber}`}>
        {number}
      </span>
      {title}
    </p>
  </div>
);
