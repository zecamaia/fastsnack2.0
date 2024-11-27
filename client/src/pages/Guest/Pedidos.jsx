import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import api from '../../../services/axios';
import Modal from '../../components/Modal';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user'));
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setIsModalOpen(false);
    };
    useEffect(() => {
        const fetchUserOrders = async () => {
            const response = await api.get(`/api/pedidos/user/${userId.id}`);
            console.log(response.data)
            setOrders(response.data)
        }
        fetchUserOrders()
    }, [])

    return (
        <div className='max-w-screen-lg mx-auto p-4 mt-36'>
            <div className='flex sm:justify-center md:justify-center lg:justify-start'>
                <h1 className='text-3xl text-primary font-bold sm:text-3xl md:text-3xl'>Meus pedidos</h1>
            </div>
            {orders.length > 0 ? (
                <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10'>
                    {orders.map((order) => (
                        <div key={order.id}
                            className='flex flex-col p-4 bg-gray-50 shadow-lg rounded-md mb-6 border-l-4 border-primary'>
                            <div className='flex items-center justify-between mb-4'>
                                <div>
                                    <h1 className='text-lg font-medium text-gray-900 mb-1'>Pedido #{order.id}</h1>
                                    <p className='text-sm text-gray-600'>Status:
                                        <span className={
                                            `px-2 py-1 rounded-md text-sm font-semibold
                                        ${order.status === 'pendente' ? 'text-yellow-700 bg-yellow-100' :
                                                order.status === 'cancelado' ? 'text-red-600 bg-red-100' :
                                                    order.status === 'pago' ? 'text-green-600 bg-green-100' : ''}`
                                        }>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </p>
                                </div>
                                {order.qr_code_url && (
                                    <QRCodeCanvas
                                        value={order.qr_code_url} // URL do QR Code
                                        size={80} // Reduzindo o tamanho do QR Code
                                        level="H" // Nível de correção de erro
                                    />
                                )}
                            </div>

                            <div className='my-4'>
                                <p className='text-sm text-gray-600'>Total: <span className='font-semibold text-gray-800'>R$ {order.total}</span></p>
                            </div>
                            <button
                                onClick={() => openModal(order)}
                                className='mt-auto px-4 py-2 bg-primary text-white rounded-md'>
                                Ver detalhes
                            </button>
                        </div>
                    ))}
                    <Modal onClose={closeModal} isOpen={isModalOpen} order={selectedOrder} />
                </div>
            ) : (
                <div className='flex justify-center my-10'>
                    <p className='text-center text-xl'>Não há ingressos ou produtos disponíveis</p>
                </div>
            )}
        </div>
    );
}

export default Orders;
