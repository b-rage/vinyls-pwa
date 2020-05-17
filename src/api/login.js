import { firebaseApp, userRef } from '../firebase';


export default (email, password) => {
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .then((data) => {

            userRef.child(data.user.uid).once('value', snapshot => {
                console.log('snapshot.val()', snapshot.val())
                return snapshot.val();
            });
        })
        .catch(err => {
            console.log('err', err);
            return err;
        })
}