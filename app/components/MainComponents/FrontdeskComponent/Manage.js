import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Icon from '@material-ui/core/Icon';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DropzoneArea } from 'material-ui-dropzone';
import { AddAPhoto } from '@material-ui/icons';
import { connect } from "react-redux";
import API from "../../../helpers/api";
import Loading from 'enl-components/Loading';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { fetchAllClinics } from "../../../redux/actions/profileActions";

const ProfileWrapper = styled('div')`
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  // display: none;
  
`;

const DropZoneWrapper = styled.div`
  .MuiDropzoneArea-root {
    width: 90px;
    height: 90px;
    min-height: 90px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid #f69ea4;
  }
  .MuiGrid-container {
    position: absolute;
    top: 0;
    margin: 0;
  }
  .MuiDropzonePreviewList-imageContainer:hover .MuiDropzonePreviewList-image {
    opacity: 1;
  }
  .MuiGrid-spacing-xs-8 > .MuiGrid-item {
    padding: 0;
  }
  .MuiGrid-grid-xs-4 {
    flex-grow: 0;
    max-width: 100%;
    flex-basis: 100%;
  }
  .MuiDropzonePreviewList-image {
    height: auto;
  }
  .MuiDropzoneArea-text {
    display: none;
  }
  .MuiDropzonePreviewList-removeButton {
    top: 30%;
    right: 35%;
    opacity: 0;
    position: absolute;
    transition: .5s ease;
  }
  .MuiFab-root:hover {
    text-decoration: none;
    background-color: #d5d5d5b3;
  }
  .MuiSvgIcon-root {
    margin-right: 0 !important;
    color: gray;
  }
  .MuiGrid-container {
    position: absolute;
    top: 0;
    margin: 0;
  }
  .MuiDropzonePreviewList-image {
    height: 90px;
  }
`;

const View = styled('div')`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 75%;
  margin: auto;
  display: none;
  p {
    margin: 0;
  }
  .MuiTab-textColorInherit.Mui-selected {
    opacity: 1;
    background: lightblue;
    border-radius: 10px;
    color: white;
}
.MuiTabs-indicator {
  display: none;
}
@media (min-width: 600px){
.MuiTab-root {
    min-width: 120px;
}}
.MuiTab-root{
  min-height: 38px;
}
.MuiIcon-root {
  font-size: 1rem;
  margin-right: 12px;
}
`;

function TabPanel(props) {
    const {
        children, value, index, ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    avatar: {
        borderRadius: 7,
        width: 90,
        height: 90
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    alignCenter: {
        display: 'flex',
        alignItems: 'center'
    },
    justifyCenter: {
        display: 'flex',
        justifyContent: 'center'
    },
    ml2: {
        marginLeft: theme.spacing(2)
    },
    mt2: {
        marginTop: theme.spacing(2)
    },
    button: {
        marginRight: theme.spacing(1)
    },
    name: {
        fontSize: 18,
        margin: 0
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 30
    },
    textSecondary: {
        color: 'gray'
    },
    permissions: {
        border: '1px solid #ebe9f1',
        padding: '0 !important',
        borderRadius: 10,
        marginTop: 10,
        // boxShadow: '0 3px 10px 0 rgb(34 41 47 / 10%)',
        background: '#f3f2f7',
        '& h6': {
            padding: '1rem',
            margin: 0
        },
        '& table': {
            margin: 0,
            '& thead': {
                background: '#f3f2f7'
            }
        }
    },
    permissionsList: {
        border: '1px solid #dedede',
        padding: 15,
        background: '#f5f5f5',
        margin: 8
    },
    textField: {
        margin: 0,
        '& .MuiOutlinedInput-input': {
            padding: '10.5px 14px'
        }
    },
    infoTitle: {
        display: 'flex',
        alignItems: 'center',
        width: '12rem',
        color: '#6e6b7b'
    },
    infoBasic: {
        display: 'flex',
        flexDirection: 'column',
        width: '12rem',
        color: '#6e6b7b',
        '& span': {
            display: 'flex',
            alignItems: 'center',
            '& .MuiIcon-root': {
                marginRight: 4
            }
        },
        '& p': {
            color: '#000'
        }
    },
    shj: {
        '& p': {
            color: '#6e6b7b'
        }
    },
    languages: {
        '& .MuiAutocomplete-inputRoot': {
            padding: 0
        }
    }
}));

