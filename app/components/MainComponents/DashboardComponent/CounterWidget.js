import React from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
        height: 190,
        marginBottom: 6,
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            height: 126,
            marginBottom: -1,
            alignItems: 'flex-end',
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    title: {
        color: theme.palette.common.white,
        fontSize: 14,
        [theme.breakpoints.up('sm')]: {
            fontSize: 16,
        },
        fontWeight: 400
    },
    counter: {
        color: theme.palette.common.white,
        fontSize: 28,
        fontWeight: 500
    },
    counter1: {
        color: theme.palette.common.white,
        fontSize: 38,
        fontWeight: 500
    },
    counterType: {
        color: 'green',
        fontSize: 14,
        fontWeight: 500,
        marginTop: 12,
        marginLeft: 11
    },
    customContent: {
        textAlign: 'right'
    },
    primaryLight: {
        background: theme.palette.primary.light,
        '& $title, $counter': {
            color: theme.palette.primary.main,
        }
    },
    primaryMain: {
        border: `1px solid ${fade(theme.palette.primary.main, 0.7)}`,
        '& $title, $counter': {
            color: theme.palette.primary.main,
        },
        '& svg': {
            color: theme.palette.primary.main,
        },
    },
    primaryDark: {
        background: theme.palette.primary.main,
        '& $title, $counter': {
            color: theme.palette.common.white,
        },
        '& svg': {
            color: theme.palette.primary.light,
        },
    },
    secondaryLight: {
        background: theme.palette.secondary.light,
        '& $title, $counter': {
            color: theme.palette.secondary.main,
        }
    },
    secondaryMain: {
        border: `1px solid #909090`,
        '& $title, $counter': {
            color: '#909090',
        },
        '& svg': {
            color: '#909090',
        },
    },
    secondaryDark: {
        background: theme.palette.secondary.main,
        '& $title, $counter': {
            color: theme.palette.common.white,
        },
        '& svg': {
            color: theme.palette.secondary.light,
        },
    }
});

function CounterWidget(props) {
    const {
        classes,
        color,
        start,
        end,
        duration,
        title,
        children,
        unitBefore,
        unitAfter,
        routeChange
    } = props;

    const bgColor = clr => {
        switch (clr) {
            case 'primary-light':
                return classes.primaryLight;
            case 'primary-dark':
                return classes.primaryDark;
            case 'secondary-light':
                return classes.secondaryLight;
            case 'secondary-main':
                return classes.secondaryMain;
            case 'secondary-dark':
                return classes.secondaryDark;
            default:
                return classes.primaryMain;
        }
    };

    const getTabVal = (title) => {
        if (title == "Total Appointments") {
            return routeChange(0)
        } else if (title == "Total Queue") {
            return routeChange(1)
        } else if (title == "Checked Out") {
            return routeChange(2)
        } else if (title == "Today Earnings") {
            return routeChange(4)
        }
    }

    return (
        <a onClick={() => getTabVal(title)}>
            <Paper className={classNames(classes.root, bgColor(color))}>
                <div>
                    <div style={{ display: 'flex' }}>
                        <Typography variant="h4" className={classes.counter}>
                            {unitBefore}
                            <CountUp start={start} end={end} duration={duration} useEasing />
                            {unitAfter}
                        </Typography>
                        <Typography className={classes.counterType}>
                            <span>• Today</span>
                        </Typography>
                    </div>
                    <Typography className={classes.title} variant="subtitle1">{title}</Typography>
                </div>
                <div className={classes.customContent}>
                    {children}
                </div>
            </Paper>
        </a>
    );
}

CounterWidget.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    unitBefore: PropTypes.string,
    unitAfter: PropTypes.string,
};

CounterWidget.defaultProps = {
    unitBefore: '',
    unitAfter: '',
};

export default withStyles(styles)(CounterWidget);
