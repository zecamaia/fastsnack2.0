import { Link } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";
import { format } from 'date-fns'
import backgroundImage from '../assets/desktop-background.png'
import { useEffect, useState } from 'react';
import api from '../../services/axios';
import { useAuth } from '../context/AuthContext';
import { showConfirmAlert, showErrorAlert } from '../components/Dialog';
import Navbar from '../components/Navbar';
import EventCard from '../components/Cards/EventCard';

const Home = () => {

  const { logout, isLoggedIn, loading } = useAuth();
  const [eventos, setEventos] = useState([]);
  const ultimosEventos = eventos.slice(0, 4);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/api/eventos/')
        setEventos(response.data);
      } catch (error) {
        showErrorAlert(error.message);
      }
    }
    fetchEvents();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    showConfirmAlert({
      text: "Deseja mesmo sair?",
      confirmButtonText: "Sim, sair",
      cancelButtonText: "Não, cancelar",
      onConfirm: () => {
        logout()
      }
    });
  }

  return (
    <div className="bg-gray-50">
      <Navbar handleLogout={handleLogout} isLoggedIn={isLoggedIn} />


      <section className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center font-poppins z-1" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <h2 className="text-5xl font-bold text-center sm:text-5xl md:text-6xl ">Bem-vindo ao FastSnack</h2>
        <p className="text-lg mt-4 max-w-lg text-center sm:text-xl md:max-w-2xl ">
          Explore as novidades da nossa plataforma!
        </p>
        <Link className="mt-8 px-10 py-3 flex items-center bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-transform duration-300 ease-in-out transform hover:translate-x-1 shadow-lg shadow-red-400">
          <span>Saiba mais sobre nós </span><BsArrowRight className='ml-2' />
        </Link>
      </section>

      <section className="py-20 px-6 z-1">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-red-600 sm:text-5xl md:text-6xl">Últimos eventos</h2>
          <p className="mt-4 text-gray-600 text-center text-lg ">Veja os ultimos eventos para você.</p>
        </div>

        <div className="grid gap-6 mt-10 max-w-6xl mx-auto px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {ultimosEventos.map((evento) => (
            <EventCard key={evento.id} evento={evento} />
          ))}

        </div>
      </section >

      {/* Features Section */}
      < section className="py-20 px-6 z-1" >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-red-600 sm:text-5xl md:text-6xl">Qualidade para o usuario</h2>
          <p className="mt-4 text-gray-600 text-center text-lg ">Veja os ultimos eventos para você.</p>
        </div>
        <div className="flex flex-wrap mt-10 max-w-4xl mx-auto">
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="font-bold text-xl">Custos acessíveis</h3>
              <p className="mt-2 text-gray-600">Descrição breve do benefício.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="font-bold text-xl">Design Intuitivo</h3>
              <p className="mt-2 text-gray-600">Descrição breve do benefício.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="font-bold text-xl">Perfil de clientes</h3>
              <p className="mt-2 text-gray-600">Descrição breve do benefício.</p>
            </div>
          </div>
        </div>
      </section >

      {/* Call to Action */}
      < section className="bg-gray-100 min-h-screen text-center py-20 my-10 z-1" >
        <div className='max-w-screen-lg mx-auto px-4'>
          <h2 className="text-5xl font-bold text-red-600 sm:text-5xl md:text-6xl">Sobre nós</h2>
          <p className="mt-4">Entre em contato para mais informações.</p>
          <button className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-red-400">
            Entre em Contato
          </button>
          {/* Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Missão</h3>
              <p className="text-gray-700">
                Nossa missão é oferecer os melhores produtos e serviços para nossos clientes, sempre com qualidade e eficiência.
              </p>

            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Visão</h3>
              <p className="text-gray-700">
                Ser reconhecidos como a melhor empresa do setor, inovando constantemente e superando as expectativas dos nossos clientes.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Valores</h3>
              <p className="text-gray-700">
                Valorizamos a transparência, a ética e o compromisso com a sustentabilidade em todas as nossas ações.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Equipe</h3>
              <p className="text-gray-700">
                Contamos com uma equipe de profissionais altamente qualificados e apaixonados pelo que fazem.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">História</h3>
              <p className="text-gray-700">
                Fundada em 2020, nossa empresa tem se destacado pela inovação e compromisso com a qualidade.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">História</h3>
              <p className="text-gray-700">
                Fundada em 2020, nossa empresa tem se destacado pela inovação e compromisso com a qualidade.
              </p>
            </div>
          </div>
        </div>
      </section >

      {/* Footer */}
      < footer className="bg-red-900 text-white py-6 text-center" >
        <p>&copy; 2024 - FastSnack - Todos os direitos reservados.</p>
      </footer >
    </div >
  )
}

export default Home;