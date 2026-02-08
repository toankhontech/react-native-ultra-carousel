import React from 'react';

type GradientTextProps = {
  children: string;
  gradient?: string;
  style?: React.CSSProperties;
};

const GradientText: React.FC<GradientTextProps> = ({
  children,
  gradient = 'linear-gradient(135deg, #6c63ff, #00d2ff)',
  style,
}) => {
  return (
    <span
      style={{
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;
