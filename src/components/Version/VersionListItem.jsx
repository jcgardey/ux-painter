import React from 'react';
import { useRefactoringManager } from '../../hooks/useRefactoringManager';
import { Button } from '../Button/Button';
import { EDIT_VERSION, VERSION } from '../../routing/types';
import versionStyle from './VersionListItem.module.css';

export const VersionListItem = ({ version, current, switchToVersion }) => {
  const manager = useRefactoringManager();

  const handleEdit = () => {
    switchToVersion(version);
  };

  return (
    <div className={versionStyle.version}>
      <p className={versionStyle.name}>
        {version.getName()}{' '}
        {manager.getOriginalVersionName() == version.getName() && (
          <i className="fas fa-lock"></i>
        )}
      </p>
      <div className={versionStyle.controls}>
        <a
          className={`${versionStyle.controlAction} ${
            current ? versionStyle.active : ''
          }`}
          onClick={() => switchToVersion(version)}
        >
          <i className="fas fa-eye fa-lg"></i>
        </a>
        <Button
          className={versionStyle.controlAction}
          to={VERSION}
          props={{ version: version }}
        >
          <i className="far fa-clone fa-lg"></i>
        </Button>
        {manager.getOriginalVersionName() != version.getName() && (
          <Button
            className={versionStyle.controlAction}
            onClick={handleEdit}
            to={EDIT_VERSION}
          >
            <i className="fas fa-edit fa-lg"></i>
          </Button>
        )}
      </div>
    </div>
  );
};
