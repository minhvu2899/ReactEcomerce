
import FormPasswordChange from '../components/FormPasswordChange'
import { Container, Paper } from '@mui/material';
import userApi from 'api/userApi';
import LoadingLinear from 'components/LoadingLinear';
import useHttp from 'hooks/use-http';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const PasswordChangePage = () => {
    const navigate = useNavigate()
    const { updateMyPassword } = userApi;
    const { sendRequest: updatePassword, status, data: user, error } = useHttp(updateMyPassword, false);
    const { isLogin } = useSelector(state => state.user);
    useEffect(() => {

        if (status === 'completed' && !error) {
            toast.success('Cập nhật thành công')

        }
        if (status === 'completed' && error) {
            toast.error(error)
        }
    }, [status, error])
    const handleSubmit = (values) => {


        updatePassword({ ...values })
    }
    return (
        <Paper>
            <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                {status === 'pending' && (<LoadingLinear />)}
                <FormPasswordChange onSubmit={handleSubmit} />




            </Container>
        </Paper >
    );



}

export default PasswordChangePage