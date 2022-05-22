import { Search } from '@mui/icons-material';
import { Box, Grid, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { ListParams } from 'models';
import * as React from 'react';
export interface StudentFiltersProps {
    filter: ListParams;
    onSearchChange?: (ListParams: ListParams) => void;
}

export default function StudentFilters({ filter, onSearchChange }: StudentFiltersProps) {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;
        const newFiler = {
            ...filter,
            name_like: e.target.value,
        };
        onSearchChange(newFiler);
    };
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth size="small" variant="outlined">
                        <InputLabel htmlFor="SearchByName">Search by name</InputLabel>
                        <OutlinedInput
                            id="SearchByName"
                            // value={values.weight}
                            onChange={handleSearchChange}
                            endAdornment={<Search />}
                            label="Search by name"
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
}
