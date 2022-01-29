import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import TodayBookings from './TodayBookings';
import Waitlist from './Waitlist';
import Paused from './Paused';
import NoShow from './NoShow';
import CheckedOut from './CheckedOut';
import Queue from './Queue';

function TabContainer(props) {
    const { children } = props;
    return (
        <Typography component="div" style={{ padding: 8 * 3, paddingTop: 0 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    popover: {
        padding: 20,
        background: '#f5f5f5',
        '& .MuiTypography-body1': {
            fontSize: 12
        }
    },
    wrapper: {
        fontFamily: theme.typography.fontFamily,
        position: 'relative',
        marginLeft: theme.spacing(1),
        borderRadius: theme.spacing(1),
        display: 'inline-block',
        background: fade(theme.palette.text.primary, 0.05),
        '& $miniInput': {
            width: 70
        },
    },
    searchWrapper: {
        [theme.breakpoints.down('sm')]: {
            flex: 1,
            textAlign: 'right'
        }
    },
    search: {
        width: theme.spacing(6),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
            fill: theme.palette.grey[400]
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    },
    textField: {
        marginRight: theme.spacing(2)
    },
    button: {
        marginLeft: theme.spacing(1),
    },
    blueButton: {
        background: 'cornflowerblue',
        marginLeft: theme.spacing(1),
        '&:hover': {
            background: 'cornflowerblue',
        }
    },
    datePicker: {
        marginLeft: 8,
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #bdbdbd',
        background: '#fff',
        borderRadius: 10,
        '& .MuiInput-root': {
            border: 'none',
        },
        '& .MuiInput-underline:after': {
            border: 'none',
            boxShadow: 'none'
        },
        '& .MuiIcon-root': {
            cursor: 'pointer'
        }
    }
});

class AppointmentsComponent extends React.Component {
    state = {
        value: 0,
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    async componentDidMount() {
        if (this.props.tabVal) {
            this.setState({ value: this.props.tabVal });
        }
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="secondary"
                    >
                        <Tab label="Today Bookings" />
                        <Tab label="Queue" />
                        <Tab label="Checked Out" />
                        <Tab label="No Show" />
                        <Tab label="Paused Consultations" />
                        <Tab label="Waitlist" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer><TodayBookings /></TabContainer>}
                {value === 1 && <TabContainer><Queue /></TabContainer>}
                {value === 2 && <TabContainer><CheckedOut /></TabContainer>}
                {value === 3 && <TabContainer><NoShow /></TabContainer>}
                {value === 4 && <TabContainer><Paused /></TabContainer>}
                {value === 5 && <TabContainer><Waitlist /></TabContainer>}
            </div>
        );
    }
}

AppointmentsComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppointmentsComponent);
