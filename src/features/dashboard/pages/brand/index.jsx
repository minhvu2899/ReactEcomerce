import React from 'react';
import PropTypes from 'prop-types';
import { Route, useMatch } from 'react-router';
import { Box } from '@mui/material';
import ListBrandPage from './ListBrandPage';
import { Switch } from 'react-router-dom';
import BrandCreatePage from './BrandCreatePage';

ManageBrandsPage.propTypes = {

};

function ManageBrandsPage(props) {
    const match = useMatch();
    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.url} exact component={ListBrandPage}></Route>
                <Route path={`${match.url}/create`} exact component={BrandCreatePage}></Route>
                <Route path={`${match.url}/:id/edit`} exact component={BrandCreatePage}></Route>


            </Switch>
        </Box>
    );
}

export default ManageBrandsPage;