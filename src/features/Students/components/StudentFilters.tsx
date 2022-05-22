import { Search } from '@mui/icons-material';
import { Box, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { City, ListParams } from 'models';
import * as React from 'react';
export interface StudentFiltersProps {
    filter: ListParams;
    cityList: City[];
    onSearchChange?: (ListParams: ListParams) => void;
    onChange?: (ListParams: ListParams) => void;
}

export default function StudentFilters({
    filter,
    cityList,
    onSearchChange,
    onChange,
}: StudentFiltersProps) {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;
        const newFiler = {
            ...filter,
            name_like: e.target.value,
            _page: 1,
        };
        onSearchChange(newFiler);
    };
    const handelFiterChange = (e: SelectChangeEvent<string>) => {
        if (!onChange) return;
        const newFilter = {
            ...filter,
            _page: 1,
            city: e.target.value || undefined,
        };
        onChange(newFilter);
    };
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth size="small" variant="outlined">
                        <InputLabel htmlFor="SearchByName">Search by name</InputLabel>
                        <OutlinedInput
                            id="SearchByName"
                            onChange={handleSearchChange}
                            endAdornment={<Search />}
                            label="Search by name"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="filterbyCity">City</InputLabel>
                        <Select
                            labelId="City"
                            id="filterbyCity"
                            // value={age}
                            label="City"
                            onChange={handelFiterChange}
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {cityList.map((city) => (
                                <MenuItem value={city.code} key={city.code}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
}
