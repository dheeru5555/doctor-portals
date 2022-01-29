import React, { useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Print from '@material-ui/icons/Print';
import Invoice from '../../Invoice';
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
    top: theme.spacing(2),
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, handlePrint, componentRef, billingDetails, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <div className={classes.closeButton}>
          <Pdf targetRef={componentRef} filename={(billingDetails == null) ? "invoice.pdf" : `invoice_${billingDetails.booking_id}.pdf`}>
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

export default function CustomizedDialogs({ viewInvoice, invoiceDisplay, billingDetails }) {
  const handleClose = () => {
    invoiceDisplay(false);
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <Dialog fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={viewInvoice}>
        <DialogTitle billingDetails={billingDetails} id="customized-dialog-title" componentRef={componentRef} handlePrint={handlePrint} onClose={handleClose}>
          Invoice
        </DialogTitle>
        <DialogContent dividers>

          <Grid container spacing={2} justify="center">
            <Grid item sm={7}>
              <div style={{ width: '8.2in', marginLeft: 'auto', marginRight: 'auto' }}>
                <div ref={componentRef} style={{ paddingLeft: 8, paddingTop: 8 }}>
                  {(billingDetails != null) ? <Invoice billingDetails={billingDetails} /> : ''}
                </div>
              </div>
              {/* <PrintComponet ref={componentRef} /> */}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
