import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import API from '../../../../helpers/api';

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
        alignItems: 'center'
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
});

const DialogTitle = withStyles(styles)((props) => {
    const {
        children, classes, onClose, ...other
    } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
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
        justifyContent: 'center'
    },
}))(MuiDialogActions);

const localUserInfo = localStorage.getItem('userInfo')
const parsedUserInfo = JSON.parse(localUserInfo)

const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;

function AddItem(props) {
    const api = new API();
    const defltStateProduct = {
        prod_id: "",
        prod_name: "",
        prod_quantity: 0,
        prod_price: 0,
        prod_total_price: 0,
    }
    const { classes, addProduct, billingId, onChangeValue, patientId, clinicId, appointmentId } = props;
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState("");
    const [products, setProducts] = useState([])
    const [selectProduct, setSelectProduct] = useState(defltStateProduct);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setError("")
        setSelectProduct(defltStateProduct)
    };
    const selectState = useSelector((state) => state.toJS());
    const { settingsReducer } = selectState;

    useEffect(() => {
        setProducts(settingsReducer.allBillables)
    }, [])

    const onChangeProduct = (e) => {
        let product_id = e.target.value;
        if (product_id != "") {
            let product = products.find((search) => search.id == product_id);
            let product_amount = parseFloat(product.amount)
            setSelectProduct({
                prod_id: product.id,
                prod_name: product.name,
                prod_quantity: 1,
                prod_price: product_amount,
                prod_total_price: product_amount,
            })
        } else {
            setSelectProduct(defltStateProduct);
        }
    }

    const onChangeQuantity = (e) => {
        let quantity = (e.target.value != "") ? parseInt(e.target.value) : 0;
        setSelectProduct({
            ...selectProduct,
            prod_quantity: e.target.value,
            prod_total_price: selectProduct.prod_price * quantity,
        })

    }

    const saveProduct = () => {
        // addProduct(selectProduct);
        let addBillItem = {
            patient_id: patientId,
            clinic_id: clinicId,
            appointment_id: appointmentId,
            bill_item_id: selectProduct.prod_id,
            item_amount: selectProduct.prod_price,
            quantity: parseInt(selectProduct.prod_quantity)
        }
        if (props.billingId !== '') {
            addBillItem.bill_id = billingId
        }
        if (isFrontdesk) {
            addBillItem.cr_id = parseInt(localStorage.getItem("cr_id"))
        }
        api.ACCOUNTS_URI().post("appointments/consultation/addBillItem", addBillItem)
            .then((resp) => {
                if (resp.data.success === true) {
                    handleClose();
                    onChangeValue()
                    setError("")
                    setSelectProduct(defltStateProduct)
                } else {
                    setError(resp.data.errorMessage.bill_item[0])
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <div style={{ display: 'contents' }}>
            <Button variant="contained" autoFocus onClick={handleClickOpen} style={{ marginLeft: 8 }}>
                Add Item
            </Button>
            <Dialog fullWidth onClose={handleClose} maxWidth="sm" aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Bill / Payment
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={4} justify="center">
                        <Grid item xs={10}>
                            {/*  <Typography className={classes.Typography}>
                                Bill No: YS/2020-2021/10000005
                            </Typography> */}
                            <Typography className={classes.bold}>
                                Bill Item
                            </Typography>
                            <FormControl className={classes.BillformControl}>
                                <Select
                                    fullWidth
                                    value={selectProduct.prod_id}
                                    displayEmpty
                                    name="item"
                                    className={classes.selectEmpty}
                                    onChange={onChangeProduct}
                                >
                                    <MenuItem value="" selected>
                                        <em>Select Item</em>
                                    </MenuItem>
                                    {products.map((product) => (<MenuItem key={product.name} value={product.id} > {product.name}</MenuItem>))}
                                </Select>
                                <FormHelperText style={{ color: 'red' }}>{error}</FormHelperText>
                            </FormControl>
                            <FormControl className={classes.BillformControl}>
                                <Input
                                    id="adornment-weight"
                                    onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                                    type="number"
                                    value={selectProduct.prod_quantity}
                                    onChange={onChangeQuantity}
                                    inputProps={{
                                        'aria-label': 'Weight',
                                    }}
                                />
                            </FormControl>
                            <Divider />
                            <Grid container>
                                <Grid item sm={8} className={classes.flexEnd}>
                                    <Typography className={classes.bold}>
                                        Total
                                    </Typography>
                                </Grid>
                                <Grid item sm={4} className={classes.flexEnd}>
                                    <Typography className={classes.Typography}>
                                        Rs.{selectProduct.prod_total_price}
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" autoFocus onClick={saveProduct}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


AddItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddItem);
