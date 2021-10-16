import React from 'react';
import { useRefactoringManager } from '../../hooks/useRefactoringManager';
import { REFACTORING_CATALOGUE, VERSION_LIST } from '../../routing/types';
import {
  AddButton,
  Controls,
  PrimaryButton,
  SecondaryButton,
} from '../Button/Button';
import editVersionStyle from './EditVersion.css';

const AppliedRefactoring = ({ refactoring }) => (
  <div className={'row col-12'}>
    <p>{refactoring.constructor.asString()}</p>
  </div>
);

const DirtyRefactoring = ({ refactoring }) => (
  <div className={'row col-12'}>
    <p className={'uxpainter-message'}>
      {dirtyRefactoring.constructor.asString()}*
    </p>
  </div>
);

const EditVersion = () => {
  const manager = useRefactoringManager();

  const updateVersion = () => window.refactoringManager.saveDirtyRefactorings();

  return (
    <>
      <h4 className={editVersionStyle.title}>
        Version {manager.getCurrentVersion().getName()}
      </h4>
      <div className={editVersionStyle.applied}>
        <h5 className={editVersionStyle.appliedLegend}>Refactorings Applied</h5>
        {manager
          .getCurrentVersion()
          .getRefactorings()
          .map((refactoring) => (
            <AppliedRefactoring refactoring={refactoring} />
          ))}
        {manager.getDirtyRefactorings().map((dirtyRefactoring) => (
          <DirtyRefactoring refactoring={refactoring} />
        ))}
        {manager.getCurrentVersion().getRefactorings().length == 0 &&
          manager.getDirtyRefactorings().length == 0 && (
            <p className={editVersionStyle.noApplied}>
              This version has no refactorings.
            </p>
          )}
      </div>
      <Controls>
        <AddButton className={'btn btn-warning'} to={REFACTORING_CATALOGUE}>
          Add Refactoring <i className="fas fa-plus-circle"></i>
        </AddButton>
      </Controls>
      <Controls>
        <SecondaryButton to={VERSION_LIST}>
          <i className="fas fa-arrow-circle-left"></i> Back
        </SecondaryButton>
        <PrimaryButton onClick={updateVersion} to={VERSION_LIST}>
          Save <i className="fas fa-save"></i>
        </PrimaryButton>
      </Controls>
    </>
  );
};

export default EditVersion;
