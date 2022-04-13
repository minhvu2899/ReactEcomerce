import React from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ButtonCustom = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    flexGrow: 1,
    borderRadius: 0,
    color: 'white',
    textTransform: 'unset',
    outline: 0

});

export default ButtonCustom