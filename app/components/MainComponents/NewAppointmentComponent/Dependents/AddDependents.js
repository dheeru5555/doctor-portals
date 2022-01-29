import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DependentsForm from './DependentsForm';

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
        justifyContent: 'space-between'
    },
    rightPanelTitle: {
        padding: '15px 0px',
        border: '1px solid #dedede',
        background: '#fff',
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
        marginTop: 5
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center'
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {
        children, classes, onClose, ...other
    } = props;

    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <div className={classes.header}>
                <Button aria-label="close">
                    Add Dependent
                </Button>
                <div>
                    {onClose ? (
                        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </div>
            </div>
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
}))(MuiDialogContent);


function MedicalHistory(props) {
    const { classes, isProfile } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {isProfile ? (
                <Button variant="" fullWidth color="primary" onClick={handleClickOpen} style={{ margin: 0 }}>
                    Add Dependent
                    <Icon className={classes.rightIcon}>send</Icon>
                </Button>
            ) : (
                <Button variant="contained" onClick={handleClickOpen} color="primary" className={classes.button}>
                    Add Dependent
                </Button>
            )}
            <Dialog fullWidth="true" maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </DialogTitle>
                <DialogContent dividers>
                    <DependentsForm onClose={handleClose} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

MedicalHistory.propTypes = {
    classes: PropTypes.object.isRequired,
    isProfile: PropTypes.bool
};

export default withStyles(styles)(MedicalHistory);
