import React from 'react';
import PropTypes from 'prop-types';
import { Container, FormControl, InputLabel, Paper, Typography, makeStyles, Select, Button, Box } from '@mui/material';
import { FormInputDropdown } from 'components/SelectField';
import InputField from 'components/InputFiled';
import { FileInput } from 'components/UploadFile';
import { FormInputMutiDropdown } from 'components/MutiSelectField';
import LoadingLinear from 'components/LoadingLinear';
import { Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
FormBrandInfo.propTypes = {

};
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    input: {
        display: 'none',
    },
}));
function FormBrandInfo({ form, categories, onUpload, status }) {
    const classes = useStyles();
    const handleImageUpload = (e) => {
        console.log(onUpload)
        onUpload(e)
    }
    return (


        <>


            <InputField name='name' label='Tên thương hiệu' form={form}></InputField>

            <input type='hidden' {...form.register('logo')} />
            <InputField name='slug' label='Slug' form={form}></InputField>
            {/* <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Danh mục</InputLabel> */}
            {/* <FormInputMutiDropdown name="categories" label="Category" form={form} options={categories} /> */}

            {/* </FormControl> */}
            <Controller
                control={form.control}
                defaultValue={[]}
                name="categories"
                render={({ onChange, value, name, ref }) => (
                    <ReactSelect
                        isMulti
                        inputRef={ref}
                        classNamePrefix="addl-class"
                        options={categories}
                        value={value}
                        onChange={onChange}
                    />
                )}
            />

            {/* <FileInput control={form} name="file" onChanges={handleImageUpload} /> */}
            <Box align="left" padding={1}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"

                    type="file"
                    {...form.register()}
                    onChange={handleImageUpload}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Upload Logo
                    </Button>

                </label>

            </Box>





        </>
    );
}

export default FormBrandInfo;