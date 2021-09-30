import React from 'react';
import { useRouter } from '../util/Router';
import buttonStyle from './Button.css';

const Button = ({ to, className, children, onClick: clickHandler, props }) => {
  const router = useRouter();

  const onClick = (e) => {
    if (clickHandler) clickHandler(e);
    router.show(to, props);
  };

  return (
    <a className={className} onClick={onClick}>
      {children}
    </a>
  );
};

export const PrimaryButton = ({ to, children }) => {
  return (
    <Button className={buttonStyle.primary} to={to}>
      {children}
    </Button>
  );
};

export const SecondaryButton = ({ to, children }) => {
  return (
    <Button className={buttonStyle.secondary} to={to}>
      {children}
    </Button>
  );
};
