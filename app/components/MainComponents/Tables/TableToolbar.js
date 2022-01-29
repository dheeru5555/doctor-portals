import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import CloudDownload from '@material-ui/icons/CloudDownload';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Close from '@material-ui/icons/Close';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import styles from './tableStyle-jss';


const now = new Date();
// const yesterdayBegin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
// const todayNoon = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
const yesterdayBegin = now;
const todayNoon = now;

function TableToolbar(props) {
    const {
        numSelected,
        classes,
        filterText,
        placeholder,
        title,
        onUserInput,
        onDateSelected,
        onSearchFilter,
        onPaymentFilter,
    } = props;

    const [showSearch, setShowSearch] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [anchorEl, setAnchorEl] = useState(null);
    const [value1, onChange] = useState([yesterdayBegin, todayNoon]);
    const [selectedCheck, setSelectedCheck] = useState([]);

    const getNextDate = () => {
        const day = selectedDate.getDate() + 1;
        setSelectedDate();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleDateChange = (date) => {
        onChange(date);
        onDateSelected(date);
    };

    const filterChechked = (event) => {
        let filter = selectedCheck;
        if (event.target.checked) {
            filter = [...filter, event.target.value]
            setSelectedCheck(filter);
        } else {
            let index = filter.indexOf(event.target.value);
            filter.splice(index, 1)
            setSelectedCheck(filter);
        }
        if (filter.length > 0) {
            if (filter.indexOf('paid') >= 0 && filter.indexOf('not_paid') >= 0) {
                onPaymentFilter(null);
            } else if (filter.indexOf('paid') >= 0) {
                onPaymentFilter(1);
            } else if (filter.indexOf('not_paid') >= 0) {
                onPaymentFilter(0);
            }

        } else {
            onPaymentFilter(null)
        }

    }

    const toggleSearch = useCallback(() => {
        setShowSearch(show => !show);
    }, []);

    const handleChange = useCallback((event) => {
        event.persist();
        onSearchFilter(event.target.value);
        onUserInput(event.target.value);
    }, [onUserInput]);

    return (
        <Toolbar
            className={classNames(classes.toolbar, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected}
                        &nbsp;selected
                    </Typography>
                ) : (
                    <Typography variant="h6">{title}</Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actionsToolbar}>
                {numSelected > 0 ? (
                    <div>
                        {title === 'Today Bookings' || title === 'Waitlist' || title === 'No Show' ? (
                            <>
                                <Button variant="contained" style={{ marginLeft: 8 }}>Move to Queu</Button>
                                <Button variant="outlined" color="primary" style={{ marginLeft: 8 }}>Cancel Appointments</Button>
                            </>
                        ) : ('')}
                    </div>
                ) : (
                    <div className={classes.actions}>
                        {showSearch ? (
                            <FormControl className={classNames(classes.textField)}>
                                <Input
                                    id="search_filter"
                                    type="text"
                                    placeholder="Search by Name or Mobile"
                                    value={filterText}
                                    onChange={(event) => handleChange(event)}
                                    endAdornment={(
                                        <InputAdornment position="end">
                                            <IconButton aria-label="Search filter" onClick={() => toggleSearch()}>
                                                <Close />
                                            </IconButton>
                                        </InputAdornment>
                                    )}
                                />
                            </FormControl>
                        ) : ('')}
                        <Tooltip title="Search list">
                            <IconButton
                                aria-label="Search list"
                                className={classes.filterBtn}
                                onClick={() => toggleSearch()}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>
                        {/* {title === "Today Bookings" || title === "WalkIn Payments" || title === "Online Payments" ? (
                            <Tooltip title="Download CSV">
                                <IconButton
                                    aria-label="download list"
                                    className={classes.filterBtn}
                                >
                                    <CloudDownload />
                                </IconButton>
                            </Tooltip>
                        ) : ('')} */}
                        <Tooltip title="Filter list">
                            <IconButton
                                aria-label="Filter list"
                                className={classes.filterBtn}
                                onClick={handleClick}
                            >
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 50,
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <div className={classes.popover}>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Filter By Type</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox checked={selectedCheck.indexOf("paid") > -1} value="paid" onChange={filterChechked} />}
                                            label={title === 'Online Payments' ? 'Settled' : 'Received'}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={selectedCheck.indexOf("not_paid") > -1} value="not_paid" onChange={filterChechked} />}
                                            label={title === 'Online Payments' ? 'Due to Settle' : 'Not Received'}
                                        />
                                    </FormGroup>
                                </FormControl>

                            </div>
                        </Popover>
                        <div className={classes.dateRangePicker}>
                            <DateTimeRangePicker
                                onChange={handleDateChange}
                                value={value1}
                                format="dd-MM-yy"
                                placeholder="Date"
                                maxDate={now}
                            />
                        </div>
                    </div>
                )}
            </div>
        </Toolbar>
    );
}

TableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    filterText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onUserInput: PropTypes.func.isRequired,
    numSelected: PropTypes.number.isRequired,
};

export default withStyles(styles)(TableToolbar);
