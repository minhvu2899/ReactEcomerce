import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import commentApi from 'api/commentApi';
import orderApi from 'api/orderApi';
import useHttp from 'hooks/use-http';
import queryString from 'query-string';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ModalCancelOrder from '../components/ModalCancelOrder';
import ModelRating from './../components/ModelRating';
import OrderListUserPage from './OrderListUserPage';


const OrderUserPage = () => {
    const [itemRating, setItemRating] = useState({});
    const [open, setOpen] = useState(false);
    const [openCancel, setOpenCancel] = useState(false);
    const [submitCancel, setSubmitCancel] = useState(false);
    const [orderCancel, setOrderCancel] = useState('');
    const [value, setValue] = React.useState('all');
    const navigate = useNavigate();
    const { getByUser } = orderApi;
    const { add } = commentApi;
    const { id } = useSelector(state => state.user.current)
    const user = useSelector(state => state.user.current)
    const { sendRequest: getListOrder, status, data: orders, error } = useHttp(getByUser, true);
    const { sendRequest: addComment, status: isSubmitRating, data: comment, error: errorAddComment } = useHttp(add, false);
    const location = useLocation()

    const queryParams = queryString.parse(location.search)
    const [filters, setFilters] = useState({
        page: Number.parseInt(queryParams.page) || 1,
        limit: Number.parseInt(queryParams.limit) || 5,
        orderStatus: Number.parseInt(queryParams.orderStatus) || "NEW"
    })



    // const { enqueueSnackbar } = useSnackbar();
    const { updateStatus } = orderApi;
    const { sendRequest: updateOrderStatus, status: statusUpdateStatus, error: errorUpdateOrderStatus } = useHttp(updateStatus, false)
    const handleClickOpen = ({ product }) => {

        setItemRating(product)
        setOpen(true);
    };
    const handelViewRatingOpen = (item) => {

        setItemRating(item)
        // setOpen(true);
    };


    const handleChange = (event, newValue) => {
        setFilters(pre => ({
            ...pre,
            orderStatus: newValue
        }));

    };

    useEffect(() => {
        if (isSubmitRating === 'completed' && !errorAddComment) {

            setOpen(false);
            toast.success("Đánh giá sản phẩm thành công!");
        }
    }, [isSubmitRating, errorAddComment])
    useEffect(() => {
        if (isSubmitRating === 'completed' || statusUpdateStatus === 'completed') {
            getListOrder({ id, filters })


        }
    }, [isSubmitRating, getListOrder, id, filters, statusUpdateStatus])
    useEffect(() => {

        if (statusUpdateStatus === 'completed' && !errorUpdateOrderStatus) {

            toast.success("Đơn hàng đã hủy thành công")

        }
        if (statusUpdateStatus === 'completed' && errorUpdateOrderStatus) {
            toast.error("Đơn hàng đã hủy thất bại")
        }
    }, [statusUpdateStatus, errorUpdateOrderStatus])

    useEffect(() => {
        getListOrder({ id, filters })
    }, [getListOrder, id, filters])
    // useEffect(() => {
    //     navigate({
    //         pathname: location.pathname,
    //         search: queryString.stringify(filters),
    //     })
    // }, [filters, navigate, location.pathname])
    const handleSubmit = (values) => {
        // e.preventDefault()
        console.log(values)
        const data = {
            product: itemRating.product,
            rating: values.rating,
            review: values.review,
            user,
            // order: { id: itemRating.id }
        }
        // console.log(data)
        addComment(data)
        // console.log(commentRef.current.value)
    }
    const handelCancelOrder = (id) => {
        console.log(id)
        setOpenCancel(true)
        setOrderCancel(id)
        // if (submitCancel) {

        //     updateOrderStatus({ id, status: 'CANCEL' })
        // }
    }
    const handelSubmitCancel = () => {

        updateOrderStatus({ id: orderCancel, status: 'CANCEL' })

    }
    return (
        <>
            <Box sx={{ width: '100%' }} marginBottom={1} padding={1}>
                <Paper>
                    <Tabs
                        value={filters.orderStatus}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        {/* <Tab value={0} label="Tất cả" /> */}
                        <Tab value="NEW" label="Chưa xác nhận" />
                        <Tab value="IN_PROGRESS" label="Đang xử lí" />
                        <Tab value="PACKAGED" label="Chờ lấy hàng" />
                        <Tab value="PICKED" label="Đang giao " />
                        <Tab value="DELIVERED" label="Đã giao" />
                        <Tab value="CANCEL" label="Đã hủy" />
                    </Tabs>
                </Paper>
            </Box>
            <Box padding={1}>
                {status === 'completed' && orders.length === 0 && <p>Không có đơn hàng</p>}
                {status === 'completed' && orders.length > 0 && (
                    <OrderListUserPage orders={orders} handelOnClick={handleClickOpen} onViewRatingOrder={handelViewRatingOpen} setOpenCancel={handelCancelOrder} />)}




            </Box>

            <ModelRating itemRating={itemRating} isLoading={isSubmitRating} onSubmit={handleSubmit} open={open} setOpen={setOpen} />
            <ModalCancelOrder open={openCancel} setOpenCancel={setOpenCancel} onSubmit={handelSubmitCancel} />

        </>
    );
}
export default OrderUserPage