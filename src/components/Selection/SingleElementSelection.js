import React, { useState } from 'react';
import PageSelector from './PageSelector';
import XPathInterpreter from '../../utils/XPathInterpreter';
import ElementSelectionGif from './ElementSelectionGif';
import { useRouter } from '../../routing/Router';
import { Controls, PrimaryButton, SecondaryButton } from '../Button/Button';
import style from './SingleElementSelection.css';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';

const testFuction = () => {};

export const SingleElementSelection = ({ refactoringApplication }) => {
  const [errorInSelection, setErrorInSelection] = useState(false);
  const [elementSelected, setElementSelected] = useState(false);

  const router = useRouter();

  const refactoring = refactoringApplication.refactoring;

  const onElementSelection = (elementSelected) => {
    if (refactoring.getElement()) {
      pageSelector.removeSelectionClass(
        refactoring.getElement(),
        pageSelector.selectionClass
      );
    } else {
      setElementSelected(true);
    }
    const elementXpath = new XPathInterpreter().getPath(
      elementSelected,
      document.body
    )[0];
    refactoring.setElementXpath(elementXpath);
    refactoring.setElement(elementSelected);
    pageSelector.addSelectionClass(
      elementSelected,
      pageSelector.selectionClass
    );
  };

  const pageSelector = new PageSelector();
  pageSelector.removeSelectedElementsHighlighting();
  pageSelector.enableElementSelection({
    targetElementSelector: refactoring.targetElements(),
    onElementSelection: onElementSelection,
  });
  pageSelector.preventDomElementsBehaviour();

  const disableElementSelection = () =>
    pageSelector.restoreDomElementsBehaviour();

  const onBack = () => {
    disableElementSelection();
    pageSelector.removeSelectedElementsHighlighting();
  };

  const next = () => {
    if (elementSelected) {
      disableElementSelection();
      router.show(refactoringApplication.next().view, {
        refactoringApplication,
      });
    } else {
      setErrorInSelection(true);
    }
  };

  return (
    <>
      <h2 className={style.title}>{refactoring.constructor.asString()}</h2>
      <RefactoringApplicationSteps
        refactoringApplication={refactoringApplication}
      >
        {elementSelected && (
          <p className={style.success}>
            Done! change the selection or continue to the next step
          </p>
        )}
        {errorInSelection && (
          <p className={style.error}>Element must be selected to continue</p>
        )}
        <ElementSelectionGif />
      </RefactoringApplicationSteps>
      <Controls>
        <SecondaryButton
          onClick={onBack}
          to={refactoringApplication.back().view}
        >
          <i className="fas fa-arrow-circle-left"></i> Back
        </SecondaryButton>
        <PrimaryButton onClick={next}>
          Next <i className="fas fa-arrow-circle-right"></i>
        </PrimaryButton>
      </Controls>
    </>
  );
};

/*
class ElementSelectionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementXpath: '',
      errorInSelection: false,
      elementSelected: false,
    };
    this.refactoring = this.props.refactoring;
    this.pageSelector = new PageSelector(this);
    this.pageSelector.removeSelectedElementsHighlighting();
    this.pageSelector.enableElementSelection({
      targetElementSelector: this.refactoring.targetElements(),
    });
    this.pageSelector.preventDomElementsBehaviour();

    this.disableElementSelection = this.disableElementSelection.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  onElementSelected(anElement) {
    if (this.refactoring.getElement()) {
      this.pageSelector.removeSelectionClass(
        this.refactoring.getElement(),
        this.pageSelector.selectionClass
      );
    } else {
      this.setState({ elementSelected: true });
    }
    const elementXpath = new XPathInterpreter().getPath(
      anElement,
      document.body
    )[0];
    this.setState({ elementXpath: elementXpath });
    this.refactoring.setElementXpath(elementXpath);
    this.refactoring.setElement(anElement);
    this.pageSelector.addSelectionClass(
      anElement,
      this.pageSelector.selectionClass
    );
    const me = this;
  }

  disableElementSelection() {
    this.pageSelector.restoreDomElementsBehaviour();
  }

  handleBack() {
    this.disableElementSelection();
    this.pageSelector.removeSelectedElementsHighlighting();
    goBack();
  }

  handleNext() {
    if (this.state.elementXpath) {
      this.disableElementSelection();
      if (!this.refactoring.checkPreconditions()) {
        goTo(this.refactoring.getView(), { refactoring: this.refactoring });
      } else {
        goTo(RefactoringPreview, { refactoring: this.refactoring });
      }
    } else {
      this.setState({ errorInSelection: true });
    }
  }

  render() {
    return (
      <div className={'container'}>
        <div className={'row col-12'}>
          <h5 className={'text-center'}>
            {this.refactoring.constructor.asString()}
          </h5>
        </div>
        <div className={'row col-12'}>
          <div className={'form-group'}>
            <div className={'alert alert-primary'} role="alert">
              {!this.props.instruction && 'Select an element in the page'}
              {this.props.instruction}
            </div>
            {this.state.elementSelected && (
              <div className={'alert alert-warning'} role="alert">
                Done! change the selection or continue to the next step
              </div>
            )}
          </div>
        </div>
        {this.state.errorInSelection && !this.state.elementSelected && (
          <div className={'alert alert-danger'} role="alert">
            Element must be selected to continue
          </div>
        )}
        <ElementSelectionGif />
        <div className={'row uxpainter-long-row'}>
          <div className={'col-5'}>
            <Link
              className={'btn btn-secondary'}
              onClick={() => this.handleBack()}
            >
              <i className="fas fa-arrow-circle-left"></i> Back
            </Link>
          </div>
          <div className={'col-5'}>
            <Link onClick={this.handleNext} className={'btn btn-warning'}>
              Next <i className="fas fa-arrow-circle-right"></i>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}


export default ElementSelectionView;

*/
