import React, { useState } from 'react';
import style from './RefactoringStyle.module.css';
import { InlineFormField, InlineLabel, InlineInput } from '../Form/Form';

const Icon = ({ className }) => (
  <i className={`${className} ${style.icon}`}></i>
);

export const RefactoringStyle = ({ refactoring }) => {
  const [refactoringStyle, setRefactoringStyle] = useState(refactoring.style);
  const [addProperty, setAddProperty] = useState(
    Array.from({ length: style.length }, () => false)
  );

  const [newPropertyName, setNewPropertyName] = useState('');
  const [newPropertyValue, setNewPropertyValue] = useState('');

  const refresh = () => {
    refactoring.style = refactoringStyle;
    refactoring.unDo();
    refactoring.execute();
  };

  const newProperty = (groupIndex) => {
    addProperty[groupIndex] = true;
    setAddProperty([...addProperty]);
  };

  const addPropertyToGroup = (targetGroup) => {
    targetGroup.properties[newPropertyName] = newPropertyValue;
    addProperty[refactoringStyle.indexOf(targetGroup)] = false;
    setAddProperty([...addProperty]);
    setRefactoringStyle([...refactoringStyle]);
    refresh();
  };

  return (
    <>
      {refactoringStyle.map((styleGroup, i) => (
        <div className={style.group} key={i}>
          <p className={style.groupName}>{styleGroup.name}</p>
          {Object.keys(styleGroup.properties).map((property, propertyIndex) => (
            <InlineFormField key={propertyIndex}>
              <InlineLabel>{property}: </InlineLabel>
              <InlineInput
                defaultValue={styleGroup.properties[property]}
                onChange={(e) =>
                  (styleGroup.properties[property] = e.target.value)
                }
                onBlur={refresh}
              />
              {propertyIndex ===
                Object.keys(styleGroup.properties).length - 1 &&
                !addProperty[i] && (
                  <a onClick={() => newProperty(i)}>
                    <Icon className="fas fa-plus fa-lg" />
                  </a>
                )}
            </InlineFormField>
          ))}
          <InlineFormField>
            {addProperty[i] && (
              <>
                <InlineInput
                  value={newPropertyName}
                  placeholder={'property'}
                  onChange={(e) => setNewPropertyName(e.target.value)}
                  style={{ width: '40%' }}
                />
                <InlineInput
                  value={newPropertyValue}
                  placeholder={'value'}
                  onChange={(e) => setNewPropertyValue(e.target.value)}
                />{' '}
                <a onClick={() => addPropertyToGroup(styleGroup)}>
                  <Icon className="fas fa-check fa-lg" />
                </a>
              </>
            )}
          </InlineFormField>
        </div>
      ))}
    </>
  );
};
