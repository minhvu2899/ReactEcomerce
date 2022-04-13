import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { Paper, Typography } from '@mui/material';
import { unEscape } from 'utils';


function ProductDescription({ description }) {

    const safeDescription = DOMPurify.sanitize(unEscape(description));
    return (
        <Paper elevation={0} sx={{ m: 4, p: 1 }}>
            <Typography variant="h6" align="left" >Thông tin mô tả</Typography>
            <div dangerouslySetInnerHTML={{ __html: safeDescription }}></div>
            {/* {product.full_description} */}
        </Paper >
    )
}

export default ProductDescription;