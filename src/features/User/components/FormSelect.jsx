// import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
export const FormSelect = ({ name, form, label, options = [], defaultOptions, onCityChange, onDistrictChange }) => {

    const generateSelectOptions = () => {
        if (options) {
            return options.map((option) => {
                return (
                    <MenuItem key={option.code} value={option.name}>
                        {option.name}
                    </MenuItem>
                );
            });
        }
    };
    const handelChange = (e, value) => {

        if (onCityChange) {
            onCityChange(e.target.value)

        }
        if (onDistrictChange) {
            onDistrictChange(e.target.value)
        }
    }
    return <Controller
        name={name}
        defaultValue="0"

        render={({ field }) => (

            <FormControl fullWidth  >
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={field.value}
                    label={label}
                    onChange={(e) => { field.onChange(e); handelChange(e) }}
                    fullWidth

                >
                    {defaultOptions && (
                        <MenuItem key={defaultOptions.value} value={defaultOptions.value} disabled>
                            {defaultOptions.label}
                        </MenuItem>

                    )}

                    {generateSelectOptions()}
                </Select>
            </FormControl >

        )}
        control={form.control}
    />

};