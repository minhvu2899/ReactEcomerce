import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, FormControlLabel, Grid, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InputField from '../../../components/InputField';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { FormInputDropdown } from '../../../components/SelectField';
import { FormSelect } from './FormSelect';
// import {provinces} from 'src/utils/provinces'
import { provinces } from './../../../utils/provinces';
import { cities } from './../../../utils/city';
const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        paddingTop: '16px',
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: 'gray',
    },
    title: {
        margin: '16px 0 48px 0',
        textAlign: 'center',
    },
    submit: {
        margin: '48px 0 16px 0',
    },
    process: {
        position: 'absolute',
        top: '8px',
        left: '0',
        right: '0',
    }
}))
FormAddress.propTypes = {
    onSubmit: PropTypes.func,
};

function FormAddress({ onSubmit, edit, address }) {
    const classes = useStyles();
    console.log('add', provinces)
    const [district, setDistrict] = React.useState([]);
    const [ward, setWard] = React.useState([]);
    const schema = yup.object().shape({
        // fullname: yup.string().required('Please enter your fullname')
        //     .test('should has at least two words', 'Please enter at least two words', (value) => {
        //         console.log("Value", value);
        //         return value.split(' ').length >= 2;
        //     }),
        // email: yup.string().required('Please enter your email').email('Please enter a valid email address'),


    });

    const form = useForm({
        defaultValues: {
            name: '',
            phone: '',
            city: '',
            district: '',
            ward: '',
            address: '',
            isDefault: true,
        },
        resolver: yupResolver(schema),
    })
    const { setValue } = form
    useEffect(() => {

        if (address) {
            const city = provinces.find(city => city.name === address.city);
            setDistrict(city.districts)
            const dist = city.districts.find(d => d.name === address.district);
            setWard(dist.wards)
            setValue('name', address.name)
            setValue('phone', address.phone)
            setValue('city', address.city)
            setValue('district', address.district)
            setValue('ward', address.ward)
            setValue('address', address.address)
            setValue('isDefault', address.isDefault)
        }
    }, [address, setValue])
    const handleSubmit = (values) => {

        if (onSubmit) {
            onSubmit(values);

        }
        form.reset();

    }
    const handelCityChange = (e) => {

        const city = provinces.find(city => city.name === e);
        setDistrict(city.districts)
    }
    const handelDistrictChange = (e) => {
        const dist = district.find(d => d.name === e);
        setWard(dist.wards)

    }
    const { isSubmitting } = form.formState;
    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.process} />}

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <InputField name='name' label='Họ và tên' form={form}></InputField>
                    </Grid>
                    <Grid item xs={6}>
                        <InputField name='phone' label='Số điện thoại' form={form}></InputField>
                    </Grid>
                    <Grid item xs={12}>
                        <FormSelect name="city" label="Tỉnh/Thành phố" form={form} options={cities} defaultOptions={{ value: 0, label: 'Chọn Tỉnh/Thành Phố' }} onCityChange={handelCityChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormSelect name="district" label="Quận/Huyện" form={form} options={district} defaultOptions={{ value: 0, label: 'Chọn Quận/Huyện' }} onDistrictChange={handelDistrictChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormSelect name="ward" label="Phường/Xã" form={form} options={ward} defaultOptions={{ value: 0, label: 'Chọn Phường/Xã' }} />
                    </Grid>
                </Grid>






                <InputField name='address' label='Địa chỉ' form={form}></InputField>

                <div>
                    <Controller
                        name="isDefault"
                        control={form.control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox onChange={e => field.onChange(e.target.checked)}
                                    checked={field.value} />}
                                label="Địa chỉ mặc định"
                            />
                            // <Checkbox
                            //     onChange={e => props.onChange(e.target.checked)}
                            //     checked={props.value}
                            //     name="Địa chỉ mặc định"
                            // />
                        )}
                    />
                </div>
                <Button disabled={isSubmitting} type="submit" variant="contained" color="primary" fullWidth className={classes.submit}>
                    {edit ? ' Cập nhật địa chỉ' : 'Thêm địa chỉ'}
                </Button>
            </form>
        </div>

    );
}

export default FormAddress;