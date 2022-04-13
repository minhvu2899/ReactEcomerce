import { Box, Grid, Pagination, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import productApi from 'api/productApi';
import { } from 'features/Cart/cartSlice';
import useHttp from 'hooks/use-http';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import FiltersViewer from '../components/Filters/FiltersViewer';
import ListPageSkeleton from '../components/ListPageSkeleton';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSort from '../components/ProductSort';
import { toast } from 'react-toastify';
const useStyles = makeStyles(theme => ({
    root: {

    },
    left: {
        width: '250px',

    },
    right: {
        flex: '1 1 0',
    },
    pagination: {
        display: 'flex',
        flexFlow: "row nowrap",
        marginTop: "20px",
        paddingBottom: "10px",
        justifyContent: "center",

    }
}))
let flag = 0;
function ProductListPage(props) {
    const classes = useStyles();
    const navigate = useNavigate()
    const location = useLocation()

    const pathname = location.pathname;
    const queryParams = queryString.parse(location.search)
    const [brands, setBrands] = useState([])
    const { getAll } = productApi;
    const { sendRequest, status, data: products, error, pagination } = useHttp(getAll, true);
    const [filters, setFilters] = useState({
        ...queryParams,
        page: Number.parseInt(queryParams.page) || 1,
        limit: Number.parseInt(queryParams.limit) || 12,
        sort: queryParams.sort || "price:ASC",
    });

    useEffect(() => {
        const queryObj = { ...filters };
        const excludedFields = ["category_name", "limit", "page"];
        excludedFields.forEach((el) => delete queryObj[el]);
        navigate({
            pathname,
            search: queryString.stringify(queryObj),
        })
    }, [filters, navigate, pathname])
    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }, [location])

    const state = location.state;
    useEffect(() => {
        if (state && state.searchText) {
            setFilters(preFilters => ({
                search: state.searchText,
            }))

        }

    }, [state])
    useEffect(() => {
        if (status === 'completed' && !error && flag === 0) {

            flag = 1;
            // console.log("flag", flag)
            if (filters.search && flag) {
                sendRequest(filters)
            }
        }
    }, [status, error, sendRequest, filters])
    useEffect(() => {
        if (filters.search && flag) {
            sendRequest(filters)
        }
    }, [sendRequest, filters])
    useEffect(() => {
        if (!filters.search) {
            sendRequest(filters)
        }
        // if (filters.search && flag) {
        //     sendRequest(filters)
        // }






        return () => {
            flag = 0;
            // console.log('redender', filters)
        }
    }, [filters, sendRequest])
    console.log("flag", flag)
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             setLoading(true);
    //             // const { data } = await brandApi.getAll();
    //             // console.log(result.data);
    //             // setBrands(data)
    //         } catch (error) {
    //             console.log("Failed to fetch product", error);
    //         }
    //         setLoading(false);
    //     })();
    // }, []);



    const handlePageChange = (e, p) => {
        console.log("Thay đổi", p);
        setFilters(preFilters => ({
            ...preFilters,
            page: p,
        }))

    }
    const handleSortChange = (newValueSort) => {
        setFilters(preFilters => ({
            ...preFilters,
            sort: newValueSort,
        }))
    }
    const handleFiltersChange = (newFilters) => {

        setFilters(preFilters => ({
            ...preFilters,
            ...newFilters,
            page: 1
        }))

    }
    const setNewFilters = (newFilters) => {
        setFilters(newFilters)
    }
    if (error) {
        return <p className='centered focused'>{error}</p>;
    }
    return (


        <Grid container spacing={1}>
            <Grid item md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Paper elevation={0}>
                    <ProductFilters filters={filters} onChange={handleFiltersChange} brands={brands} />
                </Paper>

            </Grid>
            <Grid item md={10} xs={12}>
                <Paper elevation={0}>

                    <ProductSort currentSort={filters.sort} onChange={handleSortChange}></ProductSort>
                    <FiltersViewer filters={filters} onChange={setNewFilters} />
                    {
                        (status === 'pending') && (<ListPageSkeleton count={4} length={12}></ListPageSkeleton>)
                    }
                    {(status === 'completed' && products.length > 0) && (
                        <>
                            <ProductList data={products} count={4} />
                            <Box className={classes.pagination}>

                                <Pagination color="primary" count={pagination.total_page} page={filters.page}
                                    onChange={handlePageChange}
                                ></Pagination>

                            </Box>
                        </>
                    )}
                    {(status === 'completed' && products.length === 0) && (
                        <Grid item xs={12} >
                            <Typography variant="h6" color="text.secondary" sx={{ p: 3 }}>Không có kết quả nào được tìm thấy</Typography>
                        </Grid>
                    )}
                </Paper>
            </Grid>
        </Grid >


    );
}

export default ProductListPage;