import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import { Divider, Paper, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TotalAppointments from '../AppointmentsComponent/TotalAppointments';

// Styled component named StyledButton
const CalendarWrapper = styled.div`
    
    .fc .fc-toolbar.fc-header-toolbar{
        border: 1px solid #dddddd;
        border-bottom: none;
    }
    .fc .fc-toolbar.fc-header-toolbar {
        padding-top: 1em;
        padding-bottom: 1em;
        margin: 0;
        border-top-right-radius: 7px;
    }
    .fc .fc-toolbar .fc-next-button, .fc .fc-toolbar .fc-prev-button {
        background-color: transparent;
        border-color: transparent;
        color: black;
    }
    .fc-toolbar-chunk {
        display: inline-flex;
        align-items: center;
        margin-right: 20px;
    }

    .fc-dayGridMonth-button, .fc-timeGridWeek-button, .fc-timeGridDay-button, .fc-listMonth-button {
        background-color: transparent !important;
        border-color: #ff2100!important;
    }
    
    .fc-dayGridMonth-button, .fc-timeGridWeek-button, .fc-timeGridDay-button, .fc-listMonth-button {
        color: #ff2100;
        &:hover {
            background-color: rgba(235,35,48,.2)!important;
            color: #ff2100;
        }
    }
    .fc .fc-button-primary:not(:disabled):active:focus, .fc .fc-button-primary:not(:disabled).fc-button-active:focus {
        box-shadow: none;
    }
    .fc .fc-button-primary:focus {
        box-shadow: none;
    }
    .fc-button-active {
        color: #ff2100 !important;
    }
    .fc-toolbar-title {
        font-size: 1.45rem;
        font-weight: 500;
    }
    table {
        margin: 0
    }
    a:not([href]), a:not([href]):hover {
        color: #6e6b7b;
    }
    .fc .fc-view-harness {
        height: 604px !important;
    }
    .bg-light-primary {
        background: rgba(115,103,240,.12)!important;
    }
    .fc .fc-daygrid-event-harness {
        position: relative;
        width: 50%;
        display: inline-block;
        text-align: center;
    }
    .fc-direction-ltr .fc-daygrid-event.fc-event-end, .fc-direction-rtl .fc-daygrid-event.fc-event-start {
        font-size: 10px;
    }
    .fc-icon {
        width: unset;
        height: unset;
    }
    .fc-h-event {
      border: none !important
    }
    .fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events {
      z-index: -1;
    }
    .fc .fc-daygrid-day-frame {
      cursor: pointer;
    }
`;


// Styled component named StyledButton
const EventWrapper = styled.div`
    padding: 16px;
    height: 100%;
    table {
        margin: 0;
    }
    .fc .fc-button-group > .fc-button {
        background: transparent;
        color: black;
        border: none;
    }
    .fc .fc-toolbar.fc-header-toolbar {
        position: absolute;
        top: 17px;
        right: 0;
    }
    .fc-toolbar-chunk {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
    }
    .fc-toolbar-chunk .fc-toolbar-title {
      margin-top: .2rem;
      font-size: .75rem;
    }
    .fc .fc-toolbar.fc-header-toolbar .fc-toolbar-chunk:first-child {
        display: none;
    }
    .fc .fc-button-primary:not(:disabled):active:focus, .fc .fc-button-primary:not(:disabled).fc-button-active:focus {
        box-shadow: none;
    }
    .fc .fc-button-primary:focus {
        box-shadow: none;
    }
    .fc .fc-button-primary {
        background-color: transparent !important;
        border-color: #ff2100!important;
        color: #ff2100;
    }
    .fc .fc-button-primary:disabled {
        background-color: #0000001a !important;
        color: dimgray;
        border-color: #0000001a !important;
    }
    .fc-theme-standard .fc-list {
        border: none;
    }
    .fc-theme-standard .fc-list-day-cushion {
        border-radius: 10px
    }
    .fc-theme-standard td, .fc-theme-standard th, tr {
        border: none;
    }
    .fc-today-button {
      display: none;
    }
    .fc-view-harness {
      height: 400px !important;
      z-index: 3;
    background: white;
    }
    .fc .fc-list-event:hover td, .fc .fc-list-event td {
      background: none;
      font-size: 12px;
    }  
    .fc-icon {
        width: unset;
        height: unset;
    } 
`;


const styles = (theme) => ({
  root: {
    margin: 0,
    // padding: theme.spacing(2),
  },
  container: {
    display: 'flex', 
    width: '100%'
  },
  events: {
    border: '1px solid #dddddd',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    borderRight: 'none',
    // padding: theme.spacing(2),
    width: '27%',
    position: 'relative'
  },
  calendar: {
    position: 'relative',
    width: '73%'
  },
  eventlist: {
    '& .fc-scroller-liquid': {
      '&::-webkit-scrollbar': {
        width: 8,
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0)',
      },
      '&:hover': {
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.3)',
        }
      }
    },
  },
  eventHeader: {
    padding: '25px 0',
    paddingBottom: 24
  },
  pl3: {
    paddingLeft: theme.spacing(3)
  },
  eventImage: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  indicators: {
    padding: '5px 20px 0',
    fontSize: 11,
    background: '#f5f5f5',
    width: '100%',
    margin: 0,
    '& span': {
      display: 'inline-block',
      boxSizing: 'content-box',
      width: 0,
      height: 0,
      borderRadius: 5,
      borderRadius: 'calc(var(--fc-list-event-dot-width, 10px) / 2)'
    }
  },
  blue: {
    border: '5px solid #3788d8',
  },
  yellow: {
    border: '5px solid lightcoral',
  },
  grey: {
    border: '5px solid grey',
  },
  green: {
    border: '5px solid green',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  calendarAppointments: {
    '& .MuiDialog-paper': {
      height: 'inherit'
    }
  }
});


