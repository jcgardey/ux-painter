import React from 'react';
import { useRouter } from '../../routing/Router';
import buttonStyle from './Button.css';

export const Button = ({
  to,
  className,
  children,
  onClick: clickHandler,
  props,
}) => {
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

export const PrimaryButton = ({ to, props, children, onClick }) => {
  return (
    <Button
      className={buttonStyle.primary}
      to={to}
      props={props}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export const SecondaryButton = ({ to, props, children }) => {
  return (
    <Button className={buttonStyle.secondary} to={to} props={props}>
      {children}
    </Button>
  );
};
