import { Container, Paper } from '@mui/material';
import userApi from 'api/userApi';
import LoadingLinear from 'components/LoadingLinear';
import { updateUser } from 'features/Auth/userSlice';
import useHttp from 'hooks/use-http';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormProfile from './../components/FormProfile';
function ProfilePage(props) {
    const navigate = useNavigate()
    const { get, update, upload } = userApi;
    const { sendRequest: getUserByID, status, data: user, error } = useHttp(get, true);
    const { isLogin } = useSelector(state => state.user);

    const { sendRequest: updateProfile, status: statusUpdate, data: userUpdate, error: errorUpdate } = useHttp(update, false)
    // const { sendRequest: uploadAvatar, status: statusUpLoad, data: avatar, error: errorUpdate } = useHttp(upload, false)
    const [userInfo, setUserInfo] = useState({})
    const [loadingUpload, setLoadingUpload] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (isLogin) {

            getUserByID()
        }
        else {
            navigate('auth/login')
        }

    }, [getUserByID, isLogin, navigate])

    useEffect(() => {

        if (statusUpdate === 'completed' && !errorUpdate) {
            setUserInfo(userUpdate)
            toast.success('Cập nhật thành công')
            dispatch(updateUser(userUpdate))
        }
        if (statusUpdate === 'completed' && errorUpdate) {
            toast.error(errorUpdate)
        }
    }, [statusUpdate, errorUpdate, userUpdate, dispatch])
    useEffect(() => {
        if (status === 'completed' && !error) {
            setUserInfo(user)
        }
        if (status === 'completed' && error) {
            toast.error(error)
        }
    }, [status, error, user])

    const handelUploadImage = async (file) => {
        try {
            setLoadingUpload(true);
            const form = new FormData();
            form.append('photo', file);
            const { data } = await userApi.upload(form)
            setUserInfo(preUser => ({ ...preUser, photo: data.url }))
            toast.success('Upload thành công')
        }
        catch (err) {
            toast.error(err)
        }
    }
    const handleSubmit = (values) => {

        updateProfile(values)
    }

    return (
        <Paper>
            <Container maxWidth="md">
                {(status === 'pending' || statusUpdate === 'pending') && (<LoadingLinear />)}
                {(status === 'completed' && error) && (<p>{error}</p>)}

                <FormProfile FormProfile onSubmit={handleSubmit} userInfo={userInfo} onUpload={handelUploadImage}></FormProfile>






            </Container>
        </Paper >
    );







}

export default ProfilePage;