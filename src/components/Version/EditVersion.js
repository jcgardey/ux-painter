import React from 'react';
import { VERSION_LIST } from '../../routing/types';
import { PrimaryButton, SecondaryButton } from '../Button/Button';
import RefactoringListView from '../RefactoringListView';

class EditVersion extends React.Component {
  constructor(props) {
    super(props);
    if (!this.props.addingRefactoring) {
      this.state = { addingRefactoring: false };
    } else {
      this.state = { addingRefactoring: this.props.addingRefactoring };
    }
    this.addRefactoring = this.addRefactoring.bind(this);
    this.cancelRefactoring = this.cancelRefactoring.bind(this);
    this.updateVersion = this.updateVersion.bind(this);
  }

  addRefactoring() {
    this.setState({ addingRefactoring: true });
  }

  cancelRefactoring() {
    this.setState({ addingRefactoring: false });
  }

  updateVersion() {
    window.refactoringManager.saveDirtyRefactorings();
  }

  render() {
    const refactoringsApplied = window.refactoringManager
      .getCurrentVersion()
      .getRefactorings()
      .map((refactoring) => {
        return (
          <div className={'row col-12'}>
            <p>{refactoring.constructor.asString()}</p>
          </div>
        );
      });

    const dirtyRefactorings = window.refactoringManager
      .getDirtyRefactorings()
      .map((dirtyRefactoring) => {
        return (
          <div className={'row col-12'}>
            <p className={'uxpainter-message'}>
              {dirtyRefactoring.constructor.asString()}*
            </p>
          </div>
        );
      });

    return (
      <div className={'container'}>
        <h5 className={'text-center uxpainter-message'}>
          {window.refactoringManager.getCurrentVersion().getName()}
        </h5>
        {!this.state.addingRefactoring && [
          <div className={'row col-12 uxpainter-long-row'}>
            <h5 className={'text-center'}>Refactorings Applied</h5>
            {refactoringsApplied}
            {dirtyRefactorings}
            {refactoringsApplied.length == 0 && dirtyRefactorings.length == 0 && (
              <div className={'form-group'}>
                <p>This version has no refactorings.</p>
              </div>
            )}
          </div>,
          <div className={'row uxpainter-long-row col-12'}>
            <a className={'btn btn-warning'} onClick={this.addRefactoring}>
              Add Refactoring <i className="fas fa-plus-circle"></i>
            </a>
          </div>,
          <div className={'row uxpainter-long-row'}>
            <div className={'col-5'}>
              <SecondaryButton
                className={'btn btn-secondary'}
                to={VERSION_LIST}
              >
                <i className="fas fa-arrow-circle-left"></i> Back
              </SecondaryButton>
            </div>
            <div className={'col-5'}>
              <PrimaryButton
                className={'btn btn-dark'}
                onClick={this.updateVersion}
                to={VERSION_LIST}
              >
                Save <i className="fas fa-save"></i>
              </PrimaryButton>
            </div>
          </div>,
        ]}
        {this.state.addingRefactoring && [
          <RefactoringListView />,
          <div className={'row uxpainter-long-row col-12'}>
            <Button
              className={'btn btn-danger'}
              onClick={this.cancelRefactoring}
            >
              Cancel <i className="fas fa-times-circle"></i>
            </Button>
          </div>,
        ]}
      </div>
    );
  }
}

export default EditVersion;
