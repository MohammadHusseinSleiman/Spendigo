import { createContext, useContext, useState } from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {

    const [notifications, setNotifications] = useState([]);

    function addNotification(title) {

        const notification = {
            id: Date.now(),
            title,
            time: "Just now",
        };

        setNotifications(previous => [
            notification,
            ...previous,
        ]);
    }

    function clearNotifications() {
        setNotifications([]);
    }

    return (

        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                clearNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>

    );

}

export function useNotifications() {

    return useContext(NotificationContext);

}