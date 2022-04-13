import { Pagination, Paper, Typography, Box } from '@mui/material';
import productApi from 'api/productApi';
import LoadingLinear from 'components/LoadingLinear';
import ProductList from 'features/Product/components/ProductList';
import useHttp from 'hooks/use-http';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ListPageSkeleton from './ListPageSkeleton';
const style = {
    display: 'flex',
    flexFlow: "row nowrap",
    marginTop: "20px",
    paddingBottom: "10px",
    justifyContent: "center",
}
const ProductRelated = ({ slug }) => {
    const { getProductRelated } = productApi;
    const { sendRequest, status, data, error, pagination } = useHttp(getProductRelated, true);
    const [filters, setFilters] = useState({
        limit: 4, page: 1, slug
    })
    useEffect(() => {
        sendRequest(filters)
    }, [sendRequest, filters])
    const handlePageChange = (e, p) => {
        setFilters(preFilters => ({
            ...preFilters,
            page: p,
        }))
    }
    return (

        <Paper sx={{ m: 4, p: 1 }}>
            <Typography variant="h5" align="left">Sản phẩm tương tự</Typography>
            {status === 'pending' && <ListPageSkeleton length={4} count={4} />}
            {status === 'completed' && !error && (
                <>
                    <ProductList data={data} count={4} />
                    <Box sx={style}>

                        <Pagination color="primary" count={pagination.total_page} page={filters.page}
                            onChange={handlePageChange}
                        ></Pagination>

                    </Box>
                </>
            )}

        </Paper>
    )
}

export default ProductRelated