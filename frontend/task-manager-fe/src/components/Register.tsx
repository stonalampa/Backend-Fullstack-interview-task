import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { register } from "../services/AuthService";
import "./LoginAndRegister.css";

export default function Register() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    };

    const handleRegister = async () => {
        setEmailError(""); // Reset email error message
        setPasswordError(""); // Reset password error message

        if (!isValidEmail(email)) {
            setEmailError("Invalid email format");
            return;
        }

        if (password.length < 5) {
            setPasswordError("Password must be at least 5 characters");
            return;
        }
        try {
            const data = await register(email, password);
            if ("error" in data) {
                enqueueSnackbar(`User registration failed!`, {
                    variant: "error",
                    autoHideDuration: 3000,
                });
            } else {
                enqueueSnackbar(
                    "Successfully registered! Redirecting to login page",
                    {
                        variant: "success",
                        autoHideDuration: 2000,
                    }
                );
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            console.error(error);
            enqueueSnackbar("Registration failed", {
                variant: "error",
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Register</h1>
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
                <button className="login-button" onClick={handleRegister}>
                    Register
                </button>
            </div>
        </div>
    );
}
