import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { connect } from "react-redux";
import API from '../../../helpers/api';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'on', numeric: false, disablePadding: false, label: 'Events'
    },
    {
        id: 'doctor', numeric: false, disablePadding: false, label: 'Template'
    },
];

function EnhancedTableHead(props) {
    const {
        classes,
        order,
        orderBy,
        onRequestSort,
    } = props;

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'center' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number,
    onRequestSort: PropTypes.func,
    onSelectAllClick: PropTypes.func,
    order: PropTypes.oneOf(['asc', 'desc']),
    orderBy: PropTypes.string,
    rowCount: PropTypes.number,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { emailTemplate, submitEmailChagnes } = props;

    return (
        <Toolbar
            className={clsx(classes.root)}
        >
            <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Email Settings
            </Typography>


            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>save</Icon>}
                disabled={
                    (
                        (emailTemplate === null) ||
                        (emailTemplate.length === 0)
                    ) ? true : false
                }
                onClick={() => submitEmailChagnes()}
            >
                Save
            </Button>
        </Toolbar>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

function Email(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    // const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [emailTemplate, setEmailtemplate] = React.useState(null);
    const [snackBarInfo, setSnackbarInfo] = React.useState({
        isSnackBarOpen: false,
        snackBarText: '',
        snackBarSeverity: 'success',
    });

    React.useEffect(() => {
        fetchEmailSettings();
    }, []);

    const fetchEmailSettings = async () => {
        const api = new API();

        await api.ACCOUNTS_URI().get(`settings/email`, {
            params: {
                cr_id: localStorage.getItem("cr_id")
            }
        })
            .then((emailResponse) => {
                if (
                    (emailResponse.status === 200) &&
                    (emailResponse.data) &&
                    (emailResponse.data.email_settings)
                ) {
                    setEmailtemplate(emailResponse.data.email_settings);
                }
            })
            .catch((err) => {
                setSnackbarInfo({
                    isSnackBarOpen: true,
                    snackBarText: 'Could not fetch email template',
                    snackBarSeverity: 'error',
                });
            })
    }

    const { masterData } = props;

    if (
        (masterData === null) ||
        (masterData.templateEvents === undefined) ||
        emailTemplate === null
    ) {
        return null;
    }

    const createData = (id, title, checkbox, cheque1, cheque2, patientTemp, doctorTemp) => {
        return {
            id, title, checkbox, cheque1, cheque2, patientTemp, doctorTemp
        };
    }

    const { templateEvents } = masterData;
    const rows = emailTemplate.map((tEvents) => {
        const eventId = tEvents.template_event.id;
        const eventName = tEvents.template_event.name;
        const eventCheckbox = true;
        const eventCheckBox1 = tEvents.for_patient;
        const eventCheckbox2 = tEvents.for_doctor;
        const patientTemplate = (
            tEvents.template_event.event_email_templates &&
            (tEvents.template_event.event_email_templates.length > 0)
        ) ? tEvents.template_event.event_email_templates[0].text_plain : "";
        const doctorTemplate = (
            tEvents.template_event.event_email_templates &&
            (tEvents.template_event.event_email_templates.length > 1)
        ) ? tEvents.template_event.event_email_templates[1].text_plain : "";


        return createData(eventId, eventName, eventCheckbox, eventCheckBox1, eventCheckbox2, patientTemplate, doctorTemplate);
    })

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const submitEmailChagnes = async () => {
        const api = new API();

        const inputEmail = emailTemplate.map((email) => (
            {
                template_event_id: parseInt(email.template_event_id, 10),
                for_doctor: email.for_doctor,
                for_patient: email.for_patient,
            }
        ))

        await api.ACCOUNTS_URI().post(`settings/email/update`, {
            email_settings: inputEmail,
            cr_id: localStorage.getItem("cr_id")
        })
            .then((updateEmailResp) => {
                if (
                    (updateEmailResp.status === 200) &&
                    (updateEmailResp.data.success === true)
                ) {
                    setSnackbarInfo({
                        isSnackBarOpen: true,
                        snackBarText: 'Email Settings updated successfully',
                        snackBarSeverity: 'success',
                    });
                } else {
                    setSnackbarInfo({
                        isSnackBarOpen: true,
                        snackBarText: 'Error while submitting the form',
                        snackBarSeverity: 'error',
                    });
                }
            })
            .catch(() => {
                setSnackbarInfo({
                    isSnackBarOpen: true,
                    snackBarText: 'Could not update email settings',
                    snackBarSeverity: 'error',
                });
            })
    }

    const handleCheckboxChange = (eventId, eventName, eventValue) => {
        let intermediateEmailTemp = [];

        if (
            (emailTemplate !== null) &&
            (emailTemplate.length > 0)
        ) {
            intermediateEmailTemp = [...emailTemplate];
        }

        if (
            intermediateEmailTemp &&
            (intermediateEmailTemp.length > 0)
        ) {
            const filteredEmailTemp = intermediateEmailTemp.find((intermSmsTemp) => {
                return intermSmsTemp.template_event_id === parseInt(eventId, 10);
            });

            if (filteredEmailTemp) {
                filteredEmailTemp[eventName] = eventValue ? 1 : 0;
            } else {
                const emailTempObj = {
                    template_event_id: parseInt(eventId, 10),
                    for_doctor: true,
                    for_patient: true,
                }

                emailTempObj[eventName] = eventValue ? 1 : 0;

                intermediateEmailTemp.push(emailTempObj);
            }
        } else {
            const emailTempObj = {
                template_event_id: parseInt(eventId, 10),
                for_doctor: true,
                for_patient: true,
            }

            emailTempObj[eventName] = eventValue ? 1 : 0;

            intermediateEmailTemp.push(emailTempObj);
        }

        setEmailtemplate(intermediateEmailTemp)
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarInfo({
            isSnackBarOpen: false,
            snackBarText: '',
            snackBarSeverity: 'success',
        });
    };

    const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    emailTemplate={emailTemplate}
                    submitEmailChagnes={submitEmailChagnes}
                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="small"
                        aria-label="enhanced table"
                        style={{ margin: 0 }}
                    >
                        <EnhancedTableHead classes={classes} />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    let forPatientCheckbox = true;
                                    let forDoctorCheckbox = true;
                                    if (
                                        (emailTemplate !== null) &&
                                        (emailTemplate.length > 0)
                                        ) {
                                            const filteredTemp = emailTemplate.find((temp) => {
                                                return temp.template_event_id === parseInt(row.id, 10);
                                            });

                                        if (filteredTemp) {
                                            forPatientCheckbox = (filteredTemp.for_patient !== undefined) ? (filteredTemp.for_patient == 1 ? true : false) : true;
                                            forDoctorCheckbox = (filteredTemp.for_doctor !== undefined) ? (filteredTemp.for_doctor == 1 ? true : false) : true;
                                        }
                                    }

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={`email-${row.id}`}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                width="200"
                                            >
                                                <Typography variant="subtitle2" gutterBottom>{row.title}</Typography>
                                                {row.checkbox ? (
                                                    <FormGroup row>
                                                        <FormControlLabel
                                                            control={(
                                                                <Checkbox
                                                                    id={row.id.toString()}
                                                                    checked={forPatientCheckbox}
                                                                    onChange={(e) => handleCheckboxChange(e.target.id, e.target.name, e.target.checked)}
                                                                    name="for_patient"
                                                                />
                                                            )}
                                                            label={<Typography variant="body2" color="textSecondary">To Patient</Typography>}
                                                        />
                                                        <FormControlLabel
                                                            control={(
                                                                <Checkbox
                                                                    id={row.id.toString()}
                                                                    checked={forDoctorCheckbox}
                                                                    onChange={(e) => handleCheckboxChange(e.target.id, e.target.name, e.target.checked)}
                                                                    name="for_doctor"
                                                                    color="primary"
                                                                />
                                                            )}
                                                            label={<Typography variant="body2" color="textSecondary">To Doctor</Typography>}
                                                        />
                                                    </FormGroup>
                                                ) : ('')}
                                            </TableCell>
                                            <TableCell width="400">
                                                <b style={{color: "#0000008a"}}>To Patient:</b>
                                                <div dangerouslySetInnerHTML={{ __html: row.patientTemp }} style={{ marginBottom: 15 }}></div>
                                                <b style={{color: "#0000008a"}}>To Doctors:</b>
                                                <div dangerouslySetInnerHTML={{ __html: row.doctorTemp }} style={{ marginBottom: 15 }}></div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                /> */}
            </Paper>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={snackBarInfo.isSnackBarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    severity={snackBarInfo.snackBarSeverity}
                    onClose={handleSnackbarClose}
                >
                    {snackBarInfo.snackBarText}
                </Alert>
            </Snackbar>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        masterData: state.get("dashboardReducer").masterData,
    }
}

export default connect(mapStateToProps, {})(Email);