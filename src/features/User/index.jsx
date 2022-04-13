// import PrivateRoute from 'components/PrivateRoute';
import { Grid, List } from '@mui/material';
import { makeStyles } from '@mui/styles';
import OrderDetailPage from 'features/Order/pages/OrderDetailPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListMenuItem from './components/ListMenuItem';
import AddressPage from './pages/AddressPage';
import OrderUserPage from './pages/OrderUserPage';
import PasswordChangePage from './pages/PasswordChangePage';
import ProfilePage from './pages/ProfilePage';

const useStyles = makeStyles(theme => (
    {
        name: {
            color: 'gray',
        },

        row: {
            padding: '8px',
            borderBottom: '1px solid #ccc'
        },
        root: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        label: {
            textTransform: 'capitalize',
        },
        right: {
            padding: '8px'
        },
        close: {
            position: 'absolute',
            right: '8px',
            top: '8px',
            color: 'gray',

            zIndex: '10',
        },
    }
))
function UserFeature(props) {
    const classes = useStyles()


    return (


        <Grid container spacing={1}>
            <Grid item xs={4} md={3} textAlign="left">
                <List
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '10px',
                    }}
                >
                    <ListMenuItem />
                </List>
            </Grid>
            <Grid item md={9} className={classes.right}>

                <Routes>
                    <Route path={`address`} element={<AddressPage />} />
                    {/* <PrivateRoute path={`wishlist`} element={<WistListPage />}></PrivateRoute> */}
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="change-password" element={<PasswordChangePage />} />
                    {/* <PrivateRoute path={`order/:orderId/completed`} element={<OrderCompleted />}></PrivateRoute> */}
                    <Route path="order/:orderId" element={<OrderDetailPage />} />
                    {/* <Route path=":orderId" element={<OrderDetailPage />} /> */}
                    <Route path={`order`} element={<OrderUserPage />} />

                    {/* <PrivateRoute path={`order?type=all`} exact element={<OrderListUserPage />}></PrivateRoute> */}

                </Routes>
            </Grid>
        </Grid >


    );

}

export default UserFeature;