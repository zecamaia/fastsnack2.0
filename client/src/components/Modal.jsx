import { IoMdClose } from "react-icons/io";
import { IoTicketOutline } from "react-icons/io5";
import { IoPizzaSharp } from 'react-icons/io5';
import { QRCodeCanvas } from "qrcode.react";

const Modal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !onClose) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md h-3/4 overflow-hidden relative">
        <button
          className="absolute p-4 right-2 text-gray-600 hover:text-black mr-4"
          onClick={onClose}
        >
          <IoMdClose size={24} />
        </button>
        <div className="p-4 border-b">
          <h1 className="text-xl font-medium text-gray-900">Pedido #{order.id}</h1>
        </div>
        <div className="p-4 overflow-y-auto h-full flex flex-col">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-sm text-gray-600">
                Status:
                <span
                  className={`px-2 py-1 rounded-md text-sm font-semibold ${order.status === 'pendente'
                    ? 'text-yellow-700 bg-yellow-100'
                    : order.status === 'cancelado'
                      ? 'text-red-600 bg-red-100'
                      : order.status === 'pago'
                        ? 'text-green-600 bg-green-100'
                        : ''
                    }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </p>
              <p className="text-sm text-gray-600 my-2">
                Total: <span className="font-semibold text-gray-800">R$ {order.total}</span>
              </p>
            </div>
            <div>
              {order.qr_code_url && (
                <QRCodeCanvas
                  value={order.qr_code_url} // URL do QR Code
                  size={80} // Reduzindo o tamanho do QR Code
                  level="H" // Nível de correção de erro
                />
              )}
            </div>
          </div>



          {order.orderItems && order.orderItems.length > 0 && (
            <div>
              {order.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col p-4 bg-gray-50 shadow-sm rounded-md mb-6"
                >
                  {item.product ? (
                    <div className="flex items-center">
                      <span className="text-primary text-3xl mr-4"><IoPizzaSharp /></span>
                      <div>
                        <h2 className="text-sm font-medium text-gray-900">
                          {item.product.name}
                        </h2>
                        <p className="text-sm text-gray-600">
                          Quantidade: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          Preço: R$ {item.unit_price}
                        </p>
                      </div>
                    </div>
                  ) : item.ticket ? (
                    <div className="flex items-center">
                      <span className="text-primary text-3xl mr-4"><IoTicketOutline /></span>
                      <div>
                        <h2 className="text-sm font-medium text-gray-900">
                          {item.ticket.event.name}
                        </h2>
                        <p className="text-sm text-gray-600">
                          Quantidade: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          Tipo: {item.ticket.ticket_type}
                        </p>
                        <p className="text-sm text-gray-600">
                          Preço: R$ {item.unit_price}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div >
  );

}
export default Modal;