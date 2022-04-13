import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Grid, Paper, Box, Typography, Chip, Divider, Container } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { Alert } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
// import Chart from "react-google-charts";
import FeaturedInfo from './../FeaturedInfo';
import { formatPrice } from 'utils';
import CategoryChart from './../CategoryChart';
import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    YAxis,
    Legend,
    PieChart,
    Pie,
    Label
} from "recharts";
DashBoadPage.propTypes = {

};
const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    title: {
        color: 'white',
        fontWeight: 'bold'
    },
    paper: {
        cursor: 'pointer',
        backgroundColor: `rgb(30, 136, 229)`,

    },
    quantity: {
        color: '#fe7f6a',
        fontWeight: '600',
        fontSize: '45px'
    }
}))
function DashBoadPage(props) {
    const classes = useStyles();

    return (
        <Container>
            <Grid container>
                <Grid item container >
                    <Grid item xs={12}>

                        <FeaturedInfo />
                    </Grid>
                </Grid>
                {/* <Grid item container spacing={2} padding={1}>
                    {/* <Grid item md={6} >
                        <Grid item container spacing={1}>
                            <Grid item md={6} >
                                <Paper >
                                    <Box padding={1} align="left" className={classes.paper}>
                                        <Box>
                                            <Typography variant="h4" className={classes.title}>Doanh thu</Typography>
                                            <Typography className={classes.quantity}>100</Typography>
                                        </Box>

                                        <Box padding={1} align="left" className={classes.card}>
                                            <Chip
                                                size="small"
                                                color="primary"
                                                label="Trong tuần"

                                            />
                                            <Avatar>

                                                <AccountBalanceIcon />
                                            </Avatar>
                                        </Box>
                                    </Box>


                                </Paper>
                            </Grid>
                            <Grid item md={6} >
                                <Paper>
                                    <Box padding={1} align="left" className={classes.paper}>
                                        <Box>
                                            <Typography variant="h4" className={classes.title}>Tổng đơn hàng</Typography>
                                            <Typography className={classes.quantity}>100</Typography>
                                        </Box>

                                        <Box padding={1} align="right" className={classes.card}>
                                            <Chip
                                                size="small"
                                                color="primary"
                                                label="Trong tuần"

                                            />
                                            <Avatar></Avatar>
                                        </Box>
                                    </Box>


                                </Paper>
                            </Grid>
                        </Grid>

                    </Grid> */}
                {/* <Grid item md={3} >
                    <Paper>
                        <Box padding={1} align="left" className={classes.card}>
                            <Box>
                                <Typography variant="subtitle1">Chờ xác nhận</Typography>
                                <Typography className={classes.quantity}>100</Typography>
                            </Box>

                            <Box padding={1} align="right">
                                <Avatar></Avatar>
                            </Box>
                        </Box>


                    </Paper>
                </Grid>
                <Grid item md={3} >
                    <Paper>
                        <Box padding={1} align="left" className={classes.card}>
                            <Box>
                                <Typography variant="subtitle1">Chờ lấy hàng</Typography>
                                <Typography className={classes.quantity}>100</Typography>
                            </Box>

                            <Box padding={1} align="right">
                                <Avatar></Avatar>
                            </Box>
                        </Box>


                    </Paper>


                </Grid>

                <Grid item md={3} >
                    <Paper>
                        <Box padding={1} align="left" className={classes.card}>
                            <Box>
                                <Typography variant="subtitle1">Đã xử lý</Typography>
                                <Typography className={classes.quantity}>100</Typography>
                            </Box>

                            <Box padding={1} align="right">
                                <Avatar></Avatar>
                            </Box>
                        </Box>


                    </Paper>

                </Grid>
                <Grid item md={3} >
                    <Paper >
                        <Box padding={1} align="left" className={classes.card}>
                            <Box>
                                <Typography variant="subtitle1">Đơn hủy</Typography>
                                <Typography className={classes.quantity}>100</Typography>
                            </Box>

                            <Box padding={1} align="right">
                                <Avatar></Avatar>
                            </Box>
                        </Box>


                    </Paper>
                </Grid> */}


                {/* </Grid> */}
                <Divider />
                <Grid item container spacing={2}>

                    <Grid item md={8}>
                        <Paper>
                            <h3>Biểu đồ thông kê doanh thu theo tháng năm 2021</h3>
                            <ResponsiveContainer width="100%" aspect={2 / 1}>
                                <LineChart width="100%" height={500} data={[
                                    {
                                        "month": 1,
                                        "income": 100000,

                                    },
                                    {
                                        "month": 2,
                                        "income": 5000000,

                                    },
                                    {
                                        "month": 3,
                                        "income": 3000000,

                                    },
                                    {
                                        "month": 4,
                                        "income": 2000000,

                                    },
                                    {
                                        "month": 5,
                                        "income": 4000000,

                                    },
                                    {
                                        "month": 6,
                                        "income": 6000000,

                                    },
                                    {
                                        "month": 7,
                                        "income": 7000000,

                                    },
                                    {
                                        "month": 8,
                                        "income": 9000000,

                                    },
                                    {
                                        "month": 9,
                                        "income": 5000000,

                                    },
                                    {
                                        "month": 10,
                                        "income": 7000000,

                                    },
                                    {
                                        "month": 11,
                                        "income": 10000000,

                                    },
                                    {
                                        "month": 12,
                                        "income": 11410000,

                                    },

                                ]}
                                    margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
                                    padding={{ top: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month">
                                        <Label
                                            angle={360}
                                            position="bottom"
                                            style={{
                                                textAnchor: 'middle',
                                                fill: '#000'
                                            }}
                                        >
                                            Tháng
                                        </Label>
                                    </XAxis>
                                    <YAxis>
                                        <Label
                                            angle={360}
                                            position="top"
                                            style={{
                                                textAnchor: 'middle',
                                                fill: '#000'
                                            }}
                                        >
                                            Tổng doanh thu(đồng)
                                        </Label>
                                    </YAxis>
                                    <Tooltip />
                                    <Legend verticalAlign='top' />
                                    <Line name="Doanh thu" type="monotone" dataKey="income" stroke="#8884d8" strokeWidth="2" dot={false} />

                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                    <Grid item md={4} >
                        <Paper>
                            <h3>Biểu đồ thông kê danh mục sản phẩm</h3>
                            <CategoryChart />
                            {/* <Chart
                                width="100%"
                                height={'300px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Danh mục', 'Số lượng sản phẩm'],
                                    ['Thời trang nam', 11],
                                    ['Thời trang nữ', 2],
                                    ['Phụ kiện thời trang', 2],
                                    ['Túi sách', 2],
                                    ['Ví', 7],
                                ]}
                                options={{
                                    title: 'Danh mục sản phẩm',
                                }}

                            /> */}

                        </Paper>

                    </Grid>

                    <Grid item container spacing={2}>
                        <Grid item md={8}>
                            <Paper>
                                <h3>Top 5 sản phẩm bán chạy</h3>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">STT</TableCell>
                                                <TableCell align="center">Tên sản phẩm</TableCell>
                                                <TableCell align="center">Số lượng bán</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="left">1</TableCell>
                                                <TableCell align="center" >
                                                    <Typography>Áo Nỉ Trơn Dài Tay Cổ Tròn Nam Nữ Unisex Kiểu Dáng Basic Bo Gấu Thời Trang Zenko TOP NAM 1000206V1</Typography>
                                                </TableCell>
                                                <TableCell align="center">7</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left">2</TableCell>
                                                <TableCell align="center">Áo Nỉ Trơn Dài Tay Cổ Tròn Nam Nữ Unisex Kiểu Dáng Basic Bo Gấu Thời Trang Zenko TOP NAM 1000206V1</TableCell>
                                                <TableCell align="center">7</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left">4</TableCell>
                                                <TableCell align="center">Áo Nỉ Trơn Dài Tay Cổ Tròn Nam Nữ Unisex Kiểu Dáng Basic Bo Gấu Thời Trang Zenko TOP NAM 1000206V1</TableCell>
                                                <TableCell align="center">7</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left">3</TableCell>
                                                <TableCell align="center">Áo Nỉ Trơn Dài Tay Cổ Tròn Nam Nữ Unisex Kiểu Dáng Basic Bo Gấu Thời Trang Zenko TOP NAM 1000206V1</TableCell>
                                                <TableCell align="center">7</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left">4</TableCell>
                                                <TableCell align="center">Áo Nỉ Trơn Dài Tay Cổ Tròn Nam Nữ Unisex Kiểu Dáng Basic Bo Gấu Thời Trang Zenko TOP NAM 1000206V1</TableCell>
                                                <TableCell align="center">7</TableCell>
                                            </TableRow>
                                            {/* {rows.map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell>
                                            </TableRow>
                                        ))} */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                        <Grid item md={4}>
                            <Paper>
                                <h3>Sản phẩm mới nhất</h3>
                                <Box style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
                                    <img src="https://source.unsplash.com/random" style={{ width: '50px', height: '50px', display: 'block', objectFit: 'cover' }}>
                                    </img>
                                    <Box padding={1}>
                                        <Typography variant="h6" noWrap>Áo Nỉ Trơn Dài Tay Mới </Typography>
                                        <Typography align="left">{formatPrice(100000)}</Typography>

                                    </Box>
                                </Box>
                                <Box style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
                                    <img src="https://source.unsplash.com/random" style={{ width: '50px', height: '50px', display: 'block', objectFit: 'cover' }}>
                                    </img>
                                    <Box padding={1}>
                                        <Typography variant="h6" noWrap>Áo Nỉ Trơn Dài Tay Mới </Typography>
                                        <Typography align="left">{formatPrice(100000)}</Typography>

                                    </Box>
                                </Box>
                                <Box style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
                                    <img src="https://source.unsplash.com/random" style={{ width: '50px', height: '50px', display: 'block', objectFit: 'cover' }}>
                                    </img>
                                    <Box padding={1}>
                                        <Typography variant="h6" noWrap>Áo Nỉ Trơn Dài Tay Mới </Typography>
                                        <Typography align="left">{formatPrice(100000)}</Typography>

                                    </Box>
                                </Box>
                                <Box style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
                                    <img src="https://source.unsplash.com/random" style={{ width: '50px', height: '50px', display: 'block', objectFit: 'cover' }}>
                                    </img>
                                    <Box padding={1}>
                                        <Typography variant="h6" noWrap>Áo Nỉ Trơn Dài Tay Mới </Typography>
                                        <Typography align="left">{formatPrice(100000)}</Typography>

                                    </Box>
                                </Box>
                                <Box style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
                                    <img src="https://source.unsplash.com/random" style={{ width: '50px', height: '50px', display: 'block', objectFit: 'cover' }}>
                                    </img>
                                    <Box padding={1}>
                                        <Typography variant="h6" noWrap>Áo Nỉ Trơn Dài Tay Mới </Typography>
                                        <Typography align="left">{formatPrice(100000)}</Typography>

                                    </Box>
                                </Box>

                            </Paper>
                        </Grid>
                    </Grid>
                </Grid >




            </Grid >

            {/* </Grid> */}
        </Container >
    );
}

export default DashBoadPage;