import { Search } from '@mui/icons-material';
import { Box, Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
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
        const newFiler: ListParams = {
            ...filter,
            name_like: e.target.value,
            _page: 1,
        };
        onSearchChange(newFiler);
    };
    const handelFiterChange = (e: SelectChangeEvent<string>) => {
        if (!onChange) return;
        const newFilter: ListParams = {
            ...filter,
            _page: 1,
            city: e.target.value || undefined,
        };
        onChange(newFilter);
    };
    const handelSortChange = (e: SelectChangeEvent<string>) => {
        if (!onChange) return;
        const value = e.target.value;
        const [_sort, _order] = value.split('.');
        const newFilter: ListParams = {
            ...filter,
            _sort: _sort || undefined,
            _order: (_order as 'desc' | 'asc') || undefined,
        };
        onChange(newFilter);
    };
    const handleClear = () => {
        if (!onChange) return;
        const newFilter: ListParams = {
            ...filter,
            _page: 1,
            _sort: undefined,
            _order: undefined,
            name_like: undefined,
            city: undefined,
        };
        onChange(newFilter);
        if (searchRef.current) {
            console.log(searchRef.current.value);

            searchRef.current.value = '';
        }
    };
    const searchRef = React.useRef<HTMLInputElement>();
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
                            inputRef={searchRef}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="filterbyCity">City</InputLabel>
                        <Select
                            labelId="City"
                            id="filterbyCity"
                            label="City"
                            onChange={handelFiterChange}
                            value={filter.city ? filter.city : ''}
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
                <Grid item xs={12} md={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="sortByMarkAndName">Sort</InputLabel>
                        <Select
                            labelId="Sort"
                            id="sortByMarkAndName"
                            label="Sort"
                            onChange={handelSortChange}
                            value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                        >
                            <MenuItem value="">
                                <em>No sort</em>
                            </MenuItem>

                            <MenuItem value="name.asc">Name ASC</MenuItem>
                            <MenuItem value="name.desc">Name DESC</MenuItem>
                            <MenuItem value="mark.asc">Mark ASC</MenuItem>
                            <MenuItem value="mark.desc">Mark DESC</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={1}>
                    <Button variant="outlined" onClick={handleClear}>
                        Clear
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
