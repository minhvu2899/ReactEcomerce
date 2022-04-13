import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { FormInputDropdown } from 'components/SelectField';
import { TextField, Select, Box, MenuItem, Grid, Typography, Button } from '@mui/material';
import ReactSelect from "react-select";
import uploadApi from 'api/uploadApi';
import useHttp from 'hooks/use-http';
let renderCount = 0;
const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
]
const generateSelectOptions = (options) => {
    return options.map((option) => {
        return (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        );
    });
};
export default function Fields({ control, register, getValues, errors, colors, sizes, watch }) {
    const { fields, append, remove, insert } = useFieldArray({
        control,
        name: 'variants'
    });
    const { upload } = uploadApi
    const { sendRequest: uploadImage, status: statusUpload, data: imageUpload, error: errorUpload } = useHttp(upload, false)
    const handleImageUpload = async (e, indx, item) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        // // // console.log(formData)
        const { data } = await uploadApi.add(formData)
        // uploadImage(formData)
        // console.log(data)

        const data1 = (watch('variants')[indx])
        data1.image = data;
        remove(indx)
        insert(indx, data1)
        // console.log('change', e, indx, item)
    }


    const optionSizes = sizes.map(size => (
        {
            label: size.name,
            value: size.id
        }
    ))
    const optionColors = colors.map(color => (
        {
            label: color.name,
            value: color.id
        }
    ))

    return (
        <Box padding={1}>

            <Grid container spacing={1}>
                {fields.length > 0 && (
                    <Grid item container>
                        <Grid item xs={12} md={2}>
                            <Typography variant="subtitle1">Chọn size</Typography>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Typography variant="subtitle1">Chọn color</Typography>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Typography variant="subtitle1">Chi phí</Typography>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Typography variant="subtitle1">Giá</Typography>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Typography variant="subtitle1">Số lượng</Typography>
                        </Grid>
                        <Grid item xs={12} md={1}>
                            <Typography variant="subtitle1">Giảm giá</Typography>
                        </Grid>
                        <Grid item xs={12} md={1}>
                            <Typography variant="subtitle1"></Typography>
                        </Grid>
                    </Grid>
                )}
                {fields.map((item, index) => {
                    const error = errors['variants']

                    return (
                        <Grid item container key={item.id}>
                            {item.id && <input type="hidden" ref={register()}
                                name={`variants[${index}].id`}
                                defaultValue={item.id}></input>}

                            <input
                                name={`attributes[${index}].name`}
                                ref={register()}
                                defaultValue={`${item.color},${item.size}`}
                                type="hidden"
                            />

                            <Grid item xs={2}>


                                <Controller
                                    control={control}
                                    defaultValue={item.size ? item.size.id : ''}
                                    name={`variants[${index}].size`}
                                    render={({ onChange, value, name, ref }) => (
                                        <ReactSelect
                                            inputRef={ref}
                                            classNamePrefix="addl-class"
                                            options={optionSizes}
                                            value={optionSizes.find(c => c.value === value)}
                                            onChange={val => onChange(val.value)}
                                        />
                                    )}
                                />

                            </Grid>
                            <Grid item xs={2}>

                                <Controller
                                    control={control}
                                    defaultValue={item.color ? item.color.id : ''}
                                    name={`variants[${index}].color`}
                                    render={({ onChange, value, name, ref }) => (
                                        <ReactSelect
                                            inputRef={ref}
                                            classNamePrefix="addl-class"
                                            options={optionColors}
                                            value={optionColors.find(c => c.value === value)}
                                            onChange={val => onChange(val.value)}
                                        />
                                    )}
                                />

                            </Grid>
                            <Grid item xs={2}>

                                <Controller as={<TextField label="Chi phí" variant="outlined" maxWidth size="small" />}
                                    name={`variants[${index}].cost`}
                                    control={control}
                                    defaultValue={item.cost}
                                    error={errors['variants'] ? errors['variants'][`${index}`]?.cost : ''}

                                    helperText={errors['variants'] ? errors['variants'][`${index}`]?.cost?.message : ''}
                                // helperText="ádadadasd"
                                />

                            </Grid>
                            <Grid item xs={2}>

                                <Controller as={<TextField label="Giá bán" variant="outlined" maxWidth size="small" />}
                                    name={`variants[${index}].originalPrice`}
                                    control={control}
                                    defaultValue={item.originalPrice}
                                    error={errors['variants'] ? errors['variants'][`${index}`]?.originalPrice : ''}

                                    helperText={errors['variants'] ? errors['variants'][`${index}`]?.originalPrice?.message : ''}
                                // helperText="ádadadasd"
                                />

                            </Grid>
                            <Grid item xs={2}>

                                <Controller as={<TextField label="Số lượng" variant="outlined" maxWidth size="small" />}
                                    name={`variants[${index}].countInStock`}
                                    control={control}
                                    defaultValue={item.countInStock}
                                    error={errors['variants'] ? errors['variants'][`${index}`]?.countInStock : ''}

                                    helperText={errors['variants'] ? errors['variants'][`${index}`]?.countInStock?.message : ''}
                                />
                            </Grid>
                            <Grid item xs={1}>

                                <Controller as={<TextField label="Giảm giá" variant="outlined" maxWidth size="small" />}
                                    name={`variants[${index}].discountPercent`}
                                    control={control}
                                    defaultValue={item.discountPercent}
                                    error={errors['variants'] ? errors['variants'][`${index}`]?.discountPercent : ''}

                                    helperText={errors['variants'] ? errors['variants'][`${index}`]?.discountPercent?.message : ''}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Button type="button" onClick={() => remove(index)}>
                                    Xóa
                                </Button>

                            </Grid>



                        </Grid>
                    );
                })}
            </Grid>

            <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() => {
                    append({});
                }}
            >
                Thêm
            </Button>

            {/* <span className="counter">Render Count: {renderCount}</span> */}
        </Box>
    );
}
