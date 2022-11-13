import React, { useState, useEffect } from 'react';
import XPathInterpreter from '../../utils/XPathInterpreter';
import ElementSelectionGif from '../Selection/ElementSelectionGif';
// import style from '../Selection/SingleElementSelection.module.css';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';
import { usePageSelector } from '../../context/PageSelectorContext';
import { Input } from '../Form/Form.js';
import './AddFormValidation.css';

export const AddFormValidation = ({ refactoringApplication }) => {
  const refactoring = refactoringApplication.refactoring;

  const pageSelector = usePageSelector();

  const [errorInSelection, setErrorInSelection] = useState(false);
  const [errorInChoice, setErrorInChoice] = useState(false);
  const [errorInRegularExpression, setErrorInRegularExpression] =
    useState(false);
  const [errorInErrorMessage, setErrorInErrorMessage] = useState(false);

  const [elementSelected, setElementSelected] = useState(
    refactoring.getElement() !== null
  );
  const [requiredInputs, setRequiredInputs] = useState([]);
  const [requiredInputsFrontend, setRequiredInputsFrontend] = useState([]);

  const [references, setReferences] = useState([]);

  const [formValidations, setFormValidations] = useState([]);

  const [labels, setLabels] = useState([]);

  const [editIcon, setEditIcon] = useState([]);

  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    if (refactoring.getElement()) {
      pageSelector.addSelectionClass(
        refactoring.getElement(),
        pageSelector.selectionClass
      );
    }
    pageSelector.enableElementSelection({
      targetElementSelector: 'input',
      onElementSelection: onElementSelection,
    });
    pageSelector.preventDomElementsBehaviour();
  }, []);

  const onElementSelection = (elementSelected) => {
    pageSelector.addRequiredField(elementSelected);
    const elementXpath = new XPathInterpreter().getPath(
      elementSelected,
      document.body
    )[0];
    if (requiredInputs.includes(elementXpath) == false) {
      setErrorInSelection(false);

      requiredInputs.push(elementXpath);
      setRequiredInputs(requiredInputs);

      requiredInputsFrontend.push('Input');
      setRequiredInputsFrontend([...requiredInputsFrontend]);

      references.push(React.createRef());
      setReferences([...references]);

      labels.push(React.createRef());
      setLabels([...labels]);

      editIcon.push(React.createRef());
      setEditIcon([...editIcon]);

      formValidations.push('empty');
      setFormValidations([...formValidations]);

      errorMessages.push(React.createRef());
      setErrorMessages([...errorMessages]);
    }
  };

  const disableElementSelection = () =>
    pageSelector.restoreDomElementsBehaviour();

  const back = () => {
    disableElementSelection();
    pageSelector.removeSelectedElementsHighlighting();
    return true;
  };

  const checkValidations = () => {
    if (requiredInputs.length != 0) {
      let check = true;
      formValidations.map((validation, index) => {
        if (validation == 'empty') {
          setErrorInChoice(true);
          check = false;
        } else {
          if (
            validation == 'regular_expression' &&
            references[index].current.value == ''
          ) {
            setErrorInRegularExpression(true);
            check = false;
          }
        }
      });
      return check;
    } else {
      setErrorInSelection(true);
      return false;
    }
  };

  const next = () => {
    setErrorInChoice(false);
    setErrorInRegularExpression(false);
    setErrorInErrorMessage(false);
    let regular_expression = [];
    references.map((data) => {
      regular_expression.push(data.current.value);
    });
    let error = false;
    let messages = [];
    errorMessages.map((data) => {
      if (data.current.value != '') {
        messages.push(data.current.value);
      } else {
        error = true;
        setErrorInErrorMessage(true);
      }
    });
    if (checkValidations() && error == false) {
      let inputs = [
        requiredInputs,
        formValidations,
        regular_expression,
        messages,
      ];
      refactoring.setRequiredInputXpaths(inputs);
      disableElementSelection();
      return elementSelected;
    }
  };

  const addInput = (index) => {
    references[index].current.style.display = 'block';
    let validations = formValidations;
    validations[index] = 'regular_expression';
    setFormValidations(validations);
  };

  const removeInput = (index) => {
    references[index].current.style.display = 'none';
    let validations = formValidations;
    validations[index] = 'required';
    setFormValidations(validations);
  };

  const editLabel = (index) => {
    labels[index].current.style.display = 'block';
    editIcon[index].current.style.display = 'none';
  };

  const updateLabel = (index) => {
    if (labels[index].current.firstChild.value != '') {
      editIcon[index].current.style.display = 'inline';
      labels[index].current.style.display = 'none';
      let newRequiredInputsFrontend = requiredInputsFrontend;
      newRequiredInputsFrontend[index] = labels[index].current.firstChild.value;
      setRequiredInputsFrontend([...newRequiredInputsFrontend]);
      labels[index].current.firstChild.value = '';
    }
  };

  const closeInput = (index) => {
    editIcon[index].current.style.display = 'inline';
    labels[index].current.style.display = 'none';
    labels[index].current.firstChild.value = '';
  };

  return (
    <>
      <RefactoringApplicationSteps
        refactoringApplication={refactoringApplication}
        onBack={back}
        onNext={next}
      >
        <ElementSelectionGif />
        <div className={'form-group'}>
          <h4>Required Inputs Selected</h4>
          {errorInSelection && (
            <p style={{ color: 'red' }}>At least one input must be selected</p>
          )}
          {errorInChoice && (
            <p style={{ color: 'red' }}>
              Each input must have its validation type
            </p>
          )}
          {errorInRegularExpression && (
            <p style={{ color: 'red' }}>
              There cannot be an empty regular expression
            </p>
          )}
          {errorInErrorMessage && (
            <p style={{ color: 'red' }}>
              There cannot be an empty error message
            </p>
          )}
        </div>
        {requiredInputsFrontend.map((data, index) => {
          return (
            <div key={index}>
              <h4 key={index}>
                {data}
                <i
                  id="iconEditLabel"
                  className="fas fa-edit"
                  style={{ marginLeft: '5px' }}
                  onClick={() => {
                    editLabel(index);
                  }}
                  ref={editIcon[index]}
                ></i>
              </h4>
              <div style={{ display: 'none' }} ref={labels[index]}>
                <Input
                  style={{ display: 'inline', margin: '5px', width: '70%' }}
                ></Input>
                <i
                  id="iconEditLabel"
                  className="fas fa-check-circle fa-lg"
                  style={{ marginLeft: '5px' }}
                  onClick={() => {
                    updateLabel(index);
                  }}
                ></i>
                <i
                  id="iconEditLabelClose"
                  className="fas fa-times-circle fa-lg"
                  style={{ marginLeft: '5px' }}
                  onClick={() => {
                    closeInput(index);
                  }}
                ></i>
                <br></br>
              </div>
              <input
                type={'radio'}
                name={index}
                onClick={() => {
                  removeInput(index);
                }}
              ></input>
              <label>Required field</label>
              <br></br>
              <input
                type={'radio'}
                name={index}
                onClick={() => {
                  addInput(index);
                }}
              ></input>
              <label>Regular expression</label>
              <Input
                style={{ display: 'none', margin: '5px', width: '92%' }}
                ref2={references[index]}
                placeholder="Regular expression"
              ></Input>
              <Input
                style={{ margin: '5px', width: '92%' }}
                ref2={errorMessages[index]}
                placeholder="Error message"
              ></Input>
            </div>
          );
        })}
      </RefactoringApplicationSteps>
    </>
  );
};
