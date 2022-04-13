import { Box, Grid, Pagination, Tab, Tabs, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import ghtkApi from 'api/ghtkApi';
import orderApi from 'api/orderApi';
import LoadingCircular from 'components/Loading/LoadingCircular';
import LoadingLinear from 'components/LoadingLinear';
import OrderItemAdmin from 'features/dashboard/components/OrderItemAdmin';
import useHttp from 'hooks/use-http';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});




function ManageOrdersPage(props) {
    const classes = useStyles();
    const navigate = useNavigate()

    console.log(navigate)
    const { updateStatus, getByFilter } = orderApi;
    const { sendRequest: updateOrderStatus, status: statusUpdateStatus, error: errorUpdateOrderStatus } = useHttp(updateStatus, false)
    const { sendRequest: getOrder, status: statusGetOrder, data: orders, pagination: paginationOrder, error: errorGetOrder } = useHttp(getByFilter, false)
    const [orderList, setOrderList] = useState([]);

    const [pagination, setPagination] = useState({
        _limit: 10,
        _total: 10,
        _page: 1,
    });
    const location = useLocation()
    console.log(location)
    const queryParams = queryString.parse(location.search)
    const [filters, setFilters] = useState({
        ...queryParams,
        page: Number.parseInt(queryParams.page) || 1,
        limit: Number.parseInt(queryParams.limit) || 5,
        orderStatus: Number.parseInt(queryParams.status) || 'NEW'
        // _sort: queryParams._sort || "salePrice:ASC",
    });
    const [loading, setLoading] = useState(true);
    const handlePageChange = (e, page) => {
        console.log("Thay đổi", page);
        setFilters(preFilters => ({
            ...preFilters,
            page: page,
        }))
    }
    useEffect(() => {
        navigate({
            pathname: location.pathname,
            search: queryString.stringify(filters),
        })
    }, [filters, location.pathname, navigate])
    //Chuyển sang chi tiết đơn hàng
    const handelClickOrder = (id) => {
        navigate(`/admin/orders/${id}`)
    }
    //Cập nhật trạng thái đơn hàng
    const handelChangeStatus = (value) => {
        updateOrderStatus({ id: value.id, status: value.status })
    }
    //Thông báo cập nhật thành công
    useEffect(() => {

        if (statusUpdateStatus === 'completed' && !errorUpdateOrderStatus) {

            toast.success("Đơn hàng đã được xác nhận")

        }
        if (statusUpdateStatus === 'completed' && errorUpdateOrderStatus) {
            // console.log(errorUpdateOrderStatus.message)
            toast.error(errorUpdateOrderStatus)
        }
    }, [statusUpdateStatus, errorUpdateOrderStatus])

    useEffect(() => {

        if (statusUpdateStatus === 'completed' && !errorUpdateOrderStatus) {
            getOrder(filters)
        }

    }, [statusUpdateStatus, errorUpdateOrderStatus, getOrder, filters])

    // useEffect(() => {

    //     if (statusGetOrder === 'completed' && !errorGetOrder) {
    //         setOrderList(orders.data);

    //         setPagination(orders.pagination);


    //     }
    //     if (statusGetOrder === 'completed' && errorGetOrder) {
    //         enqueueSnackbar(errorGetOrder, { variant: "error" })
    //     }
    // }, [statusGetOrder, errorGetOrder, enqueueSnackbar, orders.data, orders.pagination])
    useEffect(() => {
        getOrder(filters)



    }, [filters, getOrder]);
    const handleChange = (event, newValue) => {
        setFilters(prev => ({
            ...prev,
            orderStatus: newValue
        }))

    };
    const handelPrintOrder = (bill_code) => {
        const fetchBillOrder = async () => {
            const productList = await ghtkApi.getAll({ label: bill_code });
            console.log(productList.data.data);
            // let binaryString = window.atob();
            let binaryString = productList.data.data;

            let binaryLen = binaryString.length;

            let bytes = new Uint8Array(binaryLen);

            for (let i = 0; i < binaryLen; i++) {
                let ascii = binaryString[i];
                bytes[i] = ascii;
            }

            var blob = new Blob([bytes], { type: 'application/pdf' });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            // link.download = 'Report_' + new Date() + '.pdf';
            window.open(link);
            // window.print();

        };
        fetchBillOrder().catch((e) => {
            console.log('caught error:', e);
        });
    }
    console.log(orders)
    return (


        <>
            <Grid item xs={12} align="left" justify="center" alignItems="center">
                <Box padding={1}>
                    <TextField id="outlined-search" label="Tìm kiếm" type="search" variant="outlined" size="small" fullWidth />

                </Box>
            </Grid>



            <Grid item xs={12}>
                <Box sx={{ width: '100%' }} marginBottom={1} >
                    <Paper>
                        <Tabs
                            value={filters.orderStatus}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"

                        >
                            {/* <Tab value="" label="Tất cả" /> */}
                            <Tab value="NEW" label="Chưa xác nhận" />
                            <Tab value="IN_PROGRESS" label="Đang xử lí" />
                            <Tab value="PACKAGED" label="Chờ lấy hàng" />
                            <Tab value="PICKED" label="Đang giao " />
                            <Tab value="DELIVERED" label="Đã giao" />
                            <Tab value="CANCEL" label="Đã hủy" />

                        </Tabs>
                    </Paper>
                </Box>

            </Grid>


            <Grid item container xs={12} align="left" style={{ padding: '10px', backgroundColor: '#ccc', marginBottom: '20px', marginLeft: '20px' }}>

                <Grid item xs={4}>
                    <Typography variant="subtitle1">Sản phẩm</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">Tổng đơn hàng</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">Trạng thái</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">Vận chuyển</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">Hành động</Typography>
                </Grid>



            </Grid>
            {statusUpdateStatus === 'pending' && <LoadingCircular />}



            {statusGetOrder === 'pending' && (<LoadingLinear />)}
            {
                statusGetOrder === 'completed' && !errorGetOrder && orders.length === 0 &&

                (
                    <Box style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                    }}>
                        <h3>Không có đơn hàng nào</h3>
                    </Box>

                )


            }
            {
                statusGetOrder === 'completed' && !errorGetOrder && (
                    orders.map((row) => (
                        <OrderItemAdmin key={row._id} item={row} onChangeStatus={handelChangeStatus} onHandelClick={handelClickOrder} onHandelPrintBill={handelPrintOrder} />
                    )
                    )
                )



            }

            {
                statusGetOrder === 'completed' && pagination && (
                    <Box Box className={classes.pagination}>

                        <Pagination color="primary" count={paginationOrder.total_page} page={filters.page}
                            onChange={handlePageChange}
                        ></Pagination>
                    </Box>
                )
            }



            {/*                                       
                                            <TableCell align="left">
                                                <Link to={`${url}/${row.id}`}>
                                                    <IconButton size="small" >
                                                        <VisibilityIcon></VisibilityIcon>
                                                    </IconButton>
                                                </Link>
                                                <IconButton size="small" color="primary">
                                                    <EditIcon ></EditIcon>
                                                </IconButton>
                                                <IconButton size="small" color="secondary">
                                                    <DeleteIcon></DeleteIcon>
                                                </IconButton>
                                            </TableCell>
                                       */}


        </>
    )




}

export default ManageOrdersPage;