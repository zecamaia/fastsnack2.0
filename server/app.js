const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const homeRoutes = require('./src/routes/homeRoutes');
const tokenRoutes = require('./src/routes/tokenRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const productRoutes = require('./src/routes/productRoutes')
const categoryRoutes = require('./src/routes/categoryRoutes');
const ticketRoutes = require('./src/routes/ticketRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const eventCategoryRoutes = require('./src/routes/eventCategoryRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/', homeRoutes)
app.use('/api/users', userRoutes);
app.use('/api/token/', tokenRoutes);
app.use('/api/eventos/', eventRoutes);
app.use('/api/produtos/', productRoutes);
app.use('/api/categorias/', categoryRoutes);
app.use('/api/ingressos/', ticketRoutes);
app.use('/api/pedidos/', orderRoutes);
app.use('/api/categoria-eventos', eventCategoryRoutes);
app.use('/api/gerar-pagamento', paymentRoutes)
module.exports = app;