function Manage(props) {
    const { masterData, clinicDetails, imagesOrDocs, fetchAllClinics } = props;

    const title = brand.name + ' - Frontdesk';
    const description = brand.desc;
    const classes = useStyles();
    const [receptionistDetails, setReceptionistDetails] = React.useState({
        title: "",
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        address: "",
        city_id: "",
        state_id: "",
        pincode: "",
        gender: "",
        marital_status: "",
        clinic_id: "",
        dob: "",
        avatar: "",
    });
    const [cityList, setCityList] = React.useState(null);
    const [value, setValue] = React.useState('one');
    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });

    React.useEffect(() => {
        if (props.location.state && props.location.state.receptionistId) {
            const api = new API();

            api.ACCOUNTS_URI().get(`receptionists/detail/${props.location.state.receptionistId}`)
                .then((receptionResponse) => {

                    if (
                        (receptionResponse.status === 200) &&
                        (receptionResponse.data) &&
                        (receptionResponse.data.receptionist)
                    ) {
                        setReceptionistDetails({
                            title: (
                                (receptionResponse.data.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist.title) &&
                                (receptionResponse.data.receptionist.receptionist.title !== null)
                            ) ? receptionResponse.data.receptionist.receptionist.title : "",
                            first_name: (
                                (receptionResponse.data.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist.first_name) &&
                                (receptionResponse.data.receptionist.receptionist.first_name !== null)
                            ) ? receptionResponse.data.receptionist.receptionist.first_name : "",
                            last_name: (
                                (receptionResponse.data.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist.last_name) &&
                                (receptionResponse.data.receptionist.receptionist.last_name !== null)
                            ) ? receptionResponse.data.receptionist.receptionist.last_name : "",
                            email: (
                                (receptionResponse.data.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist.email) &&
                                (receptionResponse.data.receptionist.receptionist.email !== null)
                            ) ? receptionResponse.data.receptionist.receptionist.email : "",
                            mobile: (
                                (receptionResponse.data.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist.mobile) &&
                                (receptionResponse.data.receptionist.receptionist.mobile !== null)
                            ) ? receptionResponse.data.receptionist.receptionist.mobile : "",
                            address: (
                                (receptionResponse.data.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist.address) &&
                                (receptionResponse.data.receptionist.receptionist.address !== null)
                            ) ? receptionResponse.data.receptionist.receptionist.address : "",
                            city_id: (
                                (receptionResponse.data.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist.city_id) &&
                                (receptionResponse.data.receptionist.receptionist.city_id !== null)
                            ) ? receptionResponse.data.receptionist.receptionist.city_id : "",
                            state_id: (
                                (receptionResponse.data.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist.state_id) &&
                                (receptionResponse.data.receptionist.receptionist.state_id !== null)
                            ) ? receptionResponse.data.receptionist.receptionist.state_id : "",
                            pincode: (
                                (receptionResponse.data.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist.pincode) &&
                                (receptionResponse.data.receptionist.receptionist.pincode !== null)
                            ) ? receptionResponse.data.receptionist.receptionist.pincode : "",
                            gender: (
                                (receptionResponse.data.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist.gender) &&
                                (receptionResponse.data.receptionist.receptionist.gender !== null)
                            ) ? receptionResponse.data.receptionist.receptionist.gender : "",
                            marital_status: (
                                (receptionResponse.data.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist.marital_status) &&
                                (receptionResponse.data.receptionist.receptionist.marital_status !== null)
                            ) ? receptionResponse.data.receptionist.receptionist.marital_status : "",
                            clinic_id: (
                                (receptionResponse.data.receptionist) &&
                                (receptionResponse.data.receptionist.clinic_id) &&
                                (receptionResponse.data.receptionist.clinic_id !== null)
                            ) ? receptionResponse.data.receptionist.clinic_id : "",
                            dob: (
                                (receptionResponse.data.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist.dob) &&
                                (receptionResponse.data.receptionist.receptionist.dob !== null)
                            ) ? receptionResponse.data.receptionist.receptionist.dob : "",
                            avatar: (
                                (receptionResponse.data.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist) &&
                                (receptionResponse.data.receptionist.receptionist.avatar) &&
                                (receptionResponse.data.receptionist.receptionist.avatar !== null)
                            ) ? receptionResponse.data.receptionist.receptionist.avatar : "",
                        });
                    }
                })
                .catch(() => {
                    console.log("Error")
                })
        }

        if (clinicDetails === null) {
            fetchAllClinics();
        }

    }, []);

    React.useEffect(() => {
        const api = new API();

        if (receptionistDetails.state_id !== "") {
            api.MASTER_URI().get(`city/${receptionistDetails.state_id}`)
                .then((cityResp) => {
                    if (
                        (cityResp.status === 200) &&
                        (cityResp.data.success === true) &&
                        (cityResp.data.cities.length > 0)
                    ) {
                        setCityList(cityResp.data.cities);
                    }
                })
                .catch((err) => {
                    console.log("err", err)
                })
        }

    }, [receptionistDetails.state_id])

    const handleSelect = (event) => {
        const { name } = event.target;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderCities = () => {
        if (
            (cityList === null) ||
            (cityList.length === 0)
        ) {
            return null;
        } else {
            return cityList.map((city) => {
                return (
                    <option
                        key={`city-${city.id}`}
                        value={city.id}
                    >
                        {city.name}
                    </option>
                )
            });
        }
    }

    const array1 = [1, 4, 9, 16];

    if (
        (receptionistDetails === null &&
            (clinicDetails === null))
    ) {
        return <Loading />
    }

    const renderStates = () => {
        if (
            (masterData) &&
            (masterData !== null) &&
            (masterData.states) &&
            (masterData.states.length > 0)
        ) {
            return masterData.states.map((state) => {
                return <option key={`city-${state.id}`} value={state.id}>{state.name}</option>
            })
        } else {
            return null;
        }
    }

    let imageUrl = "https://bootdey.com/img/Content/avatar/avatar6.png";

    if (
        (imagesOrDocs !== null) &&
        (imagesOrDocs.receptionist_images_prefix_url) &&
        (receptionistDetails !== null) &&
        (receptionistDetails.avatar)
    ) {
        imageUrl = imagesOrDocs.receptionist_images_prefix_url + receptionistDetails.avatar;
    }

    const handleManageInputChange = (inputKey, inputValue) => {
        const intermediateInputObj = { ...receptionistDetails };
        intermediateInputObj[inputKey] = inputValue;
        setReceptionistDetails(intermediateInputObj);
    }

    const renderModulePermissions = () => {
        const { receptionistPermissions } = masterData;

        const receptionistPermissionValue = Object.values(receptionistPermissions);

        return receptionistPermissionValue.map((modulePermission) => {

            const moduleKey = modulePermission[0].module_name;
            const moduleValue = Object.values(modulePermission);
            return (
                <Accordion key={modulePermission.module_name}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>
                            {moduleKey}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <>
                            {
                                moduleValue.map((permission) => {
                                    return (
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    size="small"
                                                    id={permission.code}
                                                />
                                            )}
                                            label={permission.name}
                                        />
                                    )
                                })
                            }
                        </>
                    </AccordionDetails>
                </Accordion>
            )

        })
    }


    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
            </Helmet>
            <View>
                <Grid container spacing={2}>
                    <Grid item sm={6} className={classes.info}>
                        <Avatar className={classes.avatar}>A</Avatar>
                        <div className={classes.ml2}>
                            <p className={classes.name}>Frontdesk Name</p>
                            <p>frontdesk@email.com</p>
                            <Button variant="outlined" className={classes.button}>Edit</Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.button}
                            >
                                Remove
                            </Button>
                        </div>
                    </Grid>
                    <Grid item sm={6} className={classes.shj}>
                        <div className={classes.alignCenter}>
                            <div className={classes.infoTitle}>
                                <Icon>person_outline</Icon>
                                <span>Username</span>
                            </div>
                            <p>gslixby0</p>
                        </div>
                        <div className={classes.alignCenter}>
                            <div className={classes.infoTitle}>
                                <Icon>check</Icon>
                                <span>Status</span>
                            </div>
                            <p>inactive</p>
                        </div>
                        <div className={classes.alignCenter}>
                            <div className={classes.infoTitle}>
                                <Icon>star_border</Icon>
                                <span>Role</span>
                            </div>
                            <p>editor</p>
                        </div>
                        <div className={classes.alignCenter}>
                            <div className={classes.infoTitle}>
                                <Icon>flag</Icon>
                                <span>Country</span>
                            </div>
                            <p>El Salvador</p>
                        </div>
                        <div className={classes.alignCenter}>
                            <div className={classes.infoTitle}>
                                <Icon>local_phone</Icon>
                                <span>Contact</span>
                            </div>
                            <p>(479) 232-9151</p>
                        </div>
                    </Grid>

                    <Grid
                        item
                        sm={12}
                        style={{
                            background: '#f3f2f7', borderRadius: 10, padding: 15, marginTop: 10
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item sm={3}>
                                <div className={classes.alignCenter}>
                                    <div className={classes.infoBasic}>
                                        <span>
                                            <Icon>person_outline</Icon>
                                            Name
                                        </span>
                                        <p>Frontdesk</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item sm={3}>
                                <div className={classes.alignCenter}>
                                    <div className={classes.infoBasic}>
                                        <span>
                                            <Icon>person_outline</Icon>
                                            Name
                                        </span>
                                        <p>Frontdesk</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item sm={3}>
                                <div className={classes.alignCenter}>
                                    <div className={classes.infoBasic}>
                                        <span>
                                            <Icon>person_outline</Icon>
                                            Name
                                        </span>
                                        <p>Frontdesk</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item sm={3}>
                                <div className={classes.alignCenter}>
                                    <div className={classes.infoBasic}>
                                        <span>
                                            <Icon>person_outline</Icon>
                                            Name
                                        </span>
                                        <p>Frontdesk</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item sm={3}>
                                <div className={classes.alignCenter}>
                                    <div className={classes.infoBasic}>
                                        <span>
                                            <Icon>person_outline</Icon>
                                            Name
                                        </span>
                                        <p>Frontdesk</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item sm={3}>
                                <div className={classes.alignCenter}>
                                    <div className={classes.infoBasic}>
                                        <span>
                                            <Icon>person_outline</Icon>
                                            Name
                                        </span>
                                        <p>Frontdesk</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item sm={3}>
                                <div className={classes.alignCenter}>
                                    <div className={classes.infoBasic}>
                                        <span>
                                            <Icon>person_outline</Icon>
                                            Name
                                        </span>
                                        <p>Frontdesk</p>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} className={classes.permissions}>
                        <div>
                            <h6>
                                <span className={classes.alignCenter}>
                                    <Icon>lock_outline</Icon>
                                    {' '}
                                    Permissions
                                </span>
                            </h6>
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Module</th>
                                            <th>Read</th>
                                            <th>Write</th>
                                            <th>Create</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {array1.map(n => ([
                                            <tr>
                                                <td>Admin</td>
                                                <td>
                                                    <div>
                                                        <input type="checkbox" id="admin-1" className="custom-control-input" checked="" />
                                                        <label className="custom-control-label" htmlFor="admin-1" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <input type="checkbox" id="admin-2" className="custom-control-input" />
                                                        <label className="custom-control-label" htmlFor="admin-2" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <input type="checkbox" id="admin-3" className="custom-control-input" />
                                                        <label className="custom-control-label" htmlFor="admin-3" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <input type="checkbox" id="admin-4" className="custom-control-input" />
                                                        <label className="custom-control-label" htmlFor="admin-4" />
                                                    </div>
                                                </td>
                                            </tr>
                                        ]))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </View>
            <ProfileWrapper>
                <AppBar position="static" color="default" style={{ borderRadius: 10 }}>
                    <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                        <Tab value="one" label="Basic Information" {...a11yProps('one')} />
                        <Tab
                            value="two"
                            label="Permissions"
                            wrapped
                            {...a11yProps('two')}
                        />
                        {/* <Tab value="three" label="Social Media" {...a11yProps('three')} /> */}
                    </Tabs>
                </AppBar>

                <TabPanel value={value} index="one">
                    <Grid container spacing={1}>
                        <Grid item sm={12}>
                            <h4 className={classes.alignCenter}>
                                <Icon>person_outline</Icon>
                                Personal Information
                            </h4>
                        </Grid>
                        <Grid item sm={12} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <DropZoneWrapper>
                                <DropzoneArea
                                    acceptedFiles={['image/*']}
                                    onChange={(files) => console.log('Files:', files)}
                                    filesLimit="1"
                                    Icon={AddAPhoto}
                                />
                            </DropZoneWrapper>
                            <label style={{ marginTop: 10 }}>Upload Profile Picture</label>
                        </Grid>
                        <Grid item sm={4}>
                            <p>Title</p>
                            <FormControl variant="outlined" fullWidth className={classes.textField}>
                                <Select
                                    native
                                    id="title"
                                    value={receptionistDetails.title}
                                    onChange={(e) => handleManageInputChange(e.target.id, e.target.value)}
                                    label="Title"
                                    inputProps={{
                                        name: 'age',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value="Mr">Mr</option>
                                    <option value="Ms">Ms</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={4}>
                            <p>First Name</p>
                            <Input
                                placeholder="eg. John"
                                fullWidth
                                id="first_name"
                                onChange={(e) => handleManageInputChange(e.target.id, e.target.value)}
                                value={receptionistDetails.first_name}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <p>Last Name</p>
                            <Input
                                placeholder="eg. Doe"
                                fullWidth
                                id="last_name"
                                onChange={(e) => handleManageInputChange(e.target.id, e.target.value)}
                                value={receptionistDetails.last_name}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <p>Email</p>
                            <Input
                                placeholder="yourname@email.com"
                                fullWidth
                                type="email"
                                id="email"
                                onChange={(e) => handleManageInputChange(e.target.id, e.target.value)}
                                value={receptionistDetails.email}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <p>Mobile</p>
                            <Input
                                placeholder="e.g 9999999999"
                                fullWidth
                                id="mobile"
                                type="number"
                                onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                                onChange={(e) => handleManageInputChange(e.target.id, e.target.value)}
                                value={receptionistDetails.mobile}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <p>Gender</p>
                            <FormControl variant="outlined" fullWidth className={classes.textField}>
                                <Select
                                    native
                                    value={receptionistDetails.gender}
                                    id="gender"
                                    onChange={(e) => handleManageInputChange(e.target.id, e.target.value)}
                                    label="Age"
                                    inputProps={{
                                        name: 'age',
                                        id: 'gender',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={4}>
                            <p>Date of Birth</p>
                            <Input
                                placeholder="2021-08-28"
                                fullWidth
                                id="dob"
                                onChange={(e) => handleManageInputChange(e.target.id, e.target.value)}
                                value={receptionistDetails.dob}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                        </Grid>
                        <Grid item sm={12} style={{ marginTop: 20 }}>
                            <h4 className={classes.alignCenter}>
                                <Icon>location_on</Icon>
                                Address Information
                            </h4>
                        </Grid>
                        <Grid item sm={4}>
                            <p>Address</p>
                            <TextField
                                fullWidth
                                multiline
                                inputProps={{ maxLength: 250 }}
                                rows="4"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                id="address"
                                onChange={(e) => handleManageInputChange(e.target.id, e.target.value)}
                                value={receptionistDetails.address}
                            />
                        </Grid>
                        <Grid item sm={8}>
                            <Grid container spacing={1}>

                                <Grid item sm={6}>
                                    <p>State</p>
                                    <FormControl variant="outlined" fullWidth className={classes.textField}>
                                        <Select
                                            native
                                            value={receptionistDetails.state_id}
                                            id="state_id"
                                            onChange={(e) => handleManageInputChange(e.target.id, e.target.value)}
                                            label="Age"
                                            inputProps={{
                                                name: 'age',
                                                id: 'state_id',
                                            }}
                                        >
                                            <option aria-label="None" value="" />
                                            {renderStates()}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item sm={6}>
                                    <p>City</p>
                                    <FormControl variant="outlined" fullWidth className={classes.textField}>
                                        <Select
                                            native
                                            value={receptionistDetails.city_id}
                                            id="city_id"
                                            onChange={(e) => handleManageInputChange(e.target.id, e.target.value)}
                                            disabled={((cityList === null) || (cityList.length === 0)) ? true : false}
                                            label="Age"
                                            inputProps={{
                                                name: 'age',
                                                id: 'city_id',
                                            }}
                                        >
                                            <option aria-label="None" value="" />
                                            {renderCities()}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item sm={6} style={{ marginTop: 10 }}>
                                    <p>Post Code</p>
                                    <Input
                                        placeholder=""
                                        fullWidth
                                        type="number"
                                        onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                                        id="postal_code"
                                        onChange={(e) => handleManageInputChange(e.target.id, e.target.value)}
                                        value={receptionistDetails.postal_code}
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item sm={12}>
                            <Button variant="contained" color="primary">Save Changes</Button>
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={value} index="two">
                    <Grid container spacing={2}>
                        <Grid item sm={12} className={classes.info}>
                            <Avatar className={classes.avatar}>
                                <img src={imageUrl} alt="profile-Image" />
                            </Avatar>
                            <div className={classes.ml2}>
                                <p className={classes.name}>{`${receptionistDetails.title} ${receptionistDetails.first_name} ${receptionistDetails.last_name}`}</p>
                                <p>{receptionistDetails.email}</p>
                                {/* <Button variant="outlined" className={classes.button}>Edit</Button> */}
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => setValue("one")}
                                >
                                    Remove
                                </Button>
                            </div>
                        </Grid>
                        <Grid item sm={4} className={classes.languages}>
                            <p>Clinic Location</p>
                            <Autocomplete
                                fullWidth
                                multiple
                                id="tags-filled"
                                options={(clinicDetails !== null) && clinicDetails.map((clinic) => clinic.name)}
                                freeSolo
                                disabled={(clinicDetails === null) ? true : false}
                                renderTags={(value, getTagProps) => value.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        label={option}
                                        size="small"
                                        style={{ padding: 0, marginTop: 0, marginBottom: 0 }}
                                        {...getTagProps({ index })}
                                    />
                                ))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" />
                                )}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <p>Status</p>
                            <FormControl variant="outlined" fullWidth className={classes.textField}>
                                <Select
                                    native
                                    value={state.age}
                                    onChange={handleSelect}
                                    label="Age"
                                    inputProps={{
                                        name: 'age',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={10}>Active</option>
                                    <option value={20}>Inactive</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item sm={12} className={classes.permissions}>
                            <div>
                                <h6>
                                    <span className={classes.alignCenter}>
                                        <Icon>lock_outline</Icon>
                                        {' '}
                                        Permissions
                                    </span>
                                </h6>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Module</th>
                                                <th>Read</th>
                                                <th>Write</th>
                                                <th>Create</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {array1.map(n => ([
                                                <tr>
                                                    <td>Admin</td>
                                                    <td>
                                                        <div>
                                                            <input type="checkbox" id="admin-1" className="custom-control-input" checked="" />
                                                            <label className="custom-control-label" htmlFor="admin-1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <input type="checkbox" id="admin-2" className="custom-control-input" />
                                                            <label className="custom-control-label" htmlFor="admin-2" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <input type="checkbox" id="admin-3" className="custom-control-input" />
                                                            <label className="custom-control-label" htmlFor="admin-3" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <input type="checkbox" id="admin-4" className="custom-control-input" />
                                                            <label className="custom-control-label" htmlFor="admin-4" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ]))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Grid> */}
                        <Grid sm={12} className={classes.permissionsList}>
                            <p><b>Module Permissions</b></p>
                            {renderModulePermissions()}
                            {/* <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Vitals</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    size="small"
                                                />
                                            )}
                                            label="View"
                                        />
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    size="small"
                                                />
                                            )}
                                            label="Create"
                                        />
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    size="small"
                                                />
                                            )}
                                            label="Update"
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className={classes.heading}>Chief Complaint</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    size="small"
                                                />
                                            )}
                                            label="View"
                                        />
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    size="small"
                                                />
                                            )}
                                            label="Create"
                                        />
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    size="small"
                                                />
                                            )}
                                            label="Update"
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion> */}
                        </Grid>
                        <Grid item sm={12}>
                            <Button variant="contained" color="primary" style={{ marginTop: 15 }}>Save Changes</Button>
                        </Grid>
                    </Grid>
                </TabPanel>
            </ProfileWrapper>
        </div>
    );
}

Manage.propTypes = {
    intl: intlShape.isRequired
};

const mapStateToProps = state => {
    return {
        masterData: state.get("dashboardReducer").masterData,
        clinicDetails: state.get("profileReducer").clinicDetails,
        imagesOrDocs: state.get("dashboardReducer").imagesOrDocs,
    }
}

export default connect(mapStateToProps, { fetchAllClinics })(injectIntl(Manage));
