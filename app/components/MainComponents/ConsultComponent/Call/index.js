import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import { options, rtc } from "./constants";
import { makeStyles } from '@material-ui/core/styles';
import './Call.css';
import Fab from '@material-ui/core/Fab';
import CallEnd from '@material-ui/icons/CallEnd';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import API from '../../../../helpers/api';

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

function Call(props) {
    const classes = useStyles();
    const { tokenId, channelName, appointmentId } = props;
    const api = new API()
    const [call, setCall] = React.useState(false);

    const handleCallOpen = () => {
        setCall(true);
    };

    const handleCallClose = () => {
        setCall(false);
    };

    async function handleSubmit(e) {
        try {
            if (channelRef.current.value === "") {
                return console.log("Please Enter Channel Name");
            }

            setJoined(true);
            setCall(true);

            rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
            const uid = await rtc.client.join(
                options.appId,
                channelName,
                tokenId,
                // channelRef.current.value,
                // options.channel,
                // options.token,
                null
            );

            // Create an audio track from the audio captured by a microphone
            rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            // Create a video track from the video captured by a camera
            rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

            rtc.localVideoTrack.play("local-stream");

            rtc.client.on("user-published", async (user, mediaType) => {
                // Subscribe to a remote user
                await rtc.client.subscribe(user);
                console.log("subscribe success");

                if (mediaType === "video" || mediaType === "all") {
                    // Get `RemoteVideoTrack` in the `user` object.
                    const remoteVideoTrack = user.videoTrack;

                    // Dynamically create a container in the form of a DIV element for playing the remote video track.
                    const PlayerContainer = React.createElement("div", {
                        id: user.uid,
                        className: "stream",
                    });
                    ReactDOM.render(
                        PlayerContainer,
                        document.getElementById("remote-stream")
                    );

                    user.videoTrack.play(`${user.uid}`);
                }

                if (mediaType === "audio" || mediaType === "all") {
                    // Get `RemoteAudioTrack` in the `user` object.
                    const remoteAudioTrack = user.audioTrack;
                    // Play the audio track. Do not need to pass any DOM element
                    remoteAudioTrack.play();
                }
            });

            rtc.client.on("user-unpublished", (user) => {
                // Get the dynamically created DIV container
                const playerContainer = document.getElementById(user.uid);
                // Destroy the container
                playerContainer.remove();
            });

            // Publish the local audio and video tracks to the channel
            await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

            console.log("publish success!");

            api.ACCOUNTS_URI().post("appointments/consultation/initateCall", {
                appointment_id: appointmentId,
                agora_channel: channelName,
                agora_token: tokenId,
                initiated: true
            })
            .then((resp) => {
                console.log(resp)
            })
            .catch((err) => console.log(err))

        } catch (error) {
            console.error(error);
        }
    }

    async function handleLeave() {
        try {
            const localContainer = document.getElementById("local-stream");

            rtc.localAudioTrack.close();
            rtc.localVideoTrack.close();

            setJoined(false);
            localContainer.textContent = "";

            // Traverse all remote users
            rtc.client.remoteUsers.forEach((user) => {
                // Destroy the dynamically created DIV container
                const playerContainer = document.getElementById(user.uid);
                playerContainer && playerContainer.remove();
            });

            // Leave the channel
            await rtc.client.leave();
            handleCallClose();
        } catch (err) {
            console.error(err);
        }
    }
    const [joined, setJoined] = useState(false);
    const channelRef = useRef("");
    const remoteRef = useRef("");
    const leaveRef = useRef("");

    return (
        <>
            <Button variant="contained" className={classes.callBtn} color="inherit" onClick={handleSubmit}>
                Video call
            </Button>
            <Dialog
                open={call}
                hideBackdrop={true}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                style={{ position: 'sticky' }}
            >
                <DialogTitle style={{ cursor: 'move', marginBottom: 8, paddingTop: 8, paddingBottom: 8 }} id="draggable-dialog-title">
                    Video Call
                </DialogTitle>
                <DialogContent>
                    {/* <CallComponent handleCallClose={handleCallClose} tokenId={props.consultationDetails.agora_token} channelName={props.consultationDetails.agora_channel} /> */}
                    <div style={{ position: 'relative' }}>

                        {joined ? (
                            <>
                                <div className="stream-cont">
                                    <div id="local-stream" className="stream local-stream"></div>
                                    <div
                                        id="remote-stream"
                                        ref={remoteRef}
                                        className="stream remote-stream"
                                    ></div>
                                </div>
                                <Fab
                                    size="small"
                                    color="secondary"
                                    aria-label="add"
                                    onClick={handleLeave}
                                    style={{ position: 'absolute', bottom: 16, transform: 'translate(300%, -50%)' }}
                                >
                                    <CallEnd />
                                </Fab>
                                {/* <input
                                        type="button"
                                        ref={leaveRef}
                                        value="Leave"
                                        onClick={handleLeave}
                                        disabled={joined ? false : true}
                                    /> */}
                            </>
                        ) : (
                            <div className="container">
                                <input
                                    type="text"
                                    ref={channelRef}
                                    id="channel"
                                    placeholder="Enter Channel name"
                                />
                                {/* <input
                                        type="submit"
                                        value="Join"
                                        onClick={handleSubmit}
                                        disabled={joined ? true : false}
                                    /> */}
                                <Button onClick={handleSubmit} variant="contained" color="inherit" >
                                    Video call
                                </Button>
                                {/* <input
                                        type="button"
                                        ref={leaveRef}
                                        value="Leave"
                                        onClick={handleLeave}
                                        disabled={joined ? false : true}
                                    /> */}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

        </>
    );
}

export default Call;
