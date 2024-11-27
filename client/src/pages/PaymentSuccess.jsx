import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { showErrorAlert, showSuccesAlert } from "../components/Dialog";
import api from "../../services/axios";

const PaymentSuccess = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("sessionId");
  useEffect(() => {
    const confirmPayment = async () => {
      console.log(sessionId)
      if (sessionId) {
        try {
          await api.post("/api/pedidos/confirm", { sessionId });
        } catch (error) {
          showErrorAlert("Erro ao confirmar pedido.");
        }
      }
    }
    confirmPayment();
  }, [sessionId])
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <svg
        className="w-24 h-24 text-green-500 animate-pulse"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <div className="text-center mx-2">
        <h1 className="text-2xl font-bold text-green-600 mt-4">
          Pagamento efetuado com sucesso!
        </h1>
        <p className="text-gray-600 mt-2">
          Obrigado por sua compra. Estamos processando seu pedido.
        </p>
        <div className="mt-6">
          <Link to='/'
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Voltar para a Página Inicial
          </Link>
        </div>

      </div>



    </div>
  )
}

export default PaymentSuccess;