import React, { useEffect, useState } from "react";
import {
    AgoraVideoPlayer,
    createClient,
    createMicrophoneAndCameraTracks,
    ClientConfig,
    IAgoraRTCRemoteUser,
    ICameraVideoTrack,
    IMicrophoneAudioTrack,
} from "agora-rtc-react";
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';

const config = {
    mode: "rtc", codec: "vp8",
};

const appId = "d172d2b27aa644fcbcab842c6a4b5786"; //ENTER APP ID HERE
const token = "006d172d2b27aa644fcbcab842c6a4b5786IAD4z4poUnrRiNlVzeCeUS+7inxiBpUwZ5MT08+F/GECbC17Z+oAAAAAEACHtvL/0yN/YQEAAQDTI39h";

const useStyles = makeStyles((theme) => ({
    callBtn: {
        background: '#5b9bd3',
        color: 'white',
        marginRight: 5,
        '&:hover': {
            background: '#5b9bd3'
        }
    },
}));

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

function NewVideoCall() {
    const classes = useStyles();
    const [inCall, setInCall] = useState(false);
    const [channelName, setChannelName] = useState("");
    const [call, setCall] = React.useState(false);
    const handleCallOpen = () => {
        setCall(true);
    };

    const handleCallClose = () => {
        setCall(false);
    };
    return (
        <>
            <Button variant="contained" className={classes.callBtn} color="inherit" onClick={handleCallOpen}>
                Start Video call
            </Button>
            <Dialog
                open={call}
                onClose={handleCallClose}
                hideBackdrop={true}
                fullWidth
                maxWidth={'xl'}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                style={{ position: 'sticky' }}
            >
                <DialogTitle style={{ cursor: 'move', marginBottom: 8, paddingTop: 8, paddingBottom: 8 }} id="draggable-dialog-title">
                    Video Call
                </DialogTitle>
                <DialogContent>
                    <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
                    {inCall ? (
                        <VideoCall setInCall={setInCall} channelName={channelName} />
                    ) : (
                        <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
                    )}                    
                </DialogContent>
            </Dialog>
        </>
    );
};

// the create methods in the wrapper return a hook
// the create method should be called outside the parent component
// this hook can be used the get the client/stream in any component
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = (props) => {
    const { setInCall, channelName } = props;
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    // using the hook to get access to the client object
    const client = useClient();
    // ready is a state variable, which returns true when the local tracks are initialized, untill then tracks variable is null
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    useEffect(() => {
        // function to initialise the SDK
        let init = async (name) => {
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                console.log("subscribe success");
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return [...prevUsers, user];
                    });
                }
                if (mediaType === "audio") {
                    user.audioTrack.play();
                }
            });

            client.on("user-unpublished", (user, type) => {
                console.log("unpublished", user, type);
                if (type === "audio") {
                    user.audioTrack.stop();
                }
                if (type === "video") {
                    setUsers((prevUsers) => {
                        return prevUsers.filter((User) => User.uid !== user.uid);
                    });
                }
            });

            client.on("user-left", (user) => {
                console.log("leaving", user);
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            });

            await client.join(appId, name, token, null);
            if (tracks) await client.publish([tracks[0], tracks[1]]);
            setStart(true);

        };

        if (ready && tracks) {
            console.log("init ready");
            init(channelName);
        }

    }, [channelName, client, ready, tracks]);


    return (
        <div className="App">
            {ready && tracks && (
                <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
            )}
            {start && tracks && <Videos users={users} tracks={tracks} />}
        </div>
    );
};

const Videos = (props) => {
    const { users, tracks } = props;

    return (
        <div>
            <div id="videos">
                {/* AgoraVideoPlayer component takes in the video track to render the stream,
            you can pass in other props that get passed to the rendered div */}
                <AgoraVideoPlayer style={{ height: '95%', width: '95%' }} className='vid' videoTrack={tracks[1]} />
                {users.length > 0 &&
                    users.map((user) => {
                        if (user.videoTrack) {
                            return (
                                <AgoraVideoPlayer style={{ height: '95%', width: '95%' }} className='vid' videoTrack={user.videoTrack} key={user.uid} />
                            );
                        } else return null;
                    })}
            </div>
        </div>
    );
};

export const Controls = (props) => {
    const client = useClient();
    const { tracks, setStart, setInCall } = props;
    const [trackState, setTrackState] = useState({ video: true, audio: true });

    const mute = async (type) => {
        if (type === "audio") {
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState((ps) => {
                return { ...ps, audio: !ps.audio };
            });
        } else if (type === "video") {
            await tracks[1].setEnabled(!trackState.video);
            setTrackState((ps) => {
                return { ...ps, video: !ps.video };
            });
        }
    };

    const leaveChannel = async () => {
        await client.leave();
        client.removeAllListeners();
        // we close the tracks to perform cleanup
        tracks[0].close();
        tracks[1].close();
        setStart(false);
        setInCall(false);
    };

    return (
        <div className="controls">
            <p className={trackState.audio ? "on" : ""}
                onClick={() => mute("audio")}>
                {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
            </p>
            <p className={trackState.video ? "on" : ""}
                onClick={() => mute("video")}>
                {trackState.video ? "MuteVideo" : "UnmuteVideo"}
            </p>
            {<p onClick={() => leaveChannel()}>Leave</p>}
        </div>
    );
};

const ChannelForm = (props) => {
    const { setInCall, setChannelName } = props;

    return (
        <form className="join">
            {appId === '' && <p style={{ color: 'red' }}>Please enter your Agora App ID in App.tsx and refresh the page</p>}
            <input type="text"
                placeholder="Enter Channel Name"
                onChange={(e) => setChannelName(e.target.value)}
            />
            <button onClick={(e) => {
                e.preventDefault();
                setInCall(true);
            }}>
                Join
            </button>
        </form>
    );
};

export default NewVideoCall;