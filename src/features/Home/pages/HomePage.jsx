import React, { useEffect } from 'react';
import ProductList from 'features/Product/components/ProductList'
import productApi from 'api/productApi';
import useHttp from 'hooks/use-http';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from './../components/Slider';
import Container from '@mui/material/Container';
import Category from './../components/Category';
import Banner from '../components/Banner';
import ButtonCustom from 'components/ButtonCustom';
import { useState } from 'react';
import ListPageSkeleton from 'features/Product/components/ListPageSkeleton';
function HomePage(props) {
    const { getAll } = productApi;
    const [listProduct, setListProduct] = useState([])
    const [isExpanded, setIsExpanded] = useState(false)
    const [isEmpty, setEmpty] = useState(false)
    const [filters, setFilters] = useState({
        limit: 20, page: 1, isExpanded: false
    })

    const { sendRequest, status, data: products, error } = useHttp(getAll, true);
    const handleMoreClick = () => {
        setFilters(pre => ({ ...pre, page: pre.page + 1 }))
        setIsExpanded(true)
    }
    useEffect(() => {
        sendRequest(filters)
    }, [sendRequest, filters])
    useEffect(() => {
        if (status === 'completed' && !error) {
            setListProduct(pre => ([...pre, ...products]))
            setIsExpanded(false)
            if (products.length === 0) setEmpty(true)
        }
    }, [status, error, products])
    return (

        <Container maxWidth="xl">
            <Slider />
            <Banner />
            <Category />
            <ProductList data={listProduct} count={5} />
            {isExpanded && (<ListPageSkeleton length={20} count={5} />)}
            {!isEmpty && (
                <Box sx={{ width: 200, p: 1, m: '0 auto' }} component="div" onClick={handleMoreClick}>
                    <ButtonCustom >Xem thêm</ButtonCustom>
                </Box>
            )}


            {/* <ProductList /> */}
        </Container>

    );
}

export default HomePage;