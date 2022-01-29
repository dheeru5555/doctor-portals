import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import OnlineBills from './OnlineBills';
import WalkInBills from './WalkInBills';


function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
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


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 10,
    borderRadius: 10
  },
}));

export default function ScrollableTabsButtonAuto({
  walkinPatientList, getWalkinPatientList, getOnlinePatientList, getinvoiceDetail, billingDetails, onlinePatientList
}) {
  const localUserInfo = localStorage.getItem('userInfo')
  const parsedUserInfo = JSON.parse(localUserInfo)
  
  const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      {isFrontdesk ? (
        <>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Walk In" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}><WalkInBills getinvoiceDetail={getinvoiceDetail} billingDetails={billingDetails} getWalkinPatientList={getWalkinPatientList} walkinPatientList={walkinPatientList} /></TabPanel>
        </>
      ) : (
        <>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Walk In" />
              <Tab label="OnLine" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}><WalkInBills getinvoiceDetail={getinvoiceDetail} billingDetails={billingDetails} getWalkinPatientList={getWalkinPatientList} walkinPatientList={walkinPatientList} /></TabPanel>
          <TabPanel value={value} index={1}><OnlineBills onlinePatientList={onlinePatientList} filterOnlinePatientList={getOnlinePatientList} /></TabPanel>
        </>
      )}
    </div>
  );
}
