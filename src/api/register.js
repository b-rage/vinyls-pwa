import { firebaseApp, userRef } from '../firebase';



export default (email, password, username) => {
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then(data => {

            if(!username) {
                return false;
            }

            userRef.child(data.user.uid).set({
                email: email,
                username: username
            });

            return true;
        })
        .catch(err => {
            console.log('err', err);
            return err;
        })
}