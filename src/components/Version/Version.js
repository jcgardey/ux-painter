import React, { useState } from 'react';
import main from '../Main/Main.module.css';
import { useRefactoringManager } from '../../hooks/useRefactoringManager';
import { PrimaryButton, SecondaryButton } from '../Button/Button';
import { VERSION_LIST } from '../../routing/types';

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
    <div className={main.container}>
      <h3 className={main.title}>New Version</h3>
      <div className={'row col-12 uxpainter-long-row'}>
        <p className={'uxpainter-message'}>
          The version cannot be save as{' '}
          <strong>{manager.getOriginalVersion().getName()}</strong> because that
          is immutable
        </p>
      </div>
      <div className={'row col-12 uxpainter-long-row'}>
        <label>Name</label>
        <input
          type={'text'}
          className={'form-control'}
          value={versionName}
          onChange={handleChange}
        />
      </div>
      <div className={'row uxpainter-long-row'}>
        <div className={'col-5'}>
          <SecondaryButton to={'VersionList'}>
            <i className="fas fa-arrow-circle-left"></i> Back
          </SecondaryButton>
        </div>
        <div className={'col-5'}>
          <PrimaryButton onClick={handleSubmit} to={VERSION_LIST}>
            Create
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
