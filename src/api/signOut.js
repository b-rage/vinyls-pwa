import { firebaseApp } from '../firebase';


export default () => {
    firebaseApp.auth().signOut()
        .then(() => {
            console.log('user logged out');
        })
        .catch(err => {
            console.log('err', err);
        })
}