import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Dvr from '@material-ui/icons/Dvr';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { injectIntl } from 'react-intl';
import 'enl-styles/vendors/rechart/styles.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { dataPayments, dataPaymentsWalkIn } from 'enl-api/chart/chartData';
import colorfull from 'enl-api/palette/colorfull';
import SwipeableViews from 'react-swipeable-views';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import settled from 'enl-images/new-icons/settled.png';
import duetoSettle from 'enl-images/new-icons/due-to-settle.png';
import PapperBlock from './PapperBlock/PapperBlock';
import styles from './dashboard-jss';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const color = ({
  primary: colorfull[9],
  secondary: colorfull[8],
});

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p>{`${label}`}</p>
        <p style={{
          color: color.primary, paddingTop: 4, paddingBottom: 4, display: 'block'
        }}
        >
          {`${payload[0].dataKey} : ${payload[0].value}`}
        </p>
        <p style={{
          color: color.secondary, paddingTop: 4, paddingBottom: 4, display: 'block'
        }}
        >
          {`${payload[1].dataKey} : ₹${payload[1].value}`}
        </p>
      </div>
    );
  }

  return null;
}
function PaymentsGraph(props) {
  const { classes,onlinePayment,walkinPayment } = props;
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.PaymentsGraph}>
      <PapperBlock noMargin title="Payments" icon="timeline" desc="">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Online" {...a11yProps(0)} />
            <Tab label="Walk In" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ul className={classes.bigResume}>
              <li>
                <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                  {/* <Dvr /> */}
                  <img src={settled} />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.greenText}>&#8377; {onlinePayment.reduce( ( sum, obj ) => sum + parseInt(obj.Received),0 )} </span>
                  <Typography noWrap>
                                        Settled
                  </Typography>
                </Typography>
              </li>
              <li>
                <Avatar className={classNames(classes.avatar, classes.grayAvatar)}>
                  {/* <CheckCircle /> */}
                  <img src={duetoSettle} />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.grayText}>&#8377;  {onlinePayment.reduce( ( sum, obj ) => sum + parseInt(obj.NotReceived),0 )}</span>
                  <Typography noWrap>Due to settled</Typography>
                </Typography>
              </li>
              <li />
              <li />
            </ul>
            <div className={classes.chartWrap}>
              <div className={classes.chartFluid}>
                <ResponsiveContainer>
                  <BarChart
                    data={onlinePayment}
                  >
                    <XAxis dataKey="name" tickLine={false} />
                    <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <CartesianAxis />
                    <Tooltip />
                    <Bar dataKey="Received" fill={color.primary} />
                    <Bar dataKey="NotReceived" fill={color.secondary} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ul className={classes.bigResume}>
              <li>
                <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                  <Dvr />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.greenText}> {walkinPayment.reduce( ( sum, obj ) => sum + parseInt(obj.Invoice),0 )} </span>
                  <Typography noWrap>
                                        Total Invoices
                  </Typography>
                </Typography>
              </li>
              <li>
                <Avatar className={classNames(classes.avatar, classes.grayAvatar)}>
                  <CheckCircle />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.grayText}>&#8377; {walkinPayment.reduce( ( sum, obj ) => sum + parseInt(obj.Collection),0 )} </span>
                  <Typography noWrap>
                                        Total Collection
                  </Typography>
                </Typography>
              </li>
              <li />
              <li />
            </ul>
            <div className={classes.chartWrap}>
              <div className={classes.chartFluid}>
                <ResponsiveContainer>
                  <BarChart
                    data={walkinPayment}
                  >
                    <XAxis dataKey="name" tickLine={false} />
                    <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <CartesianAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="Invoice" fill="#008c2e" />
                    <Bar dataKey="Collection" fill="#808080" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12} />
        </Grid>
      </PapperBlock>
    </div>
  );
}

PaymentsGraph.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(injectIntl(PaymentsGraph));
