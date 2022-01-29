import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableHead from '../Tables/TableHeader';
import EnhancedTableToolbar from '../Tables/TableToolbar';
import styles from '../Tables/tableStyle-jss';
import { injectIntl, intlShape } from 'react-intl';

let counter = 0;
function createData(name, mobile, type, slottime, slotdate, gender, age, amount, status) {
    counter += 1;
    return {
        id: counter,
        name,
        mobile,
        type,
        slottime,
        slotdate,
        gender,
        age,
        amount,
        status
    };
}

function OnlineBills(props) {
    const [formState, setFormState] = useState({
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        columnData: [
            {
                id: 'name',
                numeric: false,
                disablePadding: false,
                label: 'Patient'
            }, {
                id: 'fat',
                numeric: false,
                disablePadding: false,
                label: 'Consultation type'
            }, {
                id: 'fat',
                numeric: false,
                disablePadding: false,
                label: 'Slot Details'
            }, {
                id: 'fat',
                numeric: false,
                disablePadding: false,
                label: 'Appointment Details'
            }, {
                id: 'carbs',
                numeric: false,
                disablePadding: false,
                label: 'Amount'
            }, {
                id: 'protein',
                numeric: true,
                disablePadding: false,
                label: 'Status'
            },
        ],
        data: [
            createData('Mr.Abhishek', '+91 9999999999', 'Video', '4:00PM - 4:30PM', '23rd Mar 2021', 'Male', '25y', '500.00', 1),
            createData('Mr.Abhishek', '+91 6854684135', 'Audio', '4:00PM - 5:00PM', '23rd Mar 2021', 'Male', '25y', '500.00', 2),
        ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
        page: 0,
        rowsPerPage: 25,
        defaultPerPage: 5,
        filterText: '',
        size: 'medium',
        bordered: false,
        stripped: false,
        hovered: true,
        toolbar: true,
        checkcell: false,
        pagination: true
    });

    const handleRequestSort = (event, property) => {
        const { orderBy, order, data } = formState;
        const orderByConst = property;
        let orderLet = 'desc';

        if (orderBy === property && order === 'desc') {
            orderLet = 'asc';
        }

        const dataConst = orderLet === 'desc'
            ? data.sort((a, b) => (b[orderByConst] < a[orderByConst] ? -1 : 1))
            : data.sort((a, b) => (a[orderByConst] < b[orderByConst] ? -1 : 1));

        setFormState({
            ...formState,
            data: dataConst,
            order: orderLet,
            orderBy: orderByConst
        });
    };

    const handleSelectAllClick = event => {
        const { data } = formState;
        if (event.target.checked) {
            setFormState({
                ...formState,
                selected: data.map(n => n.id)
            });
            return;
        }
        setFormState({
            ...formState,
            selected: []
        });
    };

    const handleClick = (event, id) => {
        const { checkcell } = formState;
        if (!checkcell) {
            return;
        }
        const { selected } = formState;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setFormState({
            ...formState,
            selected: newSelected
        });
    };

    const handleChangePage = (event, page) => {
        setFormState({
            ...formState,
            page
        });
    };

    const handleChangeRowsPerPage = event => {
        setFormState({
            ...formState,
            rowsPerPage: event.target.value
        });
    };

    const thisIsSelected = id => formState.selected.indexOf(id) !== -1; // eslint-disable-line

    const handleUserInput = value => {
        // Show all item first
        const { data, defaultPerPage } = formState;
        if (value !== '') {
            setFormState({
                ...formState,
                rowsPerPage: data
            });
        } else {
            setFormState({
                ...formState,
                rowsPerPage: defaultPerPage
            });
        }

        // Show result base on keyword
        setFormState({
            ...formState,
            filterText: value.toLowerCase()
        });
    };

    const { classes, intl } = props;
    const {
        data,
        order,
        orderBy,
        selected,
        rowsPerPage,
        page,
        filterText,
        size,
        columnData,
        toolbar, pagination, checkcell,
        bordered, stripped, hovered,
    } = formState;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));
    const renderCell = (dataArray, keyArray) => keyArray.map((itemCell, index) => (
        <TableCell align={itemCell.numeric ? 'right' : 'left'} key={index.toString()}>{dataArray[itemCell.id]}</TableCell>
    ));

    return (
        <div>
            <Paper className={classes.rootTable} elevation={0}>
                {toolbar && (
                    <EnhancedTableToolbar
                        numSelected={selected.length}
                        filterText={filterText}
                        onUserInput={(event) => handleUserInput(event)}
                        title="Online Payments"
                        placeholder="Search"
                    />
                )}
                <Table className={
                    classNames(
                        classes.table,
                        hovered && classes.hover,
                        stripped && classes.stripped,
                        bordered && classes.bordered,
                        classes[size]
                    )}
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={(e) => handleSelectAllClick(e)}
                        onRequestSort={(e, p) => handleRequestSort(e, p)}
                        rowCount={data.length}
                        columnData={columnData}
                        checkcell={checkcell}
                    />
                    <TableBody>
                        {data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((n, index) => {
                            const isSelected = thisIsSelected(n.id);
                            if (n.name.toLowerCase().indexOf(filterText) === -1 && n.mobile.toLowerCase().indexOf(filterText) === -1) {
                                return false;
                            }
                            return (
                                <TableRow
                                    onClick={(event) => handleClick(event, n.id)}
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    key={n.id}
                                    selected={isSelected}
                                >
                                    {checkcell && (
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isSelected} size="small" />
                                        </TableCell>
                                    )}
                                    <TableCell component="th" scope="row" padding="none">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar className={classes.avatar}>A</Avatar>
                                            <div style={{ marginLeft: '10px' }}>
                                                {n.name}
                                                <br />
                                                {n.gender}
                                                ,
                                                {n.age}
                                                <br />
                                                {n.mobile}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell align="left">
                                        {n.type === 'Video' ? (
                                            <div className={classes.bgVideo}>
                                                <p>{n.type}</p>
                                            </div>
                                        ) : ('')}
                                        {n.type === 'Audio' ? (
                                            <div className={classes.bgAudio}>
                                                <p>{n.type}</p>
                                            </div>
                                        ) : ('')}
                                        {n.type === 'Chat' ? (
                                            <div className={classes.bgChat}>
                                                <p>{n.type}</p>
                                            </div>
                                        ) : ('')}
                                    </TableCell>
                                    <TableCell align="left">
                                        {n.slottime}
                                        {' '}
                                        <br />
                                        {' '}
                                        {n.slotdate}
                                    </TableCell>
                                    <TableCell align="left">
                                        <p>
                                            <b>Booking ID: </b>
                                            <span>98578758</span>
                                        </p>
                                        <p>
                                            <b>Ref: </b>
                                            <span><Chip label={(n.status == 1 ? ('New') : ('Repeat'))} /></span>
                                        </p>
                                    </TableCell>
                                    <TableCell align="left">
                                        &#8377;
                                        {n.amount}
                                    </TableCell>
                                    <TableCell align="right">
                                        {n.status === 1 ? (
                                            <Chip label="Settled" className={classes.success} />
                                        ) : (
                                            <Chip label="Due to Settle" className={classes.warning} />
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {pagination && (
                    <TablePagination
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={(e, p) => handleChangePage(e, p)}
                        onChangeRowsPerPage={(val) => handleChangeRowsPerPage(val)}
                    />
                )}
            </Paper>
        </div>
    );
}

OnlineBills.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired
};

export default withStyles(styles)(injectIntl(OnlineBills));
