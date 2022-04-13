import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid } from '@mui/material';
import ReportDetailByCustomer from './ReportDetailByCustomer';
import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import orderApi from 'api/orderApi';
DetailStatiticByCustomerPage.propTypes = {

};

function DetailStatiticByCustomerPage(props) {
    const location = useLocation();
    const history = useNavigate();
    const match = useMatch();
    const { id } = match.params;
    console.log(match);
    const { date_start, date_end, type, value } = location.state;

    const [report, setReport] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await orderApi.reportCustomerById({ date_start, date_end, id });
                setReport(data);
            } catch (error) {
                console.log('Failed to fetch product', error);
            }
        })();
    }, [date_start, date_end, id]);
    return (
        <Container>
            <Grid container>
                <Grid item container>
                    <Grid item xs={12}>
                        <ReportDetailByCustomer data={report} type={type} value={value} />


                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default DetailStatiticByCustomerPage;