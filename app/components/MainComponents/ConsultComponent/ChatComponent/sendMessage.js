import Firebase from '../../../../firebase/firebase'
export const SendMessage = async (currentUid, guestUid, message, time_stamp) => {
    try {
        return await Firebase.database()
            .ref('messages/' + currentUid).
            child(guestUid)
            .push({
                message: {
                    sender: currentUid,
                    receiver: guestUid,
                    msg: message,
                    time_stamp: time_stamp
                },
            })
    }
    catch (error) {
        return error
    }
}
export const ReceiveMessage = async (currentUid, guestUid, message, time_stamp) => {
    try {

        return await Firebase.database()
            .ref('messages/' + guestUid).
            child(currentUid)
            .push({
                message: {
                    sender: currentUid,
                    receiver: guestUid,
                    msg: message,
                    time_stamp: time_stamp
                },
            })
    }
    catch (error) {
        return error
    }
}
