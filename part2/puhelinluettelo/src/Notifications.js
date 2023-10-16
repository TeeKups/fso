import { createContext, useState, Fragment } from 'react';

const NotificationContext = createContext({
    notifications: [],
    notify: (kind, text) => { console.log(`${kind}: ${text}`) },
});

const notificationKind = {
    INFO: 'INFO',
    ERROR: 'ERROR',
};

const notifyInfo = (text) => {
    NotificationContext.notify(notificationKind.INFO, text);
};

const notifyError = (text) => {
    NotificationContext.notify(notificationKind.ERROR, text);
};

const Notifications = (props) => {
    const { notifications } = props;
    return notifications.map(notification => (
        <div>`${notification.text}`</div>
    ));
};

const NotificationProvider = (props) => {
    const [notifications, setNotifications] = useState([]);

    const notify = (kind, text) => {
        setNotifications( [...notifications, {kind, text}] );
    };

    // Note: this overrides the default notify-function
    return (
        <NotificationContext.Provider value={{notifications, notify}}>  
            <Notifications notifications={notifications}/>
        </NotificationContext.Provider>
    );
};

export {
    NotificationContext,
    NotificationProvider,
    notificationKind,
    notifyInfo,
    notifyError,
};
