import React from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import { fetchConsultationDetails, setSelectedQueueId } from '../../../../redux/actions/appointmentAction';
import { fatchDashboard } from '../../../../redux/actions/dashboardActions';
import Loading from '../../../../components/Loading'

const styles = theme => ({
    container: {
        textAlign: 'center'
    },
    root: {
        display: 'flex',
        height: '100%',
        background: '#f5f5f5',
        width: '100vw',
    },
    button: {
        margin: theme.spacing(1)
    },
    mAuto: {
        margin: 'auto'
    },
    icon: {
        marginLeft: theme.spacing(1)
    },
    finishMessage: {
        padding: theme.spacing(5),
        width: 700,
        backgroundColor: 'white',
        border: '1px solid #dedede',
        borderRadius: 15,
        textAlign: 'center',
        margin: '0 auto',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        '& h4': {
            '& span': {
                textAlign: 'center',
                display: 'block',
                '& svg': {
                    color: 'green',
                    height: 'auto',
                    width: 148
                }
            }
        }
    }
});

function CompletedConsult(props) {
    const title = brand.name + ' - Consultation';
    const description = brand.desc;
    const { classes, selectedQueueId } = props;

    let appointmentId = ''

    if(location && location.state && location.state.id) {
    }
    appointmentId = props.location.state.id;
    let patientName = props.location.state.name;
    setTimeout(() => {
        
    }, 200);
    
    React.useEffect(() => {
        props.fatchDashboard();
        if(
            (props.consultaitionDetails === null) &&
            (appointmentId !== '')
            ) {
                props.fetchConsultationDetails(appointmentId)
                props.setSelectedQueueId()
            }
        }, [])
        
    const history = useHistory();

    function routeChange() {
        const path = '/app/appointments';
        history.push(path);
    };

    if(props.consultaitionDetails === null && appointmentId == '') {
        return <Loading />
    }

    return (
        <div className={classes.root}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
            </Helmet>
            <div className={classes.mAuto}>
                <div className={classes.finishMessage}>
                    <Typography variant="h4" gutterBottom>
                        <span>
                            <CheckCircle />
                        </span>
                        Consultation Done
                    </Typography>
                    {props.consultaitionDetails !== null ? (
                        <Typography variant="subtitle1">With {props.consultaitionDetails.patient.first_name} {props.consultaitionDetails.patient.last_name}</Typography>
                    ) : ''}
                    <Typography variant="subtitle1">On {`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`}</Typography>
                    {/* <Button variant="contained" className={classes.button}>
                        Share Rx to Patient
                        <Icon className={classes.icon}>print</Icon>
                    </Button>
                    <Button variant="contained" className={classes.button}>
                        Print Invoice
                        <Icon className={classes.icon}>print</Icon>
                    </Button> */}
                    <div>
                        <Button variant="contained" onClick={routeChange} color="primary" className={classes.button}>
                            Done
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

CompletedConsult.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  consultaitionDetails: state.get('appointmentReducer').consultaitionDetails,
  selectedQueueId: state.get('appointmentReducer').selectedQueueId,
});


export default connect(mapStateToProps, { fetchConsultationDetails, setSelectedQueueId, fatchDashboard })(withStyles(styles)(CompletedConsult));
