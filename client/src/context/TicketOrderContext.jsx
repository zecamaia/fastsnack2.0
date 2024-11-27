import { createContext, useContext, useEffect, useState } from "react";

const TicketOrderContext = createContext();

export const TicketOrderProvider = ({ children }) => {
    const [ticketOrders, setTicketOrders] = useState(() => {
        const savedOrders = JSON.parse(localStorage.getItem("ticketOrders"));
        return savedOrders || [];
    });
    const [productOrders, setProductOrders] = useState(() => {
        const savedOrders = JSON.parse(localStorage.getItem("productOrders"));
        return savedOrders || [];
    });

    useEffect(() => {
        if (ticketOrders.length > 0) {
            localStorage.setItem("ticketOrders", JSON.stringify(ticketOrders));
        } else {
            localStorage.removeItem("ticketOrders");
        }
        if (productOrders.length > 0) {
            localStorage.setItem("productOrders", JSON.stringify(productOrders));
        } else {
            localStorage.removeItem("productOrders");
        }
    }, [ticketOrders, productOrders]);

    const addTicketOrder = (newTicket) => {
        setTicketOrders((prevOrders) => {
            const existingTicket = prevOrders.find(
                (order) => order.ticket_id === newTicket.ticket_id
            );

            if (existingTicket) {
                // Se o ingresso já existir, atualiza a quantidade
                return prevOrders.map((order) =>
                    order.ticket_id === newTicket.ticket_id
                        ? { ...order, quantity: order.quantity + newTicket.quantity }
                        : order
                );
            } else {
                // Se for um novo ingresso, adiciona ao estado
                return [...prevOrders, { ...newTicket }];
            }
        });
    };

    const removeTicketOrder = (ticketId) => {
        setTicketOrders((prevOrders) =>
            prevOrders.filter((order) => order.ticket_id !== ticketId)
        );
    };

    const addProductToCart = (newProduct) => {
        setProductOrders((prevOrders) => {
            const existingProduct = prevOrders.find(
                (order) => order.product_id === newProduct.product_id
            );

            if (existingProduct) {
                // Se o produto já existir, atualiza a quantidade
                return prevOrders.map((order) =>
                    order.product_id === newProduct.product_id
                        ? { ...order, quantity: order.quantity + newProduct.quantity }
                        : order
                );
            } else {
                // Se for um novo produto, adiciona ao estado
                return [...prevOrders, { ...newProduct }];
            }
        });
    };

    const removeProductFromCart = (productId) => {
        setProductOrders((prevOrders) =>
            prevOrders.filter((order) => order.product_id !== productId)
        );
    };

    return (
        <TicketOrderContext.Provider
            value={{
                ticketOrders,
                productOrders,
                addTicketOrder,
                removeTicketOrder,
                addProductToCart,
                removeProductFromCart,
            }}
        >
            {children}
        </TicketOrderContext.Provider>
    );
};

export const useTicketOrderContext = () => {
    return useContext(TicketOrderContext);
};
