import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';




InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputField(props) {
    const { form, name, label, disabled, type } = props;
    const { errors } = form.formState;
    const hasError = errors[name];
    // const message = errors[name].message;

    return (
        <Controller

            name={name}
            control={form.control}
            render={({ field }) => (
                <TextField
                    // margin="normal"
                    variant='outlined'
                    fullWidth
                    type={type || 'text'}
                    label={label}
                    disabled={disabled}
                    error={!!hasError}
                    helperText={hasError?.message}
                    name={name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                />
            )}
        // render={({ field }) => console.log(field)}

        />

    );
}

export default InputField;