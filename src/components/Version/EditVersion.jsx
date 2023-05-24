import React, { useState } from 'react';
import { useRefactoringManager } from '../../hooks/useRefactoringManager';
import { REFACTORING_CATALOGUE, VERSION_LIST } from '../../routing/types';
import {
  AddButton,
  Controls,
  PrimaryButton,
  SecondaryButton,
} from '../Button/Button';
import style from './EditVersion.module.css';

const AppliedRefactoring = ({ refactoring }) => (
  <p>{refactoring.constructor.asString()}</p>
);

const EditVersion = () => {
  const manager = useRefactoringManager();

  const [appliedRefactorings, setAppliedRefactorings] = useState(
    manager.getCurrentVersion().getRefactorings()
  );

  const [dirtyRefactorings, setDirtyRefactorings] = useState(
    manager.getDirtyRefactorings()
  );

  const updateVersion = () => {
    window.refactoringManager.saveDirtyRefactorings();
    setAppliedRefactorings([...manager.getCurrentVersion().getRefactorings()]);
    setDirtyRefactorings([...manager.getDirtyRefactorings()]);
  };

  return (
    <>
      <h4 className={style.title}>
        Version {manager.getCurrentVersion().getName()}
      </h4>
      <div className={style.applied}>
        <h5 className={style.appliedLegend}>Refactorings Applied</h5>
        {appliedRefactorings.map((refactoring, i) => (
          <AppliedRefactoring refactoring={refactoring} key={i} />
        ))}
        <p className={style.unsaved}>Unsaved Refactorings</p>
        {dirtyRefactorings.map((dirtyRefactoring, i) => (
          <AppliedRefactoring refactoring={dirtyRefactoring} key={i} />
        ))}
        {appliedRefactorings.length == 0 && dirtyRefactorings.length == 0 && (
          <p className={style.noApplied}>This version has no refactorings.</p>
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
        <PrimaryButton onClick={updateVersion}>
          Save <i className="fas fa-save"></i>
        </PrimaryButton>
      </Controls>
    </>
  );
};

export default EditVersion;
