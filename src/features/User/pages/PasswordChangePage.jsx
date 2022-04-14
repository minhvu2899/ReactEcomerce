
import FormPasswordChange from '../components/FormPasswordChange'
import { Container, Paper } from '@mui/material';
import userApi from 'api/userApi';
import LoadingLinear from 'components/LoadingLinear';
import useHttp from 'hooks/use-http';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import StorageKeys from 'constants/storage-keys';
const PasswordChangePage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { isLogin } = useSelector(state => state.user);
    const handleSubmit = async (values) => {

        try {
            setLoading(true)
            const { data } = await userApi.updateMyPassword(values)
            console.log(data.token)
            localStorage.setItem(StorageKeys.TOKEN, data.token);
            toast.success('Cập nhật thành công')
        }
        catch (err) {
            toast.error(err)
        }
        setLoading(false)
    }
    return (
        <Paper>
            <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                {loading && (<LoadingLinear />)}
                <FormPasswordChange onSubmit={handleSubmit} />




            </Container>
        </Paper >
    );



}

export default PasswordChangePage