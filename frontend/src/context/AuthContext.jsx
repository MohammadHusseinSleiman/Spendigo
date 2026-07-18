import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({
    children
}) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token =
            localStorage.getItem("token");

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

    }

    function logout() {

        localStorage.removeItem(
            "token"
        );
        setUser(null);

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
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