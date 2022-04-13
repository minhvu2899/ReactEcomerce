import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@mui/material';
import { makeStyles } from '@mui/styles';
ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};
const useStyles = makeStyles(theme => (
    {
        root: {
            backgroundColor: '#ff8e5354'
        }
    }
))
function ProductSort({ currentSort, onChange }) {
    console.log(currentSort)
    const handleSortChange = (event, newValue) => {
        if (onChange) onChange(newValue);
    }
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Tabs value={currentSort}
                onChange={handleSortChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="standard"
                aria-label="full width tabs example">
                <Tab label="Bán chạy" value="top_seller"></Tab>
                <Tab label="Hàng mới" value="newest"></Tab>
                <Tab label="Giá từ thấp đến cao" value="price:ASC"></Tab>
                <Tab label="Giá từ cao xuống thấp" value="price:DESC"></Tab>

            </Tabs>
            {/* <FiltersSort /> */}
        </div>
    );
}

export default ProductSort;