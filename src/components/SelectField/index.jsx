// import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
// import InputLabel from '@mui/material/InputLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
export const FormInputDropdown = ({ name, form, label, options, defaultOptions }) => {

    const generateSelectOptions = () => {
        if (options && options.length === 0) {
            return (
                <MenuItem key={new Date().toString()}>
                    Không có dữ liệu
                </MenuItem>
            );
        } else if (options && options.length > 0) {
            return options.map((option) => {
                return (
                    <MenuItem key={option.id ? option.id : option.code} value={option.id ? option.id : option.code} >
                        {option.name}
                    </MenuItem >
                );
            });
        }


    };
    const { errors } = form.formState;
    const hasError = errors[name];
    return <Controller
        name={name}
        render={({ field }) => (
            <FormControl fullWidth error={!!hasError}
            >
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={field.value || ''}
                    label={label}
                    onChange={field.onChange}
                    fullWidth
                >
                    {defaultOptions && (
                        <MenuItem key={defaultOptions.value} value={defaultOptions.value}>
                            {defaultOptions.label}
                        </MenuItem>
                    )}

                    {generateSelectOptions()}
                </Select>
                <FormHelperText>{errors[name]?.message}</FormHelperText>
            </FormControl >
        )}
        control={form.control}
    />

};