import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/axios';
import { showErrorAlert } from '../../components/Dialog';
import { format } from 'date-fns';
import { useTicketOrderContext } from '../../context/TicketOrderContext';

const EventInfo = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
    const { addTicketOrder, addProductToCart } = useTicketOrderContext();

    useEffect(() => {
        const fetchEventById = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`/api/eventos/${id}`);
                setEvent(response.data.event);
                setTickets(response.data.event.ticket);
                const initialQuantities = {};
                response.data.event.ticket.forEach(ticket => {
                    initialQuantities[ticket.id] = 0;
                });
                setQuantities(initialQuantities);
            } catch (error) {
                showErrorAlert("Erro ao buscar o evento");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchCategoriesAndProducts = async () => {
            const response = await api.get(`/api/categorias/evento/${id}`);
            setCategories(response.data);
        };

        fetchCategoriesAndProducts();
        fetchEventById();
    }, [id]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(Number(event.target.value));
    };

    const handleQuantityChange = (ticketId, change) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [ticketId]: Math.max(0, Math.min(10, prevQuantities[ticketId] + change)),
        }));
    };

    const handleBuyTickets = (ticketId) => {
        const selectedTicket = tickets.find(ticket => ticket.id === ticketId);
        const quantity = quantities[ticketId];

        if (quantity > 0) {
            const orderTicket = {
                ticket_id: selectedTicket.id,
                quantity: quantity,
                price: selectedTicket.price,
                name: selectedTicket.ticket_type
            };
            addTicketOrder(orderTicket);
        } else {
            showErrorAlert("Selecione pelo menos um ingresso");
        }
    };

    const handleAddProductToCart = (product) => {
        const orderProduct = {
            product_id: product.id,
            quantity: 1,
            price: product.price,
            name: product.name
        };
        addProductToCart(orderProduct);
    };

    return (
        <div>
            {/* Header */}
            <div className="relative w-full bg-cover bg-center h-[400px] md:h-[600px]"
                style={{ backgroundImage: `url(${event.image})` }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <div className="max-w-screen-lg mx-auto p-4 mt-8 mb-16 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Primeira coluna (Descrição e Tickets) */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold">{event.title}</h2>
                    <p className="mt-4 text-lg">{event.description}</p>
                    <p className="mt-4 text-gray-600">
                        Data: {event.start_date ? format(new Date(event.start_date), 'dd/MMM/yy') : 'Data inválida'}
                    </p>
                    <p className="text-gray-600">Local: {event.location}</p>
                </div>

                {/* Segunda coluna (Ingressos) */}
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <h3 className="text-lg font-bold mb-2">Escolha seus ingressos:</h3>
                    <div className="bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        {tickets.map((ticket) => (
                            <div key={ticket.id} className="flex items-center justify-between border-b py-2">
                                <div className="flex flex-col">
                                    <p className="text-sm font-bold">{ticket.ticket_type}</p>
                                    <p className="text-sm text-red-600">R${ticket.price.toFixed(2)}</p>
                                    <p className="text-xs text-gray-600">Disponível: {ticket.available_quantity}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="px-2 py-1 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200 transition"
                                        onClick={() => handleQuantityChange(ticket.id, -1)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={quantities[ticket.id]}
                                        max={10}
                                        min={0}
                                        className="w-10 text-center border border-gray-300 rounded focus:outline-none"
                                        readOnly
                                    />
                                    <button
                                        className="px-2 py-1 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200 transition"
                                        onClick={() => handleQuantityChange(ticket.id, 1)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="ml-2 px-3 py-1 bg-primary text-white text-sm font-semibold rounded hover:bg-red-500 transition duration-300"
                                        onClick={() => handleBuyTickets(ticket.id)}
                                    >
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Categorias de Produtos */}
            <div className="max-w-screen-lg mx-auto p-4 mt-8 mb-16 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-2xl font-bold mb-4 text-center">Categorias do Evento:</h3>

                    {/* Select para escolher a categoria */}
                    <div className="mb-6">
                        <label htmlFor="categorySelect" className="text-lg font-semibold text-gray-700">Escolha uma categoria:</label>
                        <select
                            id="categorySelect"
                            value={selectedCategory || ''}
                            onChange={handleCategoryChange}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-700 focus:outline-none"
                        >
                            <option value="" disabled>Selecione uma categoria</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id} className="bg-gray-100 hover:bg-gray-200 hover:text-gray-800">
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Listar produtos da categoria selecionada */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Produtos Disponíveis:</h3>
                        {selectedCategory ? (
                            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {categories
                                    .find(category => category.id === selectedCategory)
                                    ?.produto.map((product) => (
                                        <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm">
                                            <p className="text-sm font-semibold">{product.name}</p>
                                            <p className="text-sm text-red-600">R${product.price.toFixed(2)}</p>
                                            <button
                                                className="mt-2 bg-primary text-white py-1 px-2 rounded-lg w-full md:w-auto flex items-center justify-center space-x-2 hover:bg-red-500 transition-colors duration-300"
                                                onClick={() => handleAddProductToCart(product)}
                                            >
                                                <span>Adicionar</span>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">Selecione uma categoria para ver os produtos.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventInfo;
