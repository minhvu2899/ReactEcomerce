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

export const ProductDetailPage = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { productDetail, loading } = useProductDetail(slug);
    const { _id } = useSelector(state => state.user.current)
    const handelSubmitAddToCart = async (values) => {

        try {
            const result = await dispatch(addToCart({ quantity: values.quantity, product: productDetail._id, user: _id }))
            unwrapResult(result)
            toast.success('Thêm vào giỏ hàng thành công')
        }
        catch (err) {
            toast.error('Có lỗi vui lòng thử lại sau');
        }

    }


    return (
        <>
            {loading ? (<LoadingLinear />) : (
                <>
                    <ProductDetail onSubmit={handelSubmitAddToCart} product={productDetail} />
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
