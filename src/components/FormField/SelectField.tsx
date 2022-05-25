import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';
export interface selectOptions {
    label?: string | number;
    value: string | number;
}
export interface SelectFieldProps {
    name: string;
    control: Control<any>;
    options: selectOptions[];
    label?: string;
    disabled?: boolean;
}

export function SelectField({ name, control, options, label, disabled }: SelectFieldProps) {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({ control, name });

    return (
        <FormControl error={invalid} margin="normal" disabled={disabled} fullWidth size="small">
            <InputLabel id={`${name}_label`}>{label}</InputLabel>
            <Select
                labelId={`${name}_label`}
                onBlur={onBlur}
                value={value}
                label={label}
                onChange={onChange}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
