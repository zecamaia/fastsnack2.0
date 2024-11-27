import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { filterMenuItens } from './Navbar';
import { NavbarMenu } from '../mocks/data';
import { Link, useNavigate } from 'react-router-dom';
import { PiShoppingCartThin } from 'react-icons/pi';

const ResponsiveMenu = ({ open, isLoggedIn, handleLogout }) => {
    const filteredNavbarMenu = filterMenuItens(NavbarMenu, isLoggedIn)
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/checkout'); // Substitua '/carrinho' pela rota desejada
    };
    return (
        <AnimatePresence mode='wait'>
            {
                open && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.3 }}
                        className='fixed top-20 left-0 w-full h-screen z-20'>
                        <div className='text-lg font-semibold uppercase bg-primary text-white py-10 m-6 rounded-xl'>
                            <ul className='flex flex-col justify-center items-center gap-10'>
                                {filteredNavbarMenu.map((item) => (
                                    <li key={item.id}>
                                        <Link to={item.link}>{item.title}</Link>
                                    </li>
                                ))}
                            </ul>
                            {isLoggedIn ? (
                                <div className='flex flex-col items-center gap-6 mt-8'>
                                    {/* Botão de logout */}
                                    <button
                                        onClick={handleLogout}
                                        className='px-4 py-2 bg-red-500 text-white rounded-md'>
                                        Logout
                                    </button>
                                    <button
                                        onClick={handleNavigate}
                                        className='px-4 py-2 bg-red-500 text-white rounded-md'>
                                        Meu carrinho
                                    </button>
                                </div>
                            ) : (
                                <div className='flex flex-col items-center gap-6 mt-8'>
                                    <Link
                                        to='/login'
                                        className='px-4 py-2 bg-red-500 text-white rounded-md'>
                                        Login
                                    </Link>

                                    <Link
                                        to='/cadastrar'
                                        className='px-4 py-2 bg-red-500 text-white rounded-md'>
                                        Cadastrar
                                    </Link>
                                </div>
                            )}
                        </div>


                    </motion.div>
                )
            }
        </AnimatePresence >
    )

}

export default ResponsiveMenu;

