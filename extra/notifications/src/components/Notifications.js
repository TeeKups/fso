import { createContext, useEffect, useState, Fragment } from 'react';

const NOTIFICATION_TIMEOUT = 2500; // ms

const notificationKind = {
    INFO: 'INFO',
    ERROR: 'ERROR',
};

const NotificationContext = createContext({
    notifications: [],
    notify: (kind, text) => {},
    count: 0,
    notifyInfo: (text) => {},
    notifyError: (text) => {},
});

const Notification = (props) => {
    return (
        <div className={"toast "+props.kind.toLowerCase()}>{props.kind}: <p>{props.text}</p></div>
    );
};

const Notifications = (props) => {
    const { notifications } = props;
    return notifications.map(notification => (
        <Notification key={notification.id} kind={notification.kind} text={notification.text} />
    ));
};

const NotificationProvider = (props) => {
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        if (notifications.length === 0) {
            return;
        }
        const next_expiry = notifications.reduce((acc, cur) => Math.min(acc, cur.expires - Date.now()), Infinity );
        const timer = setTimeout(() => {
            setNotifications( notifications.filter(notification => notification.expires > Date.now() ));
            setNotificationCount( notificationCount - 1 );
        }, next_expiry);
        return () => clearTimeout(timer);
    }, [notifications, notificationCount]);

    const getNotificationId = () => {
        do {
            let id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
            if ( ! notifications.some((notification) => notification.id === id) ) {
                return id;
            }
        } while (true);
    };

    const notify = (kind, text) => {
        const id = getNotificationId();
        console.log(`${kind}: ${text}`);
        setNotifications( notifications.concat({ id, kind, text, expires: Date.now() + NOTIFICATION_TIMEOUT }) );
        setNotificationCount( notifications.length + 1);
    };

    // Note: this overrides the default notify-function
    return (
        <NotificationContext.Provider value={{
            notifications,
            count: notificationCount,
            notify,
            notifyInfo: (text) => {notify(notificationKind.INFO, text)},
            notifyError: (text) => {notify(notificationKind.ERROR,text)},
        }}>
            <div className="toast-area">
                <Notifications notifications={notifications}/>
            </div>
            {props.children}
        </NotificationContext.Provider>
    );
};

export {
    NotificationContext,
    NotificationProvider,
    notificationKind,
};
