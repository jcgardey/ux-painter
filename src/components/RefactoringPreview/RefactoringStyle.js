import React, { useState } from 'react';
import style from './RefactoringStyle.module.css';
import { InlineFormField, InlineLabel, InlineInput } from '../Form/Form';
import { StyleGroup } from './StyleGroup';

const Icon = ({ className }) => (
  <i className={`${className} ${style.icon}`}></i>
);

export const RefactoringStyle = ({ refactoring }) => {
  const [refactoringStyle, setRefactoringStyle] = useState(refactoring.style);

  const refresh = () => {
    refactoring.style = refactoringStyle;
    refactoring.unDo();
    refactoring.execute();
  };

  return (
    <>
      {refactoringStyle.map((styleGroup, i) => (
        <div className={style.group} key={i}>
          <StyleGroup styleGroup={styleGroup} onStyleChange={refresh} />
        </div>
      ))}
    </>
  );
};
