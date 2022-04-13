import React from 'react';
import PropTypes from 'prop-types';
import classes from './Timeline.module.css'
import { formatDateAndHour } from 'utils';
TimeLine.propTypes = {

};

function TimeLine({ timelines }) {

    return (
        <div className={classes.wrap}>
            {timelines.length > 0 && timelines.map(time => (
                <div className={classes.timeline}>
                    <div className={classes.gach}></div>
                    <div className={classes.content}>
                        <div className={classes.dot}></div>
                        <div className={classes.date}>{formatDateAndHour(time.createdAt)}</div>
                        <div className={classes.note}>{time.description}</div>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default TimeLine;