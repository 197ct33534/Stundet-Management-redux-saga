import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import * as React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import { Control, useController } from 'react-hook-form';
export interface radioOptions {
    label?: string | number;
    value: string | number;
}
export interface RadioGroupFieldProps {
    name: string;
    control: Control<any>;
    options: radioOptions[];
    label?: string;
    disabled?: boolean;
}

export function RadioGroupField({ name, control, options, label, disabled }: RadioGroupFieldProps) {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({ control, name });

    return (
        <FormControl error={invalid} margin="normal" disabled={disabled} fullWidth>
            <FormLabel id={`${name}_label`}>{label}</FormLabel>
            <RadioGroup
                row
                aria-labelledby={`${name}_label`}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
