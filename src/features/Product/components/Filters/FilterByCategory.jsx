import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import categoryApi from 'api/categoryApi';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { withStyles } from '@mui/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { makeStyles } from '@mui/styles';

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        width: '100%',
        boxSizing: 'border-box',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgb(238 234 227)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: '8px',
        width: '100%',
    },
}))(MuiAccordionDetails);

const useStyles = makeStyles(theme => ({
    root: {
        padding: '16px',
        // width: '100%',
        // backgroundColor: '#ffdac6',
    },
    title: {

        borderBottom: '3px solid #e97b59',
        marginBottom: '16px',
        color: '#252a2b'
    },


}))
FilteByCategory.propTypes = {
    onChange: PropTypes.func,
};

function FilteByCategory({ onChange }) {
    const [categoryList, setCategoryList] = useState([])
    const [loading, setLoading] = useState(null)
    const classes = useStyles()
    useEffect(() => {
        (async () => {
            setLoading(true)
            try {

                const list = await categoryApi.getAll()

                setCategoryList(list.data.data.data)
                setLoading(false)

            } catch (error) {
                setLoading(false)

            }
        })()
    }, [])
    const handleCategoryClick = (category) => {

        if (onChange) {
            onChange(category, null)

        }
    }
    const handleSubCategoryClick = (category, sub) => {
        if (onChange) {
            onChange(category, sub)

        }
    }
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (

        <Box className={classes.root}>
            <Typography variant="h6" align="left" className={classes.title}>DANH MỤC</Typography>

            {/* <List component="nav" className={classes.menu} aria-label="mailbox folders">
                {categoryList.map(category => (
                    <>
                        <ListItem button key={category.id} onClick={() => handleCategoryClick(category)}>
                            <ListItemText primary={category.name} />
                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List> */}

            <Paper sx={{ maxWidth: '100%' }}>
                <MenuList>
                    {!loading && categoryList.map((category, idx) => (
                        <MenuItem key={category._id} onClick={() => handleCategoryClick(category)}>

                            <ListItemText align="left">{category.name}</ListItemText>

                        </MenuItem>
                    ))}

                </MenuList>
            </Paper>

            {/* <Accordion key={category._id} square expanded={expanded === idx} onChange={handleChange(idx)} onClick={() => handleCategoryClick(category)} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>{category.name}</Typography>
                </AccordionSummary>
                <AccordionDetails> */}
            {/* <ul className={classes.menu}>
                                {!loading && category.subcategory?.length > 0 && category.subcategory.map(sub => (
                                    <li key={sub.id} onClick={() => handleSubCategoryClick(category, sub)} >
                                        <Typography variant="body2">{sub.name}</Typography>
                                    </li>
                                ))}
                                {category.subcategory.length === 0 && (
                                    <li key={category.id} onClick={() => handleCategoryClick(category)} >
                                        <Typography variant="body2">{category.name}</Typography>
                                    </li>
                                )}
                            </ul> */}
            {/* </AccordionDetails>
            </Accordion >
        </> */}
            {/* )) */}



        </Box >
    );
}

export default FilteByCategory;