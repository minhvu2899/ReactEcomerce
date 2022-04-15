import LoadingLinear from 'components/LoadingLinear';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductDescription from '../components/ProductDescription';
import { ProductDetail } from '../components/ProductDetail';
import ProductAdditional from './../components/ProductAdditional';
import ProductRelated from './../components/ProductRelated';
import ProductReViews from './../components/ProductReViews';
import useProductDetail from './../hooks/useProductDetail';
import { addToCart } from 'features/Cart/cartSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify'
import { useState } from 'react';

export const ProductDetailPage = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const [loadingAdd, setLoadingAdd] = useState(false)
    const { productDetail, loading } = useProductDetail(slug);
    const { _id } = useSelector(state => state.user.current)
    const handelSubmitAddToCart = async (values) => {

        try {
            setLoadingAdd(true)
            const result = await dispatch(addToCart({ quantity: values.quantity, product: productDetail._id, user: _id }))
            unwrapResult(result)
            toast.success('Thêm vào giỏ hàng thành công')
        }
        catch (err) {
            toast.error('Có lỗi vui lòng thử lại sau');
        }
        setLoadingAdd(false)
    }


    return (
        <>
            {loading ? (<LoadingLinear />) : (
                <>
                    <ProductDetail onSubmit={handelSubmitAddToCart} product={productDetail} loading={loadingAdd} />
                    <ProductRelated slug={slug} />
                    <ProductAdditional />
                    <ProductDescription description={productDetail.description} />
                    <ProductReViews comments={productDetail.reviews} />
                </>
            )
            }
        </>
    )
}
