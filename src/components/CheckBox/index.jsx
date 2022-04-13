import React from 'react'
import { Controller } from 'react-hook-form'
import { FormControlLabel, Checkbox } from '@mui/material';

const CheckBoxField = ({ form, label, name }) => {
    return (
        <section>
            <Controller
                name={name}
                control={form.control}
                render={({ field }) => (
                    <FormControlLabel
                        control={<Checkbox onChange={field.onChange}
                            checked={field.value} />}
                        label={label}
                    />
                    // <Checkbox
                    //     onChange={e => props.onChange(e.target.checked)}
                    //     checked={props.value}
                    //     name="Địa chỉ mặc định"
                    // />
                )}
            />
        </section>
    )
}

export default CheckBoxField