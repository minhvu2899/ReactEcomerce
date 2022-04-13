import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import InputField from './../../../../components/InputField/index';


function FormProductInfoDeliver({ form }) {


    return (
        <>
            <Grid item xs={12}>
                <Box sx={{ my: 2 }}>
                    <Typography variant="h6" align="left">Thông tin vận chuyển</Typography>
                </Box>
            </Grid>



            <Grid item xs={12} md={6}>
                <InputField name='height' label='Chiều cao' form={form}></InputField>
            </Grid>
            <Grid item xs={12} md={6}>
                <InputField name='length' label='Chiều dài' form={form}></InputField> </Grid>
            <Grid item xs={12} md={6}>
                <InputField name='width' label='Chiều rộng' form={form}></InputField> </Grid>
            <Grid item xs={12} md={6}>
                <InputField name='weight' label='Cân nặng' form={form}></InputField> </Grid>


        </>
    );
}

export default FormProductInfoDeliver;