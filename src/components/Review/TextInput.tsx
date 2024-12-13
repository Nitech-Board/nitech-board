import React from "react";
import { TextField } from "@mui/material";

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  multiline?: boolean;
  rows?: number;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  label,
  multiline = true,
  rows = 2,
}) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      label={label}
      multiline={multiline}
      rows={rows}
      fullWidth
      variant="outlined"
    />
  );
};
