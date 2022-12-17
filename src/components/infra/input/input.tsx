import React from "react";
import "./input.scss";
import MuiTextField from '@mui/material/TextField';

interface InputProps {
    disabled?: boolean,
    type?: React.HTMLInputTypeAttribute,
    value?: string,
    readOnly?: boolean,
    placeholder?: string,
    label?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    style?: React.CSSProperties | undefined
}

export const Input: React.FC<InputProps> = ({
    disabled,
    type,
    value,
    readOnly,
    placeholder,
    label,
    onChange,
    style
}) => {

    return <MuiTextField
        style={style}
        variant="outlined"
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
        label={label}
        className="Input"
        size={'small'}
    />
}