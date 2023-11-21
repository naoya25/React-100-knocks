import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, style }) => (
  <button onClick={onClick} style={style}>
    {label}
  </button>
);

export default Button;
