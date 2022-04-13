import { Container, Paper, Typography } from '@mui/material';
import InputFields from 'components/FieldArray/InputFieldArray';
import React from 'react';



function FormProductDetail({ form, attributes }) {

    // const [InputFields, setInputField] = useState([]);
    const { control, register, getValues, errors } = form;

    // const handleClick = () => {
    //     const newInput = { key: 'Key', value: 'Value' }
    //     setInputField(InputFields.concat(newInput))
    // }

    return (

        <Paper elevation={3}>
            <Typography variant="h4" align="left">Thông tin chi tiết</Typography>
            <Container maxWidth="sm">
                {/* {attributes && attributes.length > 0 && attributes.map(a => (
                    <InputField name={a.name} label={a.name} form={form}></InputField>

                ))} */}
                {/* <InputField name='height' label='Xuất xứ' form={form}></InputField>
                <InputField name='height' label='Chất liệu' form={form}></InputField>
                <InputField name='height' label='Loại da' form={form}></InputField> */}

                {/* 
                {InputFields.map((inputField, index) => (
                    <Box component="div" m={1} style={{ display: 'flex' }} key={index}>
                        <InputField name={`key${index}`} label={inputField.key} form={form}></InputField>
                        <InputField name={`value${index}`} label={inputField.value} form={form}></InputField>
                    </Box>
                ))} */}
                <InputFields
                    {...{ control, register, getValues, errors, attributes }}
                />
                {/* <Button onClick={handleClick} color="primary" variant="contained" style={{ marginBottom: '15px' }}>Thêm</Button> */}

            </Container>
        </Paper>
    );
}

export default FormProductDetail;