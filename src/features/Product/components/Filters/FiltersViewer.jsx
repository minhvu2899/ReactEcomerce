import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { formatPrice } from 'utils';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        margin: '8px',
        listStyleType: 'none',
        '& > li': {
            margin: 0,
            padding: '8px'
        }
    }
}))
const FILTERS_LIST = [
    {
        id: 1,
        getLabel: () => 'Giao hàng miễn phí',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => true,
        onToggle: (filters) => {
            const newFilters = { ...filters }
            if (newFilters.isFreeShip) {
                delete newFilters.isFreeShip
            }
            else {
                newFilters.isFreeShip = true
            }
            return newFilters
        },
    },
    {

        id: 2,
        getLabel: () => 'Có khuyến mại',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters }
            delete newFilters.isPromotion
            return newFilters

        },
        onToggle: () => { },
    },
    {
        id: 3,
        getLabel: (filters) => `Giá từ: ${formatPrice(filters.price.split(',')[0])} đến ${formatPrice(filters.price.split(',')[1])}`,
        isActive: (filters) => true,
        isVisible: (filters) => Object.keys(filters).includes('price') && +filters.price.split(',')[0] > 0 && +filters.price.split(',')[1] > 0,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters }
            delete newFilters.price

            return newFilters

        },
        onToggle: () => { },
    },
    {
        id: 4,
        getLabel: (filters) => `Danh mục: ${filters['category_name']}`,
        isActive: (filters) => true,
        isVisible: (filters) => Object.keys(filters).includes('category_name'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters }
            delete newFilters['category_name']
            delete newFilters['category']


            return newFilters

        },
        onToggle: () => { },
    },
    {
        id: 5,
        getLabel: (filters) => filters['subcategory_name'],
        isActive: (filters) => true,
        isVisible: (filters) => Object.keys(filters).includes('subcategory_id'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters }
            delete newFilters['subcategory_id']
            delete newFilters['subcategory_name']

            return newFilters

        },
        onToggle: () => { },
    },
    {
        id: 6,
        getLabel: (filters) => filters['brand_name'],
        isActive: (filters) => true,
        isVisible: (filters) => Object.keys(filters).includes('brand_id'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters }
            delete newFilters['brand_id']
            delete newFilters['brand_name']

            return newFilters

        },
        onToggle: () => { },
    },
    {
        id: 7,
        getLabel: (filters) => `Từ ${filters['ratingsAverage[gte]']} sao trở lên`,
        isActive: (filters) => true,
        isVisible: (filters) => Object.keys(filters).includes('ratingsAverage[gte]'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters }
            delete newFilters['ratingsAverage[gte]']


            return newFilters

        },
        onToggle: () => { },
    },
    {
        id: 8,
        getLabel: (filters) => `Tìm kiếm:${filters['search']}`,
        isActive: (filters) => true,
        isVisible: (filters) => Object.keys(filters).includes('search'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters }
            delete newFilters['search']


            return newFilters

        },
        onToggle: () => { },
    },
]
FiltersViewer.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function FiltersViewer({ filters = {}, onChange = null }) {
    const classes = useStyles()
    const visiableFilters = useMemo(() => {
        return FILTERS_LIST.filter(x => x.isVisible(filters))
    }, [filters])
    return (
        <Box component="ul" className={classes.root}>
            {visiableFilters.map(x => (
                <li key={x.id}>
                    <Chip
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={!x.isRemovable}
                        onClick={
                            x.isRemovable ? null : () => {
                                if (!onChange) return;
                                const newFilters = x.onToggle(filters)
                                onChange(newFilters)
                            }}
                        onDelete={x.isRemovable ? () => {
                            if (!onChange) return;
                            const newFilters = x.onRemove(filters)
                            onChange(newFilters)
                        } : null}

                    />



                </li>
            ))}
        </Box>
    );
}

export default FiltersViewer;