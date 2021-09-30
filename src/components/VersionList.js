import React, { useState } from 'react';
import { Link, goTo } from 'route-lite';
import ExtendVersionView from './ExtendVersionView';
import VersionView from './VersionView';
import main from './Main.module.css';
import versionList from './VersionList.css';
import { PrimaryButton } from './Button';
import { useRefactoringManager } from '../hooks/useRefactoringManager';

export const VersionList = () => {
  const manager = useRefactoringManager();

  const [currentVersion, setCurrentVersion] = useState(
    manager.getCurrentVersion()
  );

  const getCurrentVersion = () => {
    return manager.getCurrentVersion().getName()
      ? manager.getCurrentVersion().getName()
      : 'Original';
  };

  const switchToVersion = (event) => {
    const selectedVersion =
      manager.getAllVersions()[event.target.getAttribute('data-version')];
    showSwitchingVersionOverlay(selectedVersion.getName());
    manager.getCurrentVersion().unDo();
    manager.setCurrentVersion(selectedVersion);
    selectedVersion.execute();
    manager.save();
    setCurrentVersion(selectedVersion);
  };

  const handleEdit = (event) => {
    switchToVersion(event);
    goTo(ExtendVersionView);
  };

  const showSwitchingVersionOverlay = (versionName) => {
    let overlay = document.createElement('div');
    overlay.id = 'uxpainter-overlay';
    overlay.textContent = 'Switching to version ' + versionName;
    overlay.style.cssText =
      'font-size:2em;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5;z-index:9998;padding-top: 5%; padding-left: 35%;';
    document.body.appendChild(overlay);
    setTimeout(() => {
      document.body.removeChild(document.querySelector('#uxpainter-overlay'));
    }, 400);
  };
  /*
  const allVersions = window.refactoringManager
    .getAllVersions()
    .map((version, i) => {
      const eyeIconColor =
        version.getName() == this.state.currentVersion.getName()
          ? '#ffc107'
          : 'black';
      return (
        <div className={'row col-12'}>
          <div className={'col-6 offset-1'}>
            <p
              className={'uxpainter-message'}
              style={{ 'font-size': '18px' }}
              data-tip={'Clone version'}
            >
              {version.getName()}{' '}
              {window.refactoringManager.getOriginalVersionName() ==
                version.getName() && <i className="fas fa-lock"></i>}
            </p>
          </div>
          <div className={'col-1 offset-1'}>
            <a
              style={{ color: eyeIconColor }}
              className={'uxpainter-icon-link'}
              onClick={this.switchToVersion}
            >
              <i data-version={i} className="fas fa-eye fa-lg"></i>
            </a>
          </div>
          <div className={'col-1'}>
            {window.refactoringManager.getOriginalVersionName() !=
              version.getName() && (
              <a
                className={'uxpainter-icon-link'}
                data-version={i}
                onClick={this.handleEdit}
              >
                <i data-version={i} className="fas fa-edit fa-lg"></i>
              </a>
            )}
          </div>
          <div className={'col-1'}>
            <Link
              className={'uxpainter-icon-link'}
              component={VersionView}
              componentProps={{ version: version }}
            >
              <i data-version={i} className="far fa-clone fa-lg"></i>
            </Link>
          </div>
        </div>
      );
    });
    */
  return (
    <div className={main.container}>
      <h2 className={main.title}>Versions</h2>
      <div className={versionList.list}></div>
      <div className={versionList.controls}>
        <PrimaryButton
          to={VersionView}
          componentProps={{
            version: window.refactoringManager.getOriginalVersion(),
          }}
        >
          New version <i className="fas fa-plus-circle"></i>
        </PrimaryButton>
      </div>
    </div>
  );
};
