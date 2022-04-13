import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, TableContainer, TableHead, TableRow, TableCell, Table, TableBody, IconButton, Typography, Button, Avatar } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

import { STATIC_HOST } from 'constants/index';
ListRating.propTypes = {

};

function ListRating({ comments, setOpen, onReply }) {
    const handelClickReply = (id) => {
        setOpen(true)
        onReply(id)
    }
    return (
        <Grid container>
            <Grid item xs={12}>
                <TableContainer component={Paper}>

                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Thông tin sản phẩm</TableCell>
                                <TableCell align="left">Đánh giá của khách hàng</TableCell>
                                <TableCell align="left">Trả lời đánh giá</TableCell>

                                <TableCell align="left">Hành đông</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {comments.map(comment => (
                                <>
                                    <TableRow style={{ marginTop: '10px' }} key={comment._id}>
                                        <TableCell align="left" colSpan={3}>
                                            <Box style={{ display: 'flex', alignItems: 'center' }}>
                                                Người mua: {comment.user.name}
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={comment.user.photo}
                                                    sx={{ width: 36, height: 36 }}
                                                />
                                            </Box>

                                        </TableCell>
                                        <TableCell align="center">ID đơn hàng</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>

                                            <Avatar
                                                alt={comment.product.product_name}
                                                src={`${STATIC_HOST}/products/${comment.product.imageCover}`}
                                                sx={{ width: 100, height: 100, mr: 1, mb: 2 }}
                                                variant="rounded"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box component="fieldset" mb={3} borderColor="transparent">
                                                <Rating name="read-only" value={comment.rating} readOnly />
                                                <Typography component="legend">{comment.review}</Typography>
                                            </Box>

                                        </TableCell>
                                        <TableCell>
                                            {comment.reply.userReply ? comment.reply.replyReview : (
                                                <Button onClick={() => handelClickReply(comment._id)}>
                                                    Trả lời
                                                    <IconButton >
                                                        <ReplyIcon></ReplyIcon>
                                                    </IconButton>
                                                </Button>
                                            )}
                                        </TableCell>
                                        <TableCell align="left">

                                            <IconButton >
                                                <DeleteIcon></DeleteIcon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </>
                            ))}



                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid >
    );
}

export default ListRating;