import React, {useEffect} from 'react';
import signOut from "../../../api/signOut";
import { WithStoreConsumer } from "../../store";


const Home = (props) => {

/*     useEffect(() => {
        setTimeout(() => props.context.setIsLoggedIn(props.isLoggedIn), 500);
      }, [props.isLoggedIn]); */

    const onLogout = () => {
        signOut();
    };

    return (
        <div>
            home
            <button onClick={onLogout}>logout</button>
        </div>
    )
}

export default WithStoreConsumer(Home);