const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
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
  },
}))(MuiDialogActions);


function DemoApp({
  classes, appointments, appointments_list, featchApointmants, featchApointmantList
}) {
  const dateQuntity = 7;
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getApointmetCalendar = (fetchInfo, successCallback) => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth()+1;
    console.log(year, month, fetchInfo)
    // if (fetchInfo) {
    //   year = new Date(fetchInfo.start).getFullYear();
    //   const day = new Date(fetchInfo.start).getDate();
    //   if (day >= 28) {
    //     month = new Date(fetchInfo.start).getMonth() + 2;
    //   } else {
    //     month = new Date(fetchInfo.start).getMonth() + 1;
    //   }
    // }
    featchApointmants(month, year);
    successCallback(appointments);
  };
  const getApointmetList = (fetchInfo, successCallback) => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let date = new Date().getDate();

    if (fetchInfo) {
      year = new Date(fetchInfo.start).getFullYear();
      month = new Date(fetchInfo.start).getMonth() + 1;
      date = new Date(fetchInfo.start).getDate();
    }
    featchApointmantList(`${year}-${month}-${date}`);
    successCallback(appointments_list);
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr)
    handleClickOpen()
  }

  const formatDate = (dateMilli) => {
    var d = (new Date(dateMilli) + '').split(' ');
    d[2] = d[2] + ',';

    return [d[0], d[1], d[2], d[3]].join(' ');
  }

  return (
    <Paper className={classes.root} elevation={3}>
      <div className={classes.container}>
        <div className={classes.events}>
          <div className={classes.eventHeader}>
            <b className={classes.pl3}>Appointments</b>
          </div>
          <Divider />
          {/* <Button fullWidth variant="contained" color="primary">Appointments</Button> */}
          <Grid container spacing={1} className={classes.indicators}>
            <Grid item sm={3}>
              <span className={classes.blue} />
              {' '}
              Video
            </Grid>
            <Grid item sm={3}>
              <span className={classes.yellow} />
              {' '}
              Audio
            </Grid>
            <Grid item sm={3}>
              <span className={classes.grey} />
              {' '}
              Chat
            </Grid>
            <Grid item sm={3}>
              <span className={classes.green} />
              {' '}
              Walk In
            </Grid>
          </Grid>
          <EventWrapper className={classes.eventlist}>
            <FullCalendar
              plugins={[listPlugin]}
              initialView="listDay"
              headerToolbar={{
                left: '',
                right: 'prev,next title',
              }}
              events={(fetchInfo, successCallback, failureCallback) => getApointmetList(fetchInfo, successCallback, failureCallback)}
            />
          </EventWrapper>
          <div className={classes.eventImage}>
            <img className="img-fluid" src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/calendar-illustration.42be42ce.png" alt="illustration" />
          </div>
        </div>
        <div className={classes.calendar}>
          <CalendarWrapper>
            <FullCalendar
              plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
              initialView="dayGridMonth"
              editable
              dateClick={handleDateClick}
              headerToolbar={{
                left: 'prev,next title',
                right: '',
              }}
              events={(fetchInfo, successCallback, failureCallback) => getApointmetCalendar(fetchInfo, successCallback, failureCallback)}
            />
          </CalendarWrapper>
        </div>
      </div>
      <div>
        <Dialog fullWidth maxWidth={"xl"} className={classes.calendarAppointments} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Appointments (<small>{selectedDate !== null && formatDate(selectedDate)}</small>)
          </DialogTitle>
          <DialogContent dividers>
            <TotalAppointments slotDate={selectedDate} />
          </DialogContent>
        </Dialog>
      </div>
    </Paper>
  );
}

DemoApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DemoApp);




