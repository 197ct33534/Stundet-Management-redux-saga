import TextField from '@mui/material/TextField';
import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';
export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    control: Control<any>;
}

export function InputField({ name, label, control, ...inputProps }: InputFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });
    return (
        <TextField
            margin="normal"
            size="small"
            variant="outlined"
            fullWidth
            error={invalid}
            helperText={error?.message}
            inputProps={inputProps}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
        />
    );
}
