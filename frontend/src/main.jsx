import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";

import { StrictMode } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import { Toaster } from "sonner"; 
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <NotificationProvider>
                    <App />
                    <Toaster
                        position="top-center"
                        richColors
                        duration={3000}
                    />
                </NotificationProvider>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
);