import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../helpers/tokenHelper";

const AuthGuard = ({ children }: any) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authenticated = validateToken();
        setIsAuthenticated(authenticated);

        if (!authenticated) {
            navigate("/login");
        }
    }, [navigate]);

    return isAuthenticated ? children : null;
};

export default AuthGuard;
