import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "sonner"; 
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <App />
            <Toaster
                position="top-center"
                richColors
                duration={3000}
            />
        </AuthProvider>
    </StrictMode>
);