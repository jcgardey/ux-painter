import React, { useState } from 'react';
import main from '../Main/Main.module.css';
import { useRefactoringManager } from '../../hooks/useRefactoringManager';
import { PrimaryButton, SecondaryButton, Controls } from '../Button/Button';
import { VERSION_LIST } from '../../routing/types';
import { FormField, Input, Label } from '../Form/Form';

export default ({ version }) => {
  const manager = useRefactoringManager();
  const editedVersion = version.clone();
  const [versionName, setVersionName] = useState(
    editedVersion.getName() != manager.getOriginalVersionName()
      ? editedVersion.getName()
      : ''
  );

  const handleChange = (e) => {
    setVersionName(e.target.value);
  };

  const handleSubmit = () => {
    editedVersion.setName(versionName);
    if (
      editedVersion.getName() &&
      manager.getOriginalVersionName() != editedVersion.getName()
    ) {
      manager.addVersion(editedVersion);
      manager.setCurrentVersion(editedVersion);
      manager.save();
    }
  };

  return (
    <>
      <h2 className={main.title}>New Version</h2>
      <FormField>
        <p>
          The version cannot be save as
          <span> {manager.getOriginalVersion().getName()}</span> because that is
          immutable
        </p>
      </FormField>
      <FormField>
        <Label>Name</Label>
        <Input type={'text'} value={versionName} onChange={handleChange} />
      </FormField>
      <Controls>
        <SecondaryButton to={VERSION_LIST}>
          <i className="fas fa-arrow-circle-left"></i> Back
        </SecondaryButton>
        <PrimaryButton onClick={handleSubmit} to={VERSION_LIST}>
          Create
        </PrimaryButton>
      </Controls>
    </>
  );
};
