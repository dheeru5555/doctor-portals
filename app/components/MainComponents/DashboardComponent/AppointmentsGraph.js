import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import LocalLibrary from '@material-ui/icons/LocalLibrary';
import Typography from '@material-ui/core/Typography';
import { injectIntl } from 'react-intl';
import 'enl-styles/vendors/rechart/styles.css';
import Computer from '@material-ui/icons/Computer';
import Toys from '@material-ui/icons/Toys';
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
import { dataAppointments } from 'enl-api/chart/chartData';
import colorfull from 'enl-api/palette/colorfull';
import Style from '@material-ui/icons/Style';
import inQueue from 'enl-images/new-icons/inqueue.png';
import waitlist from 'enl-images/new-icons/waitlist.png';
import paused from 'enl-images/new-icons/paused.png';
import PapperBlock from './PapperBlock/PapperBlock';
import styles from './dashboard-jss';
// import inQueue from 'enl-images/new-icons/inqueue.png';

const color = ({
  primary: colorfull[0],
  secondary: colorfull[1],
  third: colorfull[2],
  fourth: colorfull[3],
});

function AppointmentsGraph(props) {
  const { classes, appointments } = props;
  const [filterSelect, setFilterSelect] = useState([]);
  const [filterApointMent, setFilterApointMent] = useState([]);

  useEffect(() => {
    setFilterApointMent(appointments);
  }, [appointments]);


  const filterChechked = (event) => {
    let filter = filterSelect;
    if (event.target.checked) {
      filter = [...filter, event.target.value];
      setFilterSelect(filter);
      console.log("filterSelect", filterSelect)
    } else {
      const index = filter.indexOf(event.target.value);
      console.log("filterSelect", filterSelect)
      filter.splice(index, 1);
      setFilterSelect(filter);
    }
    if (filter.length > 0) {
      const filterApointMent = appointments.map((appoint) => {
        const resultObject = {
          name: appoint.name,
        };
        filter.map(data => {
          resultObject[data] = appoint[data];
        });
        return resultObject;
      });
      setFilterApointMent(filterApointMent);
    } else {
      setFilterApointMent(appointments);
    }
  };

  return (
    <PapperBlock filterChechked={filterChechked} filterSelect={filterSelect} title="Appointments" icon="timeline" desc="">
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <ul className={classes.bigResume}>
            <li>
              <Avatar className={classNames(classes.avatar, classes.pinkAvatar)}>
                {/* <LocalLibrary /> */}
                <img src={inQueue} />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.pinkText}>{appointments.reduce((sum, obj) => sum + parseInt(obj.queue), 0)}</span>
                <Typography>Queue</Typography>
              </Typography>
            </li>
            <li>
              <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>
                <Computer />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.purpleText}>{appointments.reduce((sum, obj) => sum + parseInt(obj.checked_out), 0)}</span>
                <Typography>
                  Checked Out
                </Typography>
              </Typography>
            </li>
            <li>
              <Avatar className={classNames(classes.avatar, classes.blueAvatar)}>
                {/* <Toys /> */}
                <img src={waitlist} />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.blueText}>{appointments.reduce((sum, obj) => sum + parseInt(obj.waitlist), 0)}</span>
                <Typography>
                  Waitlist
                </Typography>
              </Typography>
            </li>
            <li>
              <Avatar className={classNames(classes.avatar, classes.tealAvatar)}>
                {/* <Style /> */}
                <img src={paused} />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.tealText}>{appointments.reduce((sum, obj) => sum + parseInt(obj.paused), 0)}</span>
                <Typography>
                  Paused
                </Typography>
              </Typography>
            </li>
          </ul>
          <div className={classes.chartWrap} id="appointments">
            <div className={classes.chartFluid}>
              <ResponsiveContainer>
                <BarChart
                  data={filterApointMent}
                >
                  <XAxis dataKey="name" tickLine={false} allowDecimals={false} />
                  <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} allowDecimals={false} />
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <CartesianAxis />
                  <Tooltip />
                  <Bar dataKey="queue" fill={color.primary} />
                  <Bar dataKey="checked_out" fill={color.secondary} />
                  <Bar dataKey="waitlist" fill={color.third} />
                  <Bar dataKey="paused" fill={color.fourth} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Grid>
      </Grid>
    </PapperBlock>
  );
}

AppointmentsGraph.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(injectIntl(AppointmentsGraph));
