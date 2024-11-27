import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
        setLoading(false);
    }


    useEffect(() => {
        checkAuth();
    }, []);
    const login = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoggedIn(true);
        setUser(userData);
    }

    const logout = () => {
        setLoading(true)
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('ticketOrders')
        localStorage.removeItem('productOrders')
        localStorage.removeItem('userData')
        window.location.reload();
        setIsLoggedIn(false);
        setUser(null);
        setLoading(false)
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);



