import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    AgoraVideoPlayer,
    createClient,
    createMicrophoneAndCameraTracks,
} from "agora-rtc-react";




const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialog: {
        '& .MuiDialog-paperWidthXl': {
            height: '100%'
        }
    }
});

const config = {
    mode: "rtc", codec: "vp8",
};

const appId = "d172d2b27aa644fcbcab842c6a4b5786"; //ENTER APP ID HERE
const token = "006d172d2b27aa644fcbcab842c6a4b5786IABRbT1msoQo/wphcEtZzMk6wqPyKZBIX204aNUQB9n37tAj6N8AAAAAEACY31JUtq+SYQEAAQC2r5Jh";

function LockScreen(props) {
    const { classes } = props;
    const [inCall, setInCall] = useState(false);
    const [channelName, setChannelName] = useState("");

    return (
        <>
            <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
            {inCall ? (
                <VideoCall setInCall={setInCall} channelName={channelName} />
            ) : (
                <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
            )}
        </>
    );
}

// LockScreen.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// const useClient = createClient(config);
// const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = (props) => {
    const { setInCall, channelName } = props;
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    // using the hook to get access to the client object
    // const client = useClient();
    const client = createClient(config);
    // ready is a state variable, which returns true when the local tracks are initialized, untill then tracks variable is null
    const { ready, tracks } = createMicrophoneAndCameraTracks();

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
                <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
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
    // const client = useClient();
    const client = createClient(config);

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

export default withStyles(styles)(LockScreen);
