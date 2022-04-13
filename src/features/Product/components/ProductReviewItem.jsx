import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Typography, Divider, Rating } from '@mui/material';
import { formatDateAndHour } from 'utils';
import { makeStyles } from '@mui/styles';
ProductReviewItem.propTypes = {

};

function ProductReviewItem({ comment }) {
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            alignItems: 'flex-start'
        },
        content: {
            marginLeft: '8px',
            textAlign: 'left'

        },
        divider: {
            width: '100%',
            marginTop: '8px',
            marginBottom: '16px'
        },
        date: {
            fontSize: '14px',
            color: 'grey',
        },
        reply: {
            marginLeft: '48px',
            padding: '8px',
            backgroundColor: '#f5f5f5'
        },
        replyTitle: {
            color: '#ff5722'
        }
    }))
    const classes = useStyles()

    return (
        <>
            <div className={classes.root}>
                <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80" />
                <Box className={classes.content}>
                    <Typography variant="body1">{comment.user.name}</Typography>
                    <Rating name="read-only" value={comment.rating} readOnly size="small" />
                    <Typography variant="body1" className={classes.date}>Phân loại hàng: demo</Typography>
                    <Typography variant="subtitle1" className={classes.date}>{formatDateAndHour(comment.createdAt)}</Typography>
                    <Typography variant="body1">{comment.review}</Typography>
                </Box>



            </div>
            {comment.reply.userReply && (
                <div className={classes.reply}>

                    <Box className={classes.content}>
                        <Typography variant="body1" className={classes.replyTitle}>Phản Hồi Của Người Bán</Typography>

                        <Typography variant="body1">{comment.reply.replyReview}</Typography>
                        {/* <Typography variant="body1" className={classes.date}>{formatDateAndHour(comment.reply.create_at)}</Typography> */}
                    </Box>
                </div>
            )}
            <Divider className={classes.divider} />
        </>
    );
}

export default ProductReviewItem;