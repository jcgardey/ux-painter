import React from 'react';
import { Link, goTo } from 'route-lite';
import VersionList from './VersionList';
import main from './Main.module.css';
import { useRefactoringManager } from '../hooks/useRefactoringManager';
import { PrimaryButton, SecondaryButton } from './Button';

const VersionView = ({ version }) => {
  const manager = useRefactoringManager();

  const editedVersion = version.clone();
  const [versionName, setVersionName] = useState(
    editedVersion.getName() &&
      editedVersion.getName() != manager.getOriginalVersion().getName()
      ? editedVersion.getName()
      : ''
  );

  const handleChange = (e) => {
    setVersionName(e.target.value);
    editedVersion.setName(e.target.value);
  };

  const handleSubmit = () => {
    if (
      editedVersion.getName() &&
      mananger.getOriginalVersion().getName() != editedVersion.getName()
    ) {
      mananger.addVersion(this.props.version);
      mananger.setCurrentVersion(this.props.version);
      mananger.save();
      goTo(VersionListView);
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
          <SecondaryButton to={VersionListView}>
            <i className="fas fa-arrow-circle-left"></i> Back
          </SecondaryButton>
        </div>
        <div className={'col-5'}>
          <PrimaryButton onClick={handleSubmit}>Create</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default VersionView;
