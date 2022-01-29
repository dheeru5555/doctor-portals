import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import {
  Button, Divider, Paper, Typography
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';
import Send from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import helper from '../../../helpers/helpers';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);


const ChatHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
`;

const ChatContent = styled('div')`
  padding: 15px 0;
  ul {
    padding: 20px;
  }
  li {
    display: flex;
    position: relative;
    margin-bottom: 48px;
  }
  .subtitle {
    margin: 0 0 2em 0;
  }
  .fancy {
    line-height: 0.5;
    text-align: center;
  }
  .fancy span {
    display: inline-block;
    position: relative;
    background: lawngreen;
    padding: 8px;
    border-radius: 5px;
  }
  .fancy span:before,
  .fancy span:after {
    content: "";
    position: absolute;
    height: 12px;
    border-bottom: 1px solid grey;
    top: 0;
    width: 600%;
  }
  .fancy span:before {
    right: 100%;
    margin-right: 15px;
  }
  .fancy span:after {
    left: 100%;
    margin-left: 15px;
  }
`;

const ChatSend = styled('div')`
  border: 1px solid #3f51b5;
  bottom: 64px;
  margin: 0 16px;
  display: flex;
  padding: 0 10px;
  position: relative;
  box-shadow: 0px 1px 5px 0px rgb(80 80 80 / 20%),
    0px 2px 2px 0px rgb(80 80 80 / 14%), 0px 3px 1px -2px rgb(80 80 80 / 12%);
  min-height: 55px;
  align-items: center;
  border-radius: 50px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginRight: theme.spacing(2),
  },
  time: {
    top: '-20px',
    color: '#9e9e9e',
    position: 'absolute',
    fontSize: 11,
  },
  message: {
    flex: 1,
    '& p': {
      position: 'relative',
      marginBottom: 10,
      '& span': {
        display: 'inline-block',
        padding: 10,
        borderRadius: 10,
        color: '#fff',
        backgroundColor: 'lightcoral',
        boxShadow:
          '0px 1px 3px 0px rgb(80 80 80 / 20%), 0px 1px 1px 0px rgb(80 80 80 / 14%), 0px 2px 1px -1px rgb(80 80 80 / 12%)',
      },
    },
  },
  classList: {
    height: 'calc(100vh - 290px)',
    overflow: 'auto',
    overflowX: 'hidden',
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
  from: {
    '& > p': {
      left: 60,
    },
    '& .MuiAvatar-root': {
      marginRight: 20,
      borderRadius: 5,
    },
    '& p span:after': {
      top: 0,
      left: -9,
      content: '""',
      position: 'absolute',
      borderRight: '10px solid lightcoral',
      borderBottom: '15px solid transparent',
    },
    '& p span': {
      borderTopLeftRadius: 0,
    },
  },
  to: {
    flexDirection: 'row-reverse',
    '& > p': {
      right: 60,
    },
    '& .MuiAvatar-root': {
      marginLeft: 20,
      borderRadius: 5,
    },
    '& div': {
      textAlign: 'right',
    },
    '& p span:after': {
      top: 0,
      right: -9,
      content: "''",
      position: 'absolute',
      borderLeft: '10px solid #e8eaf6',
      borderBottom: '15px solid transparent',
    },
    '& p span': {
      borderTopRightRadius: 0,
      display: 'inline-block',
      padding: 10,
      borderRadius: 10,
      boxShadow:
        '0px 1px 3px 0px rgb(80 80 80 / 20%), 0px 1px 1px 0px rgb(80 80 80 / 14%), 0px 2px 1px -1px rgb(80 80 80 / 12%)',
      textAlign: 'left',
      backgroundColor: '#e8eaf6',
      color: '#000000de',
    },
  },
  writeMessage: {
    bottom: theme.spacing(1),
    display: 'flex',
    minHeight: 55,
    margin: '0 16px',
    alignItems: 'center',
    padding: '0 10px',
    borderRadius: 50,
    boxShadow: theme.shadows[2],
    border: `1px solid ${theme.palette.primary.main}`,
    background: '#f5f5f5',
    position: 'relative',
    '& > div:first-child': {
      height: '100%',
      flex: 1,
    },
    '& input': {
      color: theme.palette.text.primary,
      background: 'transparent',
      width: '100%',
      height: '100%',
      margin: 0,
      padding: '2px 20px 2px 2px',
      boxSizing: 'border-box',
      border: 'none',
      boxShadow: 'none',
      outline: 'none',
    },
  },
}));

