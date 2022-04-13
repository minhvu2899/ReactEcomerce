import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Container, Typography, Box, Avatar } from '@mui/material';
import ProductReviewItem from './ProductReviewItem';

ProductReViews.propTypes = {

};

function ProductReViews({ comments }) {
    return (
        <Paper elevation={3} sx={{ m: 4, p: 1 }}>

            <Box padding={1}>
                <Typography variant="h6" color="text.primary" align="left">
                    Đánh giá sản phẩm
                </Typography>
            </Box>
            <Box padding={3}>
                {comments.length > 0 && comments.map(item => (
                    < ProductReviewItem comment={item} key={item.id} />
                ))}
                {comments.length === 0 && (
                    <Typography variant="subtitle2" color="text.primary" align="left">
                        Chưa có đánh giá
                    </Typography>
                )}
                {/* <ProductReviewItem /> */}

            </Box>


        </Paper>
    );
}

export default ProductReViews;

