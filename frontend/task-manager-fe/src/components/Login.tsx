import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { login } from "../services/AuthService";
import "./LoginAndRegister.css";

export default function Login() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        setEmailError("");
        setPasswordError("");

        if (!isValidEmail(email)) {
            setEmailError("Invalid email format");
            return;
        }

        if (password.length < 5) {
            setPasswordError("Password must be at least 5 characters");
            return;
        }
        try {
            const data = await login(email, password);
            if (data) {
                enqueueSnackbar("Successfully logged in!", {
                    variant: "success",
                    autoHideDuration: 2000,
                });
                setTimeout(() => {
                    navigate("/tasks");
                }, 2000);
            } else {
                enqueueSnackbar(`Login failed!`, {
                    variant: "error",
                    autoHideDuration: 3000,
                });
            }
        } catch (error) {
            console.error(error);
            enqueueSnackbar("Login failed", {
                variant: "error",
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                    <div className="error-message">{emailError}</div>
                )}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                    <div className="error-message">{passwordError}</div>
                )}
                <p className="signup-link">
                    Don't have an account? <a href="/register">Sign Up</a>
                </p>
                <button className="login-button" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
}
