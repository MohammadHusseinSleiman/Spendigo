import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import settingsService from "../services/settingsService";
import { applyTheme } from "../utils/theme";

import { useTheme } from "./ThemeContext";

import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { resetTheme } = useTheme();

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }
        fetchUser();

    }, []);

    async function fetchUser() {

        try {

            const response =
                await api.get(
                    "/auth/me.php"
                );

            setUser(
                response.data.data
            );

            // Load saved theme preference
            try {

                const preferences = await settingsService.getPreferences();

                applyTheme(
                    preferences.dark_mode ?? false
                );

            } catch {
                // Keep current theme.
            }

        } catch {
            logout();
        } finally {
            setLoading(false);
        }
    }

    async function login(data) {

        const response =
            await api.post(
                "/auth/login.php",
                data
            );

        const {
            token,
            user
        } = response.data.data;

        localStorage.setItem(
            "token",
            token
        );

        setUser(user);

        // Load user's saved application preferences
        try {

            const preferences = await settingsService.getPreferences();

            applyTheme(
                preferences.dark_mode ?? false
            );

        } catch {

            // Keep the current theme if preferences
            // cannot be loaded.
        }
    }

async function register(data) {

    const response =
        await api.post(
            "/auth/register.php",
            data
        );

    return response.data;
}

    function logout() {

        localStorage.removeItem("token");
        resetTheme();
        setUser(null);
    }

    function updateUser(data) {
        setUser(previous => ({
            ...previous,
            ...data,
        }));
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                updateUser,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    return useContext(
        AuthContext
    );

}