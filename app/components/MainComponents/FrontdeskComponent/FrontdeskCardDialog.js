import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Type from 'enl-styles/Typography.scss';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Divider from '@material-ui/core/Divider';
import styles from './frontdeskStyle-jss';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { connect } from "react-redux";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';

function FrontdeskCardDialog(props) {
    const {
        classes,
        mobile,
        name,
        clinicDetails,
        imagesOrDocs,
        selectedFrontDesk,
        allReceptionist,
        handleMultipleClinic,
        selectedClinicId,
        searchAllReceptionist
    } = props;

    if (
        (clinicDetails === null) ||
        (imagesOrDocs === null) ||
        (selectedFrontDesk === null) ||
        (searchAllReceptionist === null)
    ) {
        return null;
    } else {

        const filterReceptionist = searchAllReceptionist.find((receptionist) => receptionist.id === selectedFrontDesk);
        let name = "";
        let mobileNumber = "";
        let imageUrl = "https://bootdey.com/img/Content/avatar/avatar6.png";

        if (filterReceptionist) {
            name = (
                filterReceptionist &&
                (filterReceptionist.first_name !== null) &&
                (filterReceptionist.last_name !== null)
            ) ? `${filterReceptionist.first_name} ${filterReceptionist.last_name}` : "";

            mobileNumber = (
                filterReceptionist &&
                (filterReceptionist.mobile !== null)
            ) ? filterReceptionist.mobile : "";

            imageUrl = (
                imagesOrDocs.receptionist_images_prefix_url &&
                filterReceptionist &&
                (filterReceptionist.avatar !== null)
            ) ? imagesOrDocs.receptionist_images_prefix_url + filterReceptionist.avatar : "https://bootdey.com/img/Content/avatar/avatar6.png";
        }

        const renderClinicDetails = () => {
            return clinicDetails.map((clinic) => {
                return (
                    <MenuItem
                        key={`clinic-${clinic.id}`}
                        value={clinic.id}
                    >
                        {clinic.name}
                    </MenuItem>
                )
            });
        }

        return (
            <div>
                <Card className={classes.cardSocmed} style={{ border: 'none', boxShadow: 'none' }}>
                    <CardContent className={classes.contentProfile}>
                        <div className={classes.userImage}>
                            <img src={imageUrl} alt={name} />
                        </div>
                        <br />
                        <Typography className={classes.subheading} gutterBottom>
                            <span className={Type.bold}>{name}</span>
                        </Typography>
                        <Typography className={classes.subheading} gutterBottom>
                            <span className={Type.regular}>+91 {mobileNumber} </span>
                        </Typography>
                        <Grid container alignItems="center">
                            <Grid item sm={12} style={{ paddingLeft: 8 }}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="age-simple">Clinic Location</InputLabel>
                                    <Select
                                        value={selectedClinicId}
                                        onChange={(e) => handleMultipleClinic(e.target.value)}
                                    >
                                        {renderClinicDetails()}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {/* <Divider className={classes.Divider} /> */}
                        {/* <Button variant="contained" className={classes.button2} onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color="primary" className={classes.button2}>Assign</Button> */}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

FrontdeskCardDialog.PropTypes = {
    name: PropTypes.object.isRequired,
    mobile: PropTypes.object.isRequired,
    selectedFrontDesk: PropTypes.any,
    handleMultipleClinic: PropTypes.any,
}

const mapStateToProps = state => {
    return {
        allReceptionist: state.get("receptionistReducer").allReceptionist,
        searchAllReceptionist: state.get("receptionistReducer").searchAllReceptionist,
        clinicDetails: state.get("profileReducer").clinicDetails,
        imagesOrDocs: state.get("dashboardReducer").imagesOrDocs,
    }
}



export default connect(mapStateToProps, {})(withStyles(styles)(FrontdeskCardDialog));
