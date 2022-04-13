import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';


PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function PasswordField(props) {
    const { form, name, label, disabled } = props;
    const { errors } = form.formState;
    const hasError = errors[name];
    // const message=errors[name].message;
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(x => !x);
    }
    return (


        <FormControl fullWidth
            variant="outlined" >
            <InputLabel htmlFor={name}>Password</InputLabel>
            <Controller
                name={name}
                control={form.control}
                render={({ field }) => (
                    <OutlinedInput
                        id={name}
                        type={showPassword ? 'text' : 'password'}
                        label={label}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={toggleShowPassword}

                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        disabled={disabled}
                        error={!!hasError}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={name}
                    />

                )} />
            <FormHelperText error={hasError}>{hasError?.message}</FormHelperText>
        </FormControl >



    );
}

export default PasswordField;