import { Route, Routes } from "react-router-dom";
import { TicketOrderProvider } from "../context/TicketOrderContext";
import Layout from "../layout/Layout";
import EventCategory from "../pages/Guest/CategoriaEvento";
import Evento from "../pages/Guest/Evento";
import EventInfo from "../pages/Guest/EventoInfo";
import Orders from "../pages/Guest/Pedidos";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Registro from "../pages/Registro/Registro";
import TicketCheckout from "../pages/TicketCheckout";
import ProtectedRoute from "./ProtectedRoute";
import PaymentSuccess from "../pages/PaymentSuccess";

const AppRoutes = () => {
    return (
        <TicketOrderProvider>
            <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/cadastrar" element={<Registro />} />
                <Route path="/login" element={<Login />} />

                {/* Rotas protegidas */}
                <Route element={<Layout />}>
                    <Route path="/eventos" element={<ProtectedRoute element={<Evento />} />} />
                    <Route path="/eventos/categoria/:id" element={<ProtectedRoute element={<EventCategory />} />} />
                    <Route path="/eventos/:id" element={<ProtectedRoute element={<EventInfo />} />} />
                    <Route path="/checkout/" element={<ProtectedRoute element={<TicketCheckout />} />} />
                    <Route path="/pedidos/" element={<ProtectedRoute element={<Orders />} />} />
                    <Route path="/pagamento-sucesso" element={<ProtectedRoute element={<PaymentSuccess />} />} />
                </Route>
            </Routes>
        </TicketOrderProvider>

    )
}

export default AppRoutes;