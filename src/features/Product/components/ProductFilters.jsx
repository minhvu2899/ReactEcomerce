import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import FilterByCategory from './Filters/FilterByCategory'
import FilterByPrice from './Filters/FilterByPrice'
import FilterByService from './Filters/FilterByService'
import FilterByBrand from './Filters/FilterByBrand';
import FilterByRating from './Filters/FilterByRating';
ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func
};

function ProductFilters({ filters, onChange, brands }) {

    const handleCategoryChange = (newCategory, newSubCategory) => {
        if (!onChange) return;
        const newFilters = {
            ...filters,
            "category": newCategory._id,
            "category_name": newCategory.name,
            // "subcategory_id": newSubCategory?._id,
            // "subcategory_name": newSubCategory?.name,


        }
        onChange(newFilters)
    }
    const handleBrandChange = (newBrandID) => {
        if (!onChange) return;
        const newFilters = {
            ...filters,
            "brand_id": newBrandID.id,
            "brand_name": newBrandID.name,

        }
        onChange(newFilters)
    }
    const handleRatingChange = (rating) => {
        if (!onChange) return;
        const newFilters = {
            ...filters,
            'ratingsAverage[gte]': rating.rate

        }
        onChange(newFilters)
    }
    const handleChange = (values) => {
        if (onChange) {
            onChange(values)
        }
    }

    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice onChange={handleChange} />
            <FilterByService filters={filters} onChange={handleChange} />
            {/* <FilterByBrand filters={filters} onChange={handleBrandChange} brands={brands} /> */}
            <FilterByRating onChange={handleRatingChange} />
        </Box>
    );
}

export default ProductFilters;