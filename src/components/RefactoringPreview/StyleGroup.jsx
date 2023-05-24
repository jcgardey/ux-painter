import React, { useState } from 'react';
import style from './RefactoringStyle.module.css';
import { InlineFormField, InlineLabel, InlineInput } from '../Form/Form';
import { Link } from '../Button/Button';

const Icon = ({ className }) => (
  <i className={`${className} ${style.icon}`}></i>
);

export const StyleGroup = ({ styleGroup, onStyleChange }) => {
  const [addProperty, setAddProperty] = useState(false);
  const [newPropertyName, setNewPropertyName] = useState('');
  const [newPropertyValue, setNewPropertyValue] = useState('');

  const addPropertyToGroup = () => {
    styleGroup.properties[newPropertyName] = newPropertyValue;
    setAddProperty(false);
  };

  return (
    <div className={style.group}>
      <p className={style.groupName}>{styleGroup.name}</p>
      {Object.keys(styleGroup.properties).map((property, propertyIndex) => (
        <InlineFormField key={propertyIndex}>
          <InlineLabel>{property}: </InlineLabel>
          <InlineInput
            defaultValue={styleGroup.properties[property]}
            onChange={(e) => (styleGroup.properties[property] = e.target.value)}
            onBlur={onStyleChange}
          />
        </InlineFormField>
      ))}
      {!addProperty && (
        <Link className={style.addRule} onClick={() => setAddProperty(true)}>
          Add Rule
          <Icon className="fas fa-plus-circle" />
        </Link>
      )}
      {addProperty && (
        <InlineFormField>
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
          <a onClick={() => addPropertyToGroup()}>
            <Icon className="fas fa-check fa-lg" />
          </a>
        </InlineFormField>
      )}
    </div>
  );
};
