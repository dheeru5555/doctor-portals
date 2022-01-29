import React, { useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloudDownload from '@material-ui/icons/CloudDownload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Print from '@material-ui/icons/Print';
import Icon from '@material-ui/core/Icon';
import { useReactToPrint } from 'react-to-print';
import Pdf from "react-to-pdf";

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
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, handlePrint, componentRef, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <div className={classes.closeButton}>
                    <Pdf targetRef={componentRef} filename="invoice.pdf">
                        {({ toPdf }) => <Button aria-label="close" variant="contained" onClick={toPdf}>
                            Download
                            <Icon>file_download</Icon>
                        </Button>}
                    </Pdf>
                    <Button variant="outlined" onClick={handlePrint} style={{ marginLeft: 8 }}>
                        Print
                        <Print />
                    </Button>
                    <Button aria-label="close" variant="outlined" color="primary" onClick={onClose} style={{ marginLeft: 8 }}>
                        Close
                        <CloseIcon />
                    </Button>
                </div>
            ) : null}
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
    },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
    const { appointmentRx } = props
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                View Rx&nbsp;<VisibilityIcon />
            </Button>
            <Dialog fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" componentRef={componentRef} handlePrint={handlePrint} onClose={handleClose}>
                    Template Rx
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container justify="center">
                        <Grid item sm={7}>
                            <div ref={componentRef} style={{ border: '1px solid rgba(0, 0, 0, 0.12)', padding: 8, borderRadius: 8 }}>
                                <div dangerouslySetInnerHTML={{ __html: appointmentRx }}></div>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
}
