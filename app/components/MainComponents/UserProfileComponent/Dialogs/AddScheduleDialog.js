import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import flag from 'enl-images/flag-lang.png';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import AddSchedule from './AddSchedule';

const flagIcon = {
    width: 16,
    height: 16,
    borderRadius: '50%',
    display: 'inline-block',
    position: 'relative',
    marginRight: 5,
    top: 1,
    background: `url(${flag}) no-repeat transparent`,
    backgroundSize: '16px auto',
    '&[class="ar"]': {
        backgroundPosition: '0 3px'
    },
    '&[class="zh"]': {
        backgroundPosition: '0 -12px'
    },
    '&[class="en"]': {
        backgroundPosition: '0 -28px'
    },
    '&[class="de"]': {
        backgroundPosition: '0 -44px'
    },
    '&[class="id"]': {
        backgroundPosition: '0 -62px'
    },
    '&[class="es"]': {
        backgroundPosition: '0 -79px'
    },
};

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    actionButtons: {
        color: '#000000a3',
        backgroundColor: '#e0e0e0',
        margin: theme.spacing(1),
    },
    header: {
        display: 'flex',
        alignItems: 'center'
    },
    rightPanelTitle: {
        padding: '15px 0px',
        border: '1px solid #dedede',
        background: '#fff',
        marginTop: 58
    },
    title: {
        padding: '15px 10px'
    },
    rightPanel: {
        padding: '15px 20px',
    },
    customButton: {
        justifyContent: 'space-between',
        padding: '15px 0px',
        '&:hover': {
            background: 'inherit',
        }
    },
    textField: {
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: 'white'
    },
    inputLang: {
        maxWidth: 260,
        background: 'white',
        border: 'none',
        paddingBottom: 5,
        '& i': {
            ...flagIcon
        }
    },
    formControl: {
        width: '100%'
    },
    buttonIcon: {
        fontSize: '1rem !important',
        marginRight: 5
    },
    title: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 30,
        '& h6': {
            margin: 0,
            color: 'lightcoral',
            fontSize: '1em'
        },
        '& small': {
            color: 'gray',
            fontSize: '70%'
        }
    }
});

const DialogTitle = withStyles(styles)((props) => {

    const { children, classes, onClose, ...other} = props;

    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <div className={classes.header}>
                {onClose ? (
                    <Button aria-label="close" className={classes.textWhite} onClick={onClose}>
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                ) : null}
                <div className={classes.title}>
                    <h6>Create shift with new set of days</h6>
                    <small>You can customize clinic schedule by Add/Edit Shifts as per your convenience</small>
                </div>
            </div>
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        background: '#f5f5f5'
    },
}))(MuiDialogContent);

function AddScheduleDialog(props) {
    const { classes, handleClickOpen, currentSelId, handleClose, open } = props;

    return (
        <div style={{ display: 'contents' }}>
            <Button variant="contained" onClick={handleClickOpen} style={{ marginLeft: 5, marginRight: 5 }}>
                <Icon className={classes.buttonIcon}>schedule</Icon>
                Add Shift
            </Button>
            <Dialog fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose} />
                <DialogContent dividers>
                    <AddSchedule
                        handleDialogClose = {handleClose}
                        currentSelId = {currentSelId}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

AddScheduleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    handleClickOpen: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    currentSelId: PropTypes.any.isRequired,
};

export default withStyles(styles)(AddScheduleDialog);
