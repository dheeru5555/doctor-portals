import React, { useState, useEffect, useRef } from 'react';
import firebase from '../../../firebase/firebase';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Chat from '@material-ui/icons/Chat';
import { SendMessage, ReceiveMessage } from './ChatComponent/sendMessage';
import {
  Widget, addResponseMessage, addLinkSnippet, addUserMessage
} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import Send from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import API from '../../../helpers/api';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180
  },
  container: {
    display: "flex",
    position: "fixed",
    bottom: 80,
    right: 10
  },
  paper: {
    margin: theme.spacing(1),
    width: 330,
    borderRadius: 8
  },
  svg: {
    width: 100,
    height: 100
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  chatHeader: {
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 30,
    background: '#ff2100',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    color: '#fff',
    '& h3': {
      margin: 0
    }
  },
  conversation: {
    paddingTop: 10,
    height: 320,
    overflowY: "scroll"
  },
  myMsg: {
    textAlign: "right",
    marginRight: 8,
    "& p": {
      marginBottom: 0,
      background: "lightblue",
      width: "fit-content",
      marginLeft: "auto",
      maxWidth: "70%",
      padding: 15,
      borderRadius: 8,
      wordBreak: "break-word"
    }
  },
  userMsg: {
    marginLeft: 8,
    display: "flex",
    marginTop: 8,
    '& img': {
      objectFit: 'cover',
      borderRadius: "50%",
    },
    "& p": {
      margin: 0,
      marginLeft: 8,
      backgroundColor: "#f4f7f9",
      borderRadius: 10,
      padding: 15,
      // maxWidth: "70%",
      width: "fit-content",
      textAlign: "left"
    },
    "& small": {
      margin: 0,
      marginLeft: 8
    }
  },
  writeMessage: {
    display: 'flex',
    minHeight: 45,
    alignItems: 'center',
    padding: '0 10px',
    boxShadow: theme.shadows[2],
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
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

function App(props) {
  const api = new API()
  const classes = useStyles();
  const { consultationDetails, avatar } = props;
  // const [message, setMessage] = useState('')
  const [receivedMessage, setReceivedMessage] = useState("")
  const [msg, setMsg] = useState("")

  const [allMessage, setAllMessage] = useState([])
  const [checked, setChecked] = React.useState(false);

  const messageRef = useRef();
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const currentUid = 'doctor' + '_' + consultationDetails.doctor_id;

  const guestUid = 'patient' + '_' + consultationDetails.patient_id;

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
    }
  })

  useEffect(() => {
    try {
      console.log("currentUid", currentUid)
      console.log("guestUid", guestUid)
      firebase.database().ref('messages').
        child(currentUid).
        child(guestUid).
        on('value', (dataSnapshot) => {
          let message = [];
          message.splice(0, message.length)
          if (message.length == 0) {
            dataSnapshot.forEach((data) => {
              message.push({
                sendBy: data.val().message.sender,
                recieveBy: data.val().message.receiver,
                msg: data.val().message.msg,
                time_stamp: data.val().message.time_stamp
              })
            })
          }
          message.reverse()
          setAllMessage(message.reverse())
          // if (allMessage[allMessage.length - 1].sendBy == guestUid) {
          //   addResponseMessage(allMessage[allMessage.length - 1].msg)
          // }
          // if (allMessage[allMessage.length - 1].recieveBy == currentUid) {
          //   addResponseMessage(allMessage[allMessage.length - 1].msg)
          // } else {
          //   allMessage.map((message) => {
          //     if (message.recieveBy == currentUid) {
          //       addResponseMessage(message.msg)
          //     } else {
          //       addUserMessage(message.msg)
          //     }
          //   })
          // }
          // allMessage.map((message) => {
          //   if (message.recieveBy == currentUid) {
          //     addResponseMessage(message.msg)
          //   } else {
          //     addUserMessage(message.msg)
          //   }
          // })
        })
    }

    catch (error) {
      console.log('error in chat fetch', error);
    }
  }, [])

  const time_stamp = moment().format();

  function toTimestamp(strDate) {
    // var datum = Date.parse(strDate);
    // return datum / 1000;
    const today = new Date(strDate)
    let hours = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()
    let minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()
    return (hours + ":" + minutes)
  }

  const sendUserMessage = (e) => {
    e.preventDefault()
    // Now send the message throught the backend API
    if (msg !== '') {
      SendMessage(currentUid, guestUid, msg, time_stamp).
        then(() => {
          api.ACCOUNTS_URI().post("appointments/consultation/chatNotification", {
            appointment_id: consultationDetails.id,
            message: msg
          })
            .then((resp) => {
              if (resp.data.success) {
                console.log("success")
              } else {
                console.log("success")
              }
            })
            .catch((error) => {
              console.log(error)
            })
          setMsg("")
        }).
        catch((error) => {
          console.log(error)
        })
    }

    ReceiveMessage(currentUid, guestUid, msg, time_stamp).
      then(() => {
        console.log("success")
      }).
      catch((error) => {
        console.log(error)
      })
  };

  return (
    <div className="App">
      {/* <Widget
      handleNewUserMessage={handleNewUserMessage}
      title={`${consultationDetails.patient.first_name} ${consultationDetails.patient.last_name}`}
      subtitle=""
      profileAvatar={avatar}
    /> */}
      <Fab
        onClick={handleChange}
        className={classes.fab}
        color="primary"
        aria-label="add"
      >
        <Chat />
      </Fab>
      <div className={classes.container}>
        <Collapse in={checked}>
          <Paper elevation={2} className={classes.paper}>
            <header className={classes.chatHeader}>
              <h3>{consultationDetails.patient.first_name} {consultationDetails.patient.last_name}</h3>
            </header>
            <div className={classes.conversation}>
              {
                (allMessage.length !== 0) && (
                  allMessage.map((message) => {
                    return (message.recieveBy == guestUid) ? (
                      <div className={classes.myMsg}>
                        <p>{message.msg}</p>
                        <small>{toTimestamp(message.time_stamp)}</small>
                      </div>
                    ) : (
                      <div className={classes.userMsg}>
                        <div>
                          <img
                            src={avatar}
                            width="40"
                            height="40"
                          />
                        </div>
                        <div>
                          <p>{message.msg}</p>
                          <small>{toTimestamp(message.time_stamp)}</small>
                        </div>
                      </div>
                    )
                  }))
              }
              <div ref={messageRef}></div>
            </div>
            <form onSubmit={sendUserMessage} action="">
              <div className={classes.writeMessage}>
                <input
                  type="text"
                  placeholder="Type your message"
                  maxLength="255"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />
                <Tooltip id="tooltip-send" title="Send">
                  <div>
                    <IconButton
                      mini="true"
                      color="primary"
                      className={classes.sendBtn}
                      onClick={sendUserMessage}
                    >
                      <Send />
                    </IconButton>
                  </div>
                </Tooltip>
              </div>
            </form>
          </Paper>
        </Collapse>
      </div>
    </div>
  );
}

export default App;