function ChatComponent({ ticket_details, send_message, reopenTicket }) {
  const [state, setState] = useState({
    message: '',
    comments: [],
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const reOpen = (ticketid) => {
    reopenTicket(ticketid);
    handleClose();
  };


  const handleChange = (event) => {
    // const { name } = event.target;
    // const filabel = { ...state, message: event.target.value, };
    setState({ ...state, message: event.target.value, });
    // validateForm(filabel, name);
  };

  const sendMessage = async () => {
    await send_message(ticket_details.id, state.message);
    await setState({ ...state, message: '' });
  };

  const history = useHistory();
  const routeChange = () => {
    const path = '/app/support';
    history.push(path);
  };

  const classes = useStyles();
  return (
    <>
      <Paper elevation={2} style={{ width: '90%', margin: 'auto' }}>
        <ChatHeader>
          <Typography variant="subtitle2">
            <Button
              variant="outlined"
              className={classes.button}
              onClick={routeChange}
            >
              <ChevronLeft />
              Back
            </Button>
            #
            {ticket_details.ticket_number}
            {' '}
            -
            {' '}
            {ticket_details.category_name}
            {' '}
            -
            {' '}
            {helper.changeDateFormat(ticket_details.create_date, 'dd-MM-yyyy h:a')}
          </Typography>
          {/* <Typography variant="subtitle2">
            <Icon>more_vert</Icon>
          </Typography> */}
          {
            (ticket_details.issue_status == 2) ? (
              <Button onClick={handleClickOpen} variant="contained">
              Reopen
              </Button>
            ) : ''
          }

          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description" style={{ fontWeight: 600 }}>
                Are you sure want to Reopen this ticket(ID:
                {' '}
                {ticket_details.ticket_number}
)?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" style={{ fontSize: 12 }}>
                Cancel
              </Button>
              <Button onClick={() => reOpen(ticket_details.id)} variant="contained" color="primary" style={{ fontSize: 12 }}>
                Reopen
              </Button>
            </DialogActions>
          </Dialog>

        </ChatHeader>
        <Divider />
        <ChatContent>
          <ul className={classes.classList}>
            {ticket_details.comments.map((message) => {
              if (message.user_type != 'd') {
                return (
                  <li key={message.id} className={classes.from}>
                    <p className={classes.time}>
                      {' '}
                      {helper.changeDateFormat(message.created_at, 'MM, dd yyyy h:a')}
                    </p>
                    <Avatar>
                      <SupervisedUserCircleIcon />
                    </Avatar>
                    <div className={classes.message}>
                      <p>
                        <span>
                          {message.comments}
                        </span>
                      </p>
                    </div>
                  </li>
                );
              }
              return (
                <li key={message.id} className={classes.to}>
                  <p className={classes.time}>{helper.changeDateFormat(message.created_at, 'MM, dd yyyy h:a')}</p>
                  <Avatar>
                    <SupervisedUserCircleIcon />
                  </Avatar>
                  <div className={classes.message}>
                    <p>
                      <span>
                        {message.comments}
                      </span>
                    </p>
                  </div>
                </li>
              );
            })}

            {/* <p class="subtitle fancy"><span>Reopened</span></p> */}
          </ul>
        </ChatContent>
        {
          (ticket_details.issue_status != 2) ? (
            <Paper className={classes.writeMessage}>
              <input
                type="text"
                placeholder="Type your message (Max 255 Characters)"
                onChange={handleChange}
                value={state.message}
                maxLength="255"
              />
              <Tooltip id="tooltip-send" title="Send">
                <div>
                  <IconButton
                    mini="true"
                    color="primary"
                    className={classes.sendBtn}
                    onClick={sendMessage}
                  >
                    <Send />
                  </IconButton>
                </div>
              </Tooltip>
            </Paper>
          ) : ''
        }
      </Paper>
    </>
  );
}

ChatComponent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ChatComponent);
