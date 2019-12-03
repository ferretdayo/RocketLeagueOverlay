import React from 'react';

type ButtonProps = {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => {}
}

const Button: React.FC<ButtonProps> = (props) => {
  const { label, onClick } = props
  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  );
}

export default Button;
