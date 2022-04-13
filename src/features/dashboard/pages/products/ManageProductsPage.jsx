import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, FormControlLabel, Grid, IconButton, Switch, TextField, Pagination, Avatar } from '@mui/material';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import productApi from 'api/productApi';
import LoadingLinear from 'components/LoadingLinear';
import { STATIC_HOST } from 'constants/index';
import useHttp from 'hooks/use-http';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatPrice } from 'utils';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    pagination: {
        display: 'flex',
        flexFlow: "row nowrap",
        marginTop: "20px",
        paddingBottom: "10px",
        justifyContent: "center",

    }
});

ManageProductsPage.propTypes = {

};


function ManageProductsPage(props) {
    const classes = useStyles();
    const navigate = useNavigate()

    const location = useLocation()
    const queryParams = queryString.parse(location.search)
    const [checked, setChecked] = React.useState({});
    const [filters, setFilters] = useState({
        ...queryParams,
        page: Number.parseInt(queryParams.page) || 1,
        limit: Number.parseInt(queryParams.limit) || 5,
        // _sort: queryParams._sort || "salePrice:ASC",
    });
    const [textSearch, setTextSearch] = useState('');

    const [loading, setLoading] = useState(true);
    const { update, getAll } = productApi;
    const { sendRequest: updateProductActive, status: statusUpdateActive, error: errorUpdateActive } = useHttp(update, true);
    const { sendRequest: getProduct, status: statusGet, error: errorGet, data: productList, pagination } = useHttp(getAll, true);

    useEffect(() => {
        getProduct(filters);
    }, [getProduct, filters])

    useEffect(() => {
        navigate({
            pathname: location.pathname,
            search: queryString.stringify(filters),
        })
    }, [filters, location.pathname, navigate])
    const handelProductEditClick = (id) => {
        navigate(`${id}/edit`)
    }
    const handelAddClick = (id) => {
        navigate(`create`)
    }


    const handlePageChange = (e, page) => {
        console.log("Thay đổi", page);
        setFilters(preFilters => ({
            ...preFilters,
            page,
        }))
    }
    const handelSearchChange = (e) => {
        setTextSearch(e.target.value)
    }
    const handelSearchSubmit = () => {
        setFilters(preFilters => ({
            ...preFilters,
            _search: textSearch,
        }))
    }



    const toggleChecked = (event) => {
        console.log(event)
        updateProductActive({ id: event.target.name, isActive: event.target.checked })

        console.log(checked)
    };
    return (
        <Container style={{ maxWidth: '100%' }}>
            {statusGet === 'pending' && <LoadingLinear />}
            {statusGet === 'completed' && !errorGet && (
                <Grid container >
                    <Grid item container spacing={2}>
                        <Grid item xs={6} align="left" justify="center" alignItems="center">
                            <Box padding={1}>

                                <TextField onChange={handelSearchChange} value={textSearch} id="outlined-search" label="Tìm kiếm" type="search" variant="outlined" size="small" fullWidth onKeyPress={(ev) => {

                                    if (ev.key === 'Enter') {
                                        handelSearchSubmit()
                                        ev.preventDefault();
                                    }
                                }} />



                            </Box>
                        </Grid>
                        <Grid item xs={6} align="left" justify="center" alignItems="center">
                            <Box padding={1}>

                                <Button onClick={handelAddClick} variant="outlined" color="primary">Thêm sản phẩm</Button>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid item container>
                        <TableContainer component={Paper}>

                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Mã sản phẩm</TableCell>
                                        <TableCell align="left">Tên sản phẩm</TableCell>
                                        <TableCell align="left">Hình ảnh</TableCell>
                                        <TableCell align="left">Giá gốc</TableCell>
                                        <TableCell align="left">Giá bán</TableCell>
                                        <TableCell align="left">Giam gia</TableCell>
                                        <TableCell align="left">Số lượng</TableCell>
                                        <TableCell align="left">Active</TableCell>
                                        <TableCell align="left">Hành đông</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productList.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell align="left">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">
                                                <Avatar
                                                    alt={row.name}
                                                    src={row.imageCover.url}
                                                    sx={{ width: 100, height: 100 }}
                                                    variant="rounded"
                                                />
                                            </TableCell>

                                            <TableCell align="left">{formatPrice(row.priceOriginal)}</TableCell>
                                            <TableCell align="left">{formatPrice(row.priceSale)}</TableCell>

                                            <TableCell align="left">{row.discountPercent}%</TableCell>
                                            <TableCell align="left">{row.countInStock > 0 ? (
                                                <Chip label="Còn hàng" color="success" />

                                            ) : (<Chip label="Hết hàng" color="error" />)}</TableCell>
                                            <TableCell align="left"> <FormControlLabel label=""
                                                control={<Switch size="small" checked={row.isActive} onChange={toggleChecked} />}

                                                name={row.slug}

                                            /></TableCell>

                                            <TableCell align="left">

                                                <IconButton onClick={() => handelProductEditClick(row.slug)}>
                                                    <EditIcon></EditIcon>
                                                </IconButton>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>
                    <Box className={classes.pagination}>

                        <Pagination color="primary" count={pagination.total_page} page={filters.page}
                            onChange={handlePageChange}
                        ></Pagination>

                    </Box>
                </Grid>
            )}
        </Container >
    );
}

export default ManageProductsPage;