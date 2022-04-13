import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductList from 'features/Product/components/ProductList';
import { ProductDetailPage } from './pages/ProductDetailPage';
import ProductListPage from './pages/ProductListPage';
const ProductFeature = () => {
    return (
        <Routes>
            <Route path=':slug' element={<ProductDetailPage />} />
            <Route path='/' element={<ProductListPage />} />
        </Routes>
    )
}
export default ProductFeature
