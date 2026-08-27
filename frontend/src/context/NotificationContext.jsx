import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

import { useAuth } from "./AuthContext";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {

    const { user } = useAuth();

    const userId = user?.id;

    const storageKey = userId
        ? `spendigo_notifications_${userId}`
        : null;

    const [notifications, setNotifications] = useState([]);

    // Load notifications for the authenticated user
    useEffect(() => {

        if (!storageKey) {
            setNotifications([]);
            return;
        }

        const saved = localStorage.getItem(
            storageKey
        );

        try {

            setNotifications(
                saved
                    ? JSON.parse(saved)
                    : []
            );

        } catch {

            setNotifications([]);
        }

    }, [storageKey]);

    // Save notifications for the authenticated user
    useEffect(() => {

        if (!storageKey) {
            return;
        }

        localStorage.setItem(
            storageKey,
            JSON.stringify(notifications)
        );

    }, [notifications, storageKey]);

    function addNotification(message) {

        const notification = {
            id: Date.now(),
            message,
            created_at:
                new Date().toISOString(),
            read: false,
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
                notification =>
                    notification.id !== id
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
                markAllAsRead,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    return useContext(NotificationContext);
}