import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import ItemTable from './ItemTable';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { MaterialDropZone } from 'enl-components';
import { DropzoneArea } from 'material-ui-dropzone';
import { Add } from '@material-ui/icons';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
        padding: 10
    },
    border: {
        border: '1px solid #dedede',
        padding: '15px 0px',
        background: '#f5f5f5',
        borderRadius: 5
    },
    textField: {
        marginTop: 5,
        '& input': {
            padding: 10
        }
    },
    title: {
        padding: '5px 15px',
        fontWeight: 700
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    flexEnd: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    spaceBetween: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    button: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    customButton: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    typography: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    py3: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    bold: {
        fontWeight: 700
    },
    rightPanel: {
        padding: '15px 20px',
    },
    unitPrice: {
        marginBottom: theme.spacing(1),
        '& label + .MuiInput-formControl': {
            marginTop: 5,
            borderRadius: theme.spacing(1 / 2)
        },
        '& .MuiInputLabel-formControl': {
            top: 0
        }
    },
    select: {
        marginBottom: theme.spacing(1),
        '& label + .MuiInput-formControl': {
            marginTop: 5,
            borderRadius: theme.spacing(1 / 2)
        },
        '& .MuiInputLabel-formControl': {
            top: 0
        }
    },
    root1: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dropZone: {
        '& .MuiDropzoneArea-root': {
            minHeight: 180
        },
        '& .MuiDropzonePreviewList-image': {
            marginBottom: 10
        }
    }
});


function AddBill(props) {
    const { classes } = props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Grid container spacing={2} justify="center">

                <Grid item md={8}>
                    <div className={classes.border}>
                        <Typography className={classes.title}>
                            GST Settings
                        </Typography>
                        <Divider style={{ margin: '15px 0 0' }} />
                        <div className={classes.rightPanel}>
                            <Typography variant="subtitle2" className={classes.customButton}>
                                GST Number<span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                                id="outlined-multiline-static"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                            />
                            <Typography variant="subtitle2" className={classes.customButton}>
                                GST Certificate <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <div className={classes.dropZone}>
                                <DropzoneArea
                                    onChange={(files) => console.log('Files:', files)}
                                    filesLimit="1"
                                    Icon={Add}
                                />
                            </div>
                            <Button color="primary" variant="contained" className={classes.customButton}>Submit</Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

AddBill.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddBill);
