import React from 'react'
import { Typography, Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
const QuantityField = (props) => {
    const { form, name, label, disabled, qty } = props;
    const { formState, setValue } = form;
    const hasError = formState.errors[name];

    return (
        <div><FormControl size="small" variant="outlined" margin="normal">
            {/* <InputLabel htmlFor={name}>{label}</InputLabel> */}
            {/* <Typography>{label}</Typography> */}
            <Controller
                name={name}
                control={form.control}
                // as={OutlinedInput}
                render={({ field }) => (
                    <Box>
                        <IconButton onClick={() => { setValue(name, Number.parseInt(field.value) ? Number.parseInt(field.value) - 1 : 1, { shouldValidate: true }) }}>
                            <RemoveCircleOutline />
                        </IconButton>
                        <OutlinedInput sx={{ maxWidth: '60px' }}
                            id={name}
                            type="number"
                            defaultValue={qty}
                            disabled={disabled}
                            error={!!hasError}
                            value={field.value}
                            onChange={
                                field.onChange}

                            onBlur={field.onBlur}
                            name={name}

                        />
                        <IconButton onClick={() => setValue(name, Number.parseInt(field.value) ? Number.parseInt(field.value) + 1 : 1, { shouldValidate: true })}>
                            <AddCircleOutline />
                        </IconButton>
                    </Box>
                )}

            />
            <FormHelperText error={!!hasError}>{hasError?.message}</FormHelperText>
        </FormControl></div >
    )
}

export default QuantityField