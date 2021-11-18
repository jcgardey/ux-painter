import React from 'react';
import formStyle from './Form.css';

export const FormField = ({ children }) => (
  <div className={formStyle.group}>{children}</div>
);

export const Label = ({ children }) => (
  <label className={formStyle.label}>{children}</label>
);

export const Input = ({
  type,
  onChange,
  value,
  placeholder = '',
  className = '',
}) => (
  <input
    type={type}
    className={`${formStyle.input} ${className}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export const InlineFormField = ({ children }) => (
  <div className={formStyle.inline}>{children}</div>
);

export const InlineInput = ({ type = 'text', placeholder = '', ...props }) => (
  <input
    type={type}
    className={formStyle.inlineInput}
    placeholder={placeholder}
    {...props}
  />
);

export const InlineLabel = ({ children }) => (
  <label className={formStyle.inlineLabel}>{children}</label>
);
