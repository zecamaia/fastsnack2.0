import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import { showConfirmAlert } from '../components/Dialog';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Layout() {

    const { logout, isLoggedIn, loading } = useAuth();
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault()
        showConfirmAlert({
            text: "Deseja mesmo sair?",
            confirmButtonText: "Sim, sair",
            cancelButtonText: "Não, cancelar",
            onConfirm: () => {
                logout();
                navigate('/');
            }
        });
    }
    useEffect(() => {
        if (!loading && !isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, loading, navigate]);

    if (loading) {
        return <div><Spinner /></div>
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <div className="flex flex-1">
                <main className="flex-1  bg-white">
                    {isLoggedIn ? <Outlet /> : null}
                </main>
            </div>
            <Footer />
        </div>
    )
}
