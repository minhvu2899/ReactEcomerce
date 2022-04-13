import { Box, Container, Grid, Paper, Tab, Tabs, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import orderApi from 'api/orderApi';
import statisticApi from 'api/statisticApi';
import { addDays, subDays } from 'date-fns';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis
} from "recharts";
import { formatDate1 } from 'utils';
import ReportByCustomer from './ReportByCustomer';
import ReportByProduct from './ReportByProduct';
ManageStatiticByOrderPage.propTypes = {

};

function ManageStatiticByOrderPage(props) {
    const [loading, setLoading] = useState(null);
    const [value, setValue] = React.useState(0)
    const [type, setType] = React.useState(0)
    const [dataReport, setDataReport] = React.useState([])
    const [date_start, setDateStart] = React.useState(new Date());
    const [date_end, setDateEnd] = React.useState(new Date());
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
            const date_start = formatDate1(subDays(new Date(), 1))
            const date_end = formatDate1(subDays(new Date(), 0))
            setDateStart(date_start)
            setDateEnd(date_end)


        }
        if (newValue === 1) {
            const date_start = formatDate1(subDays(new Date(), 6))
            const date_end = formatDate1(subDays(new Date(), 1))
            setDateStart(date_start)
            setDateEnd(date_end)

        }
        if (newValue === 2) {
            const date_start = formatDate1(subDays(new Date(), 29))
            const date_end = formatDate1(addDays(new Date(), 1))
            setDateStart(date_start)
            setDateEnd(date_end)
        }
        console.log(value)

    };
    const handleTypeChange = (event, newValue) => {
        setType(newValue);
        setValue(0)
        console.log(value)

    };
    // const date = subMonths(new Date(), 1);
    // date.setDate(1);
    // alert(formatDate(date));
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        navigate({
            pathname: location.pathname,
            search: queryString.stringify({ type, value }),
        })
    }, [type, value, navigate, location.pathname])
    useEffect(() => {
        (async () => {
            try {
                if (type === 0) {

                    const { data } = await statisticApi.getReportPeriod({ date_start, date_end })
                    setDataReport(data.stats)


                }
                else if (type === 2) {

                    const { data } = await orderApi.getReportByCustomer({ date_start: formatDate1(date_start), date_end: formatDate1(addDays(date_end, 1)) })
                    setDataReport(data)




                }
                else if (type === 1) {


                    const { data } = await orderApi.getReportByProduct({ date_start, date_end })
                    setDataReport(data.stats)






                }



            }


            catch (e) {
                alert(e.message)
            }
        })()
    }, [value, date_start, date_end, type])
    console.log(dataReport)
    return (
        <Container>
            <Grid container>
                <Grid item container xs={12}>
                    <Typography variant="h6">Thống kê bán hàng </Typography>
                </Grid>
                <Grid item container xs={12}>
                    <Box sx={{ width: '100%' }} marginBottom={1} >
                        <Paper>
                            <Tabs
                                value={type}
                                onChange={handleTypeChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                            >
                                <Tab value={0} label="Theo khách hàng" />


                                <Tab value={1} label="Theo sản phẩm" />



                            </Tabs>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item container xs={12}>
                    <Box sx={{ width: '100%' }} marginBottom={1} >
                        <Paper>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                            >
                                <Tab value={0} label="Hôm qua" />


                                <Tab value={1} label="7 ngày trước" />
                                <Tab value={2} label="30 ngày trước" />
                                <Tab value={3} label="Từ ngày... đến ..." />

                            </Tabs>
                        </Paper>
                    </Box>
                </Grid>
                {value === 3 && (
                    <Grid item container xs={12}>
                        <Paper>

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Thời gian bắt đầu"
                                    value={date_start}
                                    onChange={(newValue) => {
                                        setDateStart(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Thời gian kết thúc"
                                    value={date_end}
                                    onChange={(newValue) => {
                                        setDateEnd(newValue);
                                    }}

                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Paper>
                    </Grid>
                )}

                <Grid item container xs={12}>
                    <Paper style={{ width: '100%' }}>
                        {type === 0 && <ReportByCustomer data={dataReport} />}
                        {type === 1 && <ReportByProduct data={dataReport} />}
                        {type === 0 && (<><h3>Biểu đồ thống kê bán hàng theo đơn hàng</h3>
                            <BarChart width={900} height={300} data={dataReport} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="order_date" />
                                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" name="Tổng" />
                                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" name="Tổng đơn hàng" />
                                <Tooltip />
                                <Legend verticalAlign="top" />
                                <Bar yAxisId="left" dataKey="sumIncome" fill="#8884d8" name="Tổng doanh thu" />
                                <Bar yAxisId="left" dataKey="sumCost" fill="#82ca9d" name="Tổng chi phí" />
                                <Bar yAxisId="right" dataKey="numOrders" fill="#7a4f01" name="Tổng đơn hàng" />
                            </BarChart></>)}

                    </Paper>
                    {/* <Chart
                        width="100%"
                        height={'500px'}
                        chartType="Bar"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Ngày', 'Doanh thu', 'Lợi nhuận', 'Tổng đơn hàng'],
                            ...dataReport

                        ]}
                        options={{
                            // Material design options
                            chart: {
                                title: 'Biểu đồ doanh thu',
                                subtitle: 'Theo lợi nhuận chi phí theo đơn hàng',
                            },

                            series: {
                                0: { axis: 0, targetAxisIndex: 0 }, // Bind series 0 to an axis named 'distance'.
                                1: { axis: 0, targetAxisIndex: 0 }, // Bind series 1 to an axis named 'brightness'.
                                2: { axis: 1, targetAxisIndex: 1 } // Bind series 1 to an axis named 'brightness'.
                            },
                            axes: {
                                y: {
                                    0: { label: 'Tổng tiền' }, // Left y-axis.
                                    1: { side: 'right', label: 'Tổng đơn hàng' } // Right y-axis.
                                }
                            }
                        }}
                        // For tests
                        rootProps={{ 'data-testid': '1' }}
                    /> */}
                </Grid>
            </Grid>
        </Container>
    );
}

export default ManageStatiticByOrderPage;