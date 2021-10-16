import React, { useState } from 'react';
import main from '../Main/Main.module.css';
import versionList from './VersionList.css';
import { Button, PrimaryButton } from '../Button/Button';
import { useRefactoringManager } from '../../hooks/useRefactoringManager';
import { VERSION } from '../../routing/types';
import { VersionListItem } from './VersionListItem';

const showSwitchingVersionOverlay = (versionName) => {
  let overlay = document.createElement('div');
  overlay.id = 'ux-painter-overlay';
  overlay.className = versionList.versionOverlay;
  overlay.textContent = `Switching to version ${versionName}`;
  document.body.appendChild(overlay);
  setTimeout(() => {
    document.body.removeChild(document.querySelector('#ux-painter-overlay'));
  }, 400);
};

export default () => {
  const manager = useRefactoringManager();
  const [currentVersion, setCurrentVersion] = useState(
    manager.getCurrentVersion()
  );

  const switchToVersion = (selectedVersion) => {
    showSwitchingVersionOverlay(selectedVersion.getName());
    manager.getCurrentVersion().unDo();
    manager.setCurrentVersion(selectedVersion);
    selectedVersion.execute();
    manager.save();
    setCurrentVersion(selectedVersion);
  };

  return (
    <>
      <h2 className={main.title}>Versions</h2>
      <div className={versionList.list}>
        {manager.getAllVersions().map((version, i) => (
          <VersionListItem
            key={i}
            version={version}
            current={version.getName() === currentVersion.getName()}
            switchToVersion={switchToVersion}
          />
        ))}
      </div>
      <div className={versionList.controls}>
        <PrimaryButton
          to={VERSION}
          props={{
            version: window.refactoringManager.getOriginalVersion(),
          }}
        >
          New version <i className="fas fa-plus-circle"></i>
        </PrimaryButton>
      </div>
    </>
  );
};
