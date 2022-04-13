import React from 'react';
import { Grid, Typography, Box, Container, Avatar } from '@mui/material';
import WistListItem from './../components/WistListItem';
import wistListApi from 'api/wishListApi';
import useHttp from 'hooks/use-http';
import { useEffect } from 'react';
// import ChatBox from '../components/ChatBox';
function WistListPage(props) {
    const { getAll, remove } = wistListApi;
    const { sendRequest: getAllWishList, status: statusGetWistList, data: wishlists, error: errorGetWistList } = useHttp(getAll, false)
    const { sendRequest: removeItem, status: statusRemove, error: errorRemove } = useHttp(remove, false)
    useEffect(() => {
        getAllWishList()
    }, [getAllWishList])
    useEffect(() => {
        if (statusGetWistList === 'completed') {

        }
    }, [statusGetWistList, wishlists])
    useEffect(() => {
        if (statusRemove === 'completed' && !errorRemove) {
            getAllWishList()
        }
    }, [statusRemove, getAllWishList, errorRemove])
    const handelRemoveItem = (id) => {
        removeItem(id)
    }
    return (
        <Container>
            <Grid container>
                <Grid item container>
                    <Grid item xs={12}>
                        <Box padding={2}>

                            <Typography variant="h4">Sản phẩm yêu thích</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container>
                    {/* <Grid item xs={12}>
                        <Typography>Sản phẩm yêu thích</Typography>
                    </Grid> */}
                </Grid>

                {statusGetWistList === 'completed' && wishlists.length !== 0 && (
                    <Grid item container align="left" style={{ padding: '8px', backgroundColor: '#ccc' }}>
                        <Grid item xs={6}>
                            <Typography>Sản phẩm</Typography>
                        </Grid>
                        <Grid item xs={3} align="center">
                            <Typography>Giá</Typography>
                        </Grid>
                        <Grid item xs={3} align="center">
                            <Typography>Hành động</Typography>
                        </Grid>
                    </Grid>
                )}
                {statusGetWistList === 'completed' && wishlists.length === 0 && (
                    <Grid item container align="left" style={{ padding: '8px', backgroundColor: '#ccc' }}>
                        <Grid item xs={12}>
                            <Typography>Không có sản phẩm yêu thích nào</Typography>
                        </Grid>

                    </Grid>
                )}
                {statusGetWistList === 'completed' && wishlists.map(w => (
                    <WistListItem key={w.id} item={w} removeItem={handelRemoveItem} />
                ))}

            </Grid>

        </Container>
    );
}

export default WistListPage;