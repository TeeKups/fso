import { useContext,  Fragment } from 'react';
import { NotificationContext, notificationKind, notifyError, notifyInfo } from './components/Notifications';


export const App = () => {
    console.log("rendering App");
    const notificationContext = useContext(NotificationContext);
    console.log("using NotificationContext in App");

    const { notifyInfo, notifyError } = notificationContext;
    return (
        <Fragment>
            <h1>Notificator</h1>
            <div>
                <button onClick={() => { notifyInfo("Informational info message") }}>More info</button>
            </div>
            <div>
                <button onClick={() => { notifyError("Erroneus error message") }}>More error</button>
            </div>
            <div>
                <p>{notificationContext.count} notifications</p>
            </div>
        </Fragment>
    );
};
