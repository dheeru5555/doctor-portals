import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiDialog-paperWidthSm': {
            border: '1px solid #ff4a2f'
        }
    }
}));

export default function AlertDialogSlide(props) {
    const {deleteHoliday, holidayId} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSuccessCheck = async () => {
        await deleteHoliday(holidayId).finally(() => {
            handleClose();
        });
    }

    return (
        <div>
            <Button variant="contained" style={{ float: 'right', background: 'blue', color: 'white' }} onClick={handleClickOpen}>
                Unblock
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                className={classes.root}
            >
                <DialogTitle id="alert-dialog-slide-title">{"Are you Sure, Unblock Calendar?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        on Agree, your Cancelled appointments will not get reversed, but you can able to make new schedule for this date.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained">
                        No
                    </Button>
                    <Button onClick={handleSuccessCheck} variant="contained">
                        Yes, Proceed to unblock
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
