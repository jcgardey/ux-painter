import React from 'react';

interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'large';
  children: React.ReactNode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  variant = 'h1',
  children,
  className = '',
}) => {
  if (variant === 'h1') {
    return (
      <h1
        className={`scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance ${className}`}
      >
        {children}
      </h1>
    );
  } else if (variant === 'h3') {
    return (
      <h3
        className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
      >
        {children}
      </h3>
    );
  } else if (variant === 'caption') {
    return <p className="italic">{children}</p>;
  } else if (variant === 'large') {
    return <p className="text-lg font-semibold">{children}</p>;
  }
};
