import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { BillsComponent } from 'enl-components';
import { connect } from 'react-redux';
import { featchWakingList, featchOnlineList, featchBillingDetails } from 'enl-redux/actions/BillingAction';
import { fetchAllBillables } from 'enl-redux/actions/settingsActions';

const styles = ({
  root: {
    flexGrow: 1,
    borderRadius: 10,
    background: 'white',
    padding: 5
  }
});

function Bills(props) {
  const title = brand.name + ' - Bills / Invoice';
  const description = brand.desc;
  const {
    classes, getWalkinPatientList, getOnlinePatientList, walkin_patient_list, online_patient_list, getbilableItems, getinvoiceDetail, billing_details
  } = props;

  let storedClinics = localStorage.getItem('selectedClinics');
  let parsedClinics = storedClinics !== '[]' ? JSON.parse(storedClinics) : []
  const [selectedClinics, setSelectedClinics] = React.useState(parsedClinics)
  const localUserInfo = localStorage.getItem('userInfo')
  const parsedUserInfo = JSON.parse(localUserInfo)

  const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;

  let today = new Date();

  function formatDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  useEffect(() => {
    getWalkinPatientList({
      sortby: 'patient_name',
      sortorder: 'desc',
      page: '1',
      date_range: `${formatDate()} - ${formatDate()}`,
      length: 10,
      clinic_id: selectedClinics.length == 0 ? [] : selectedClinics.map((clinic) => clinic.id),
      cr_id: (localStorage.getItem("cr_id") !== null && localStorage.getItem("cr_id") !== undefined) ? parseInt(localStorage.getItem("cr_id")) : ''
    });
    if(!isFrontdesk) {
      getOnlinePatientList({
        sortby: 'patient_name',
        sortorder: 'desc',
        page: '1',
        date_range: `${formatDate()} - ${formatDate()}`,
        length: 10,
        clinic_id: selectedClinics.length == 0 ? [] : selectedClinics.map((clinic) => clinic.id)
      });
    }
    getbilableItems();
  }, []);

  return (
    <div>{console.log("walkin_patient_list",walkin_patient_list)}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.root}>
        <BillsComponent onlinePatientList={online_patient_list} getOnlinePatientList={getOnlinePatientList} getinvoiceDetail={getinvoiceDetail} billingDetails={billing_details} getWalkinPatientList={getWalkinPatientList} walkinPatientList={walkin_patient_list} />
      </div>
    </div>
  );
}

Bills.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToprops = state => {
  const { dashboardReducer, BillingReducer, settingsReducer } = state.toJS();
  return {
    masterdata: dashboardReducer.masterData,
    walkin_patient_list: BillingReducer.walk_in_billing_list,
    online_patient_list: BillingReducer.online_billing_list,
    billing_details: BillingReducer.billing_details,
    billing_items: settingsReducer.allBillables,
  };
};

const mapDispatchToprops = dispatch => ({
  getWalkinPatientList: data => dispatch(featchWakingList(data)),
  getOnlinePatientList: data => dispatch(featchOnlineList(data)),
  getbilableItems: () => dispatch(fetchAllBillables()),
  getinvoiceDetail: data => dispatch(featchBillingDetails(data))
});

export default connect(mapStateToprops, mapDispatchToprops)(withStyles(styles)(Bills));
