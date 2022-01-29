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
import helper from '../../../helpers/helpers';

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
        pagination: true,
        tableflter: {
            sortby: 'patient_name',
            sortorder: 'desc',
            page: 1,
            length: 10,
            search: null,
            date_range: null,
            payment_status: null,
        }
    });

    const { classes, intl, onlinePatientList, filterOnlinePatientList } = props;

    const searchFilterText = (serarch_text) => {
        setFormState({
            ...formState,
            tableflter: { ...formState.tableflter, search: serarch_text }
        });
        filterOnlinePatientList({
            ...formState.tableflter,
            search: serarch_text
        });
    };


    const filterDatePicker = (date) => {
        let searchDate = null;
        if (date !== null) {
            const firstDate = date[0];
            const lastDate = date[1];
            searchDate = `${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-${firstDate.getDate()} - ${lastDate.getFullYear()}-${lastDate.getMonth() + 1}-${lastDate.getDate()}`;
        }

        setFormState({
            ...formState,
            tableflter: { ...formState.tableflter, date_range: searchDate }
        });

        filterOnlinePatientList({
            ...formState.tableflter,
            date_range: searchDate
        });

    };

    const searchPaymentStatus = (serarch_text) => {
        setFormState({
            ...formState,
            tableflter: { ...formState.tableflter, payment_status: serarch_text }
        });
        filterOnlinePatientList({
            ...formState.tableflter,
            payment_status: serarch_text
        });
    };

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
            tableflter: { ...formState.tableflter, page }
        });

        getWalkinPatientList({
            ...formState.tableflter,
            page
        });
    };

    const handleChangeRowsPerPage = event => {
        setFormState({
            ...formState,
            tableflter: { ...formState.tableflter, length: event.target.value }
        });
        getWalkinPatientList({
            ...formState.tableflter,
            length: event.target.value
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


    const {
        data,
        order,
        orderBy,
        selected,
        filterText,
        size,
        columnData,
        toolbar, pagination, checkcell,
        bordered, stripped, hovered,
    } = formState;
    const rowsPerPage = 1;
    const page = formState.tableflter.page;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, onlinePatientList.list.length - (page * rowsPerPage));
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
                        onDateSelected={filterDatePicker}
                        onSearchFilter={searchFilterText}
                        onPaymentFilter={searchPaymentStatus}
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
                        {onlinePatientList.list.map((patient, index) => {
                            const isSelected = thisIsSelected(patient.id);
                            return (
                                <TableRow
                                    onClick={(event) => handleClick(event, patient.id)}
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    key={index}
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
                                            <div style={{ marginLeft: '10px', textTransform: 'capitalize' }}>
                                                {patient.patient_fm_id !== '' && patient.patient_fm_id !== null ? patient.patient_fm_name : patient.patient_name}
                                                <br />
                                                {patient.patient_fm_id !== '' && patient.patient_fm_id !== null ? helper.genderName(patient.patient_fm_gender) : helper.genderName(patient.patient_gender)}, {''}
                                                {/* {patient.patient_gender}, */}
                                                {patient.patient_fm_dob !== '' && patient.patient_fm_dob !== null ? helper.getAge(patient.patient_fm_dob) : helper.getAge(patient.patient_dob)}y
                                                <br />
                                                {patient.patient_fm_mobile !== '' && patient.patient_fm_mobile !== null ? patient.patient_fm_mobile : patient.patient_mobile}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell align="left">
                                        {(() => {
                                            switch (patient.appointment_type_id) {
                                                case 1:
                                                    return (<div className={classes.bgVideo}>
                                                        <p>Video</p>
                                                    </div>)
                                                    break;
                                                case 2:
                                                    return (<div className={classes.bgAudio}>
                                                        <p>Audio</p>
                                                    </div>)
                                                    break;
                                                case 3:
                                                    return (<div className={classes.bgChat}>
                                                        <p>Chat</p>
                                                    </div>)
                                                    break;
                                                case 4:
                                                    return (<div className={classes.bgChat}>
                                                        <p>Walk-in</p>
                                                    </div>)
                                                    break;
                                                default:
                                                    break;
                                            }
                                        })()}

                                    </TableCell>
                                    <TableCell align="left">
                                        {helper.tConvert(patient.slot_start)}
                                        {' '}
                                        -{' '}
                                        {helper.tConvert(patient.slot_end)}
                                        <br />
                                        {patient.slot_date}
                                    </TableCell>
                                    <TableCell align="left">
                                        <p>
                                            <b>Booking ID: </b>
                                            <span>{patient.appointment_ref_id}</span>
                                        </p>
                                        <p>
                                            <b>Ref: </b>
                                            <span><Chip label={(patient.follow_up_date == null ? ('New') : ('Follow up'))} /></span>
                                        </p>
                                    </TableCell>
                                    <TableCell align="left">
                                        {(patient.consultation_fee != null) ? (
                                            <span>
                                                {' '}
                                                &#8377;
                                                {patient.consultation_fee}
                                                {' '}

                                            </span>
                                        ) : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {patient.status === 1 ? (
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
                        count={onlinePatientList.total}
                        rowsPerPage={formState.tableflter.length}
                        page={formState.tableflter.page}
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
