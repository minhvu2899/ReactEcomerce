import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography'
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import PaymentsIcon from '@mui/icons-material/Payments';
import { Grid, MenuItem, Container } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
Footer.propTypes = {

};

function Footer(props) {
    return (
        <Box component="footer" sx={{ py: 5, background: 'linear-gradient(45deg, #FF8E53 30%,#FE6B8B 90%) ', color: 'white' }}>
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item md={3} sm={6} xs={12}>
                        <MenuItem >
                            <Typography textAlign="center">Trang chủ</Typography>
                        </MenuItem>
                        <MenuItem >
                            <Typography textAlign="center">Sản phẩm</Typography>
                        </MenuItem>
                        <MenuItem >
                            <Typography textAlign="center">Khuyến mại</Typography>
                        </MenuItem>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <MenuItem >
                            <Typography textAlign="center">Trang chủ</Typography>
                        </MenuItem>
                        <MenuItem >
                            <Typography textAlign="center">Sản phẩm</Typography>
                        </MenuItem>
                        <MenuItem >
                            <Typography textAlign="center">Khuyến mại</Typography>
                        </MenuItem>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <MenuItem >
                            <Typography textAlign="center">Phương thức thanh toán</Typography>
                        </MenuItem>
                        <MenuItem >
                            <Typography textAlign="center"><PaymentsIcon /></Typography>
                            <Typography textAlign="center" m={1}>Thẻ tín dụng</Typography>
                        </MenuItem>
                        <MenuItem >
                            <Typography textAlign="center"><PaidIcon /></Typography>
                            <Typography textAlign="center" ml={1}> Thanh toán khi giao hàng</Typography>
                        </MenuItem>
                        <MenuItem >
                            <Typography textAlign="center"><AccountBalanceIcon /></Typography>
                            <Typography textAlign="center" ml={1}> Papal</Typography>
                        </MenuItem>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <MenuItem >
                            <Typography textAlign="center">Theo dõi chúng tôi trên</Typography>
                        </MenuItem>
                        <MenuItem >
                            <Typography textAlign="center"><Facebook /> </Typography>
                            <Typography textAlign="center" ml={1}> Facebook</Typography>
                        </MenuItem>
                        <MenuItem >
                            <Typography textAlign="center"><Instagram /></Typography>
                            <Typography textAlign="center" ml={1}> Instagram</Typography>
                        </MenuItem>
                        <MenuItem >
                            <Typography textAlign="center"><Twitter /></Typography>
                            <Typography textAlign="center" ml={1}> Twitter</Typography>
                        </MenuItem>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Footer;