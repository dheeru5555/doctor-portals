import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BillPayment from './BillPayment';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        marginLeft: theme.spacing(1)
    },
    Chip: {
        background: '#e0e0e075',
        padding: theme.spacing(1),
        maxWidth: '100%',
        border: '1px solid black'
    },
    bold: {
        fontWeight: 700,
        paddingTop: 5,
        paddingBottom: 5
    },
    Typography: {
        paddingTop: 5,
        paddingBottom: 5
    },
    row: {
        display: 'flex',
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    spaceBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0
    },
    flexEnd: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    BillformControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        minWidth: '100%',
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        minWidth: 150,
    },
    mr5: {
        marginRight: theme.spacing(5)
    },
    bills: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #dedede',
        padding: '10px 0'
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const {
        children, classes, onClose, ...other
    } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.spaceBetween} {...other}>
            <Typography variant="h6">{children}</Typography>
            <div>
                <BillPayment isData={false} />
                {onClose ? (
                    <Button aria-label="close" variant="outlined" color="primary" className={classes.closeButton} onClick={onClose}>
                        Close<CloseIcon />
                    </Button>
                ) : null}
            </div>
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
        justifyContent: 'center'
    },
}))(MuiDialogActions);

function ViewBills(props) {
    const { classes } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ display: 'contents' }}>
            <Button variant="contained" autoFocus onClick={handleClickOpen} style={{ marginLeft: 8 }}>
                Bill / Payment
            </Button>
            <Dialog fullWidth onClose={handleClose} maxWidth="sm" aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Bill / Payment
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={4} justify="center">
                        <Grid item xs={12}>
                            <Typography className={classes.bold}>
                                Recently Created Bills
                            </Typography>
                            <ul style={{ listStyleType: 'decimal', padding: '10px 15px', width: '100%' }}>
                                <li>
                                    <div className={classes.bills}>
                                        <p>
                                            
                                            <br /><span>Date: 23 Apr 2021</span>
                                        </p>
                                        <Typography className={classes.Typography}>
                                            &#8377;550
                                        </Typography>
                                    </div>
                                </li>
                                <li>
                                    <div className={classes.bills}>
                                        <p>
                                            <BillPayment isData={true} />
                                            <br /><span>Date: 18 May 2021</span>
                                        </p>
                                        <Typography className={classes.Typography}>
                                            &#8377;550
                                        </Typography>
                                    </div>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}


ViewBills.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewBills);
