import React from 'react';
import style from './RefactoringApplicationSteps.module.css';
import { Controls, PrimaryButton, SecondaryButton } from '../Button/Button';
import { useRouter } from '../../routing/Router';

const RefactoringApplicationStepList = ({ refactoringApplication, steps }) => (
  <>
    {steps.map((step, i) => (
      <DisabledRefactoringApplicationStep
        key={i}
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
  onNext,
  onBack,
}) => {
  const router = useRouter();

  const next = () => {
    if (onNext === undefined || onNext()) {
      router.show(refactoringApplication.next().view, {
        refactoringApplication,
      });
      refactoringApplication.goNext();
    }
  };

  const back = () => {
    if (onBack === undefined || onBack()) {
      refactoringApplication.goBack();
      router.show(refactoringApplication.currentStep().view, {
        refactoringApplication,
      });
    }
  };

  return (
    <div>
      <h2 className={style.title}>
        {refactoringApplication.refactoring.constructor.asString()}
      </h2>
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
      <Controls>
        <SecondaryButton onClick={back}>
          <i className="fas fa-arrow-circle-left"></i> Back
        </SecondaryButton>
        {refactoringApplication.next() !==
          refactoringApplication.currentStep() && (
          <PrimaryButton onClick={next}>
            Next <i className="fas fa-arrow-circle-right"></i>
          </PrimaryButton>
        )}
      </Controls>
    </div>
  );
};

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
