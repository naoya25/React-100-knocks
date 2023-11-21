import React, { ChangeEvent } from "react";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  width: number;
  type?: string;
  accept?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  width,
  type = "text",
  accept,
}) => (
  <label>
    <p style={{ fontWeight: "bold" }}>{label}</p>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      style={{
        width: width,
        height: 30,
        border: "1px solid gray",
        borderRadius: 5,
        padding: 5,
        outline: "none",
      }}
      {...(type === "file" && { accept })}
    />
  </label>
);

export default Input;
