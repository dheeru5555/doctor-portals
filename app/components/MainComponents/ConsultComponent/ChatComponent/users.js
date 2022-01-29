import Firebase from './firebaseConfig'

export const AddUser = async (name, mobile, image, uid) => {

    console.log('entered into add user firebase', name, mobile, image, uid);
    try {

        return await Firebase.database().ref('/doctor/' + uid,).set({
            name: name,
            mobile: mobile,
        })

    } catch (error) {
        return error;
    }

}