import React from 'react';
import { goTo, Link } from 'route-lite';
import ExtendVersionView from './ExtendVersionView';

class RefactoringPreviewBody extends React.Component {
  constructor(props) {
    super(props);
    this.previews = this.props.previews;
    this.state = {
      currentPreview: null,
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleRefactor = this.handleRefactor.bind(this);
  }

  componentDidMount() {
    this.executePreview(this.previews[0]);
  }

  executePreview(previewRefactoring) {
    this.unDoCurrentRefactoring();
    previewRefactoring.execute();
    this.setState({ currentPreview: previewRefactoring });
    this.props.setCurrentPreview(previewRefactoring);
  }

  unDoCurrentRefactoring() {
    if (this.state.currentPreview) {
      this.state.currentPreview.unDo();
    }
  }

  handleRefactor() {
    if (this.state.currentPreview) {
      this.state.currentPreview.setURL(window.currentURL);
      window.refactoringManager.addDirtyRefactoring(this.state.currentPreview);
      goTo(ExtendVersionView, { addingRefactoring: false });
    } else {
      this.setState({ errorInPreview: true });
    }
  }

  handleCancel() {
    this.unDoCurrentRefactoring();
    goTo(ExtendVersionView);
  }

  render() {
    const me = this;
    const previewLinks = this.previews.map((preview, i) => {
      if (preview == this.state.currentPreview) {
        return (
          <li>
            <a
              className={'uxpainter-active-preview list-link'}
              onClick={() => {
                me.executePreview(preview);
              }}
            >
              Style {i + 1} <i className="fas fa-eye fa-lg"></i>
            </a>
          </li>
        );
      } else {
        return (
          <li>
            <a
              className={'list-link'}
              onClick={() => {
                me.executePreview(preview);
              }}
            >
              Style {i + 1}
            </a>
          </li>
        );
      }
    });

    return (
      <div className={'uxpainter-preview-body'}>
        <div className={'row'}>
          <div className={'col-12'}>
            <div className={'alert alert-primary'} role="alert">
              Interact with the refactored elements to observe how the page
              looks like. You can cancel the refactoring if you don't like it.
            </div>
            {this.previews.length > 1 && (
              <div className={'alert alert-warning'} role="alert">
                Try out the possible styles and select the desired one.
              </div>
            )}
          </div>
        </div>
        {this.props.previews.length > 1 && (
          <div className={'row col-12'}>
            <ul>{previewLinks}</ul>
          </div>
        )}
        <div className={'row'}>
          <div className={'col-6'}>
            <Link className={'btn btn-danger'} onClick={this.handleCancel}>
              Cancel <i className="fas fa-times-circle"></i>
            </Link>
          </div>
          <div className={'col-6'}>
            <Link onClick={this.handleRefactor} className={'btn btn-warning'}>
              Refactor <i className="fas fa-hammer fa-sm"></i>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default RefactoringPreviewBody;
