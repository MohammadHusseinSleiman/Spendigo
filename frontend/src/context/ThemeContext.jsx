import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import settingsService from "../services/settingsService";
import { applyTheme } from "../utils/theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {

    const [darkMode, setDarkMode] = useState(() =>
        document.documentElement.classList.contains("dark")
    );

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        applyTheme(darkMode);

    }, [darkMode]);

    async function setTheme(value) {

        const previousMode = darkMode;

        // Update UI immediately
        setDarkMode(value);

        setLoading(true);

        try {

            await settingsService.updatePreferences({
                dark_mode: value,
            });

        } catch (error) {

            // Revert UI if saving fails
            setDarkMode(previousMode);

            throw error;

        } finally {

            setLoading(false);

        }
    }

    async function toggleTheme() {

        await setTheme(!darkMode);

    }

    function resetTheme() {

        setDarkMode(false);
        applyTheme(false);

    }

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                setTheme,
                toggleTheme,
                resetTheme,
                loading,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {

    return useContext(ThemeContext);

}