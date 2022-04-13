import React from 'react'
import { TextField, Box } from '@mui/material';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
const Input = styled(TextField)(({ theme }) => ({
    width: 600,
    color: theme.palette.success.main,

    "fieldset": {
        border: 'none',
        outline: 'none',
        borderRadius: 0
    },
    "& .MuiOutlinedInput-root": {

        "&.Mui-focused fieldset": {
            border: 'none',
            outline: 'none',

        },
        "&:hover fieldset": {
            order: 'none',
            outline: 'none',

        }
    }
}));
const ButtonSearch = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    flexGrow: 1,
    borderRadius: 0,
    color: 'white',
    textTransform: 'unset',
    outline: 0

});
const SearchField = ({ value, onChange, onSearch }) => {
    return (
        <Box sx={{ bgcolor: 'white', width: '700px', height: '40px', display: { md: 'flex', xs: 'none' }, borderRadius: 2, overFlow: 'hidden' }}>
            <Input size="small" type="search" value={value} onChange={(e) => onChange(e.target.value)} onKeyPress={(ev) => {

                if (ev.key === 'Enter') {
                    onSearch()
                    onChange('')
                    ev.preventDefault();
                }
            }} />

            <ButtonSearch onClick={onSearch}>Tìm kiếm</ButtonSearch>
        </Box>
    )
}

export default SearchField