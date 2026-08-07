import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext(null);
const STORAGE_KEY = "spendigo_notifications";

export function NotificationProvider({ children }) {

    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved
            ? JSON.parse(saved)
            : [];
    });

    useEffect(() => {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(notifications)
        );

    }, [notifications]);

    function addNotification(message) {

        const notification = {
            id: Date.now(),
            message,
            created_at: new Date().toISOString(),
            read: false
        };

        setNotifications(previous => [
            notification,
            ...previous,
        ]);
    }

    function clearNotifications() {
        setNotifications([]);
    }

    function removeNotification(id) {

        setNotifications(previous =>
            previous.filter(
                notification => notification.id !== id
            )
        );
    }

    function markAsRead(id) {

        setNotifications(previous =>
            previous.map(notification =>
                notification.id === id
                    ? {
                        ...notification,
                        read: true,
                    }
                    : notification
            )
        );
    }

    function markAllAsRead() {

        setNotifications(previous =>
            previous.map(notification => ({
                ...notification,
                read: true,
            }))
        );
    }

    return (

        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                clearNotifications,
                removeNotification,
                markAsRead,
                markAllAsRead
            }}
        >
            {children}
        </NotificationContext.Provider>

    );

}

export function useNotifications() {

    return useContext(NotificationContext);

}