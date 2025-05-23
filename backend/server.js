const express = require('express');
const cors = require('cors');
const clienteRoutes = require('./routes/clienteRoutes');
const restauranteRoutes = require('./routes/restauranteRoutes');
const mesaRoutes = require('./routes/mesaRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const garcomRoutes = require('./routes/garcomRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const cardapioRoutes = require('./routes/cardapioRoutes');
const itemPedidoRoutes = require('./routes/itemPedidoRoutes');
const garcomMesaRoutes = require('./routes/garcomMesaRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());


// ⚠️ Configuração do banco
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'RESTAURANTE'
};

// Rotas
app.use('/api/clientes', clienteRoutes(dbConfig));
app.use('/api/restaurantes', restauranteRoutes(dbConfig));
app.use('/api/mesas', mesaRoutes(dbConfig));
app.use('/api/reservas', reservaRoutes(dbConfig));
app.use('/api/garcons', garcomRoutes(dbConfig));
app.use('/api/pedidos', pedidoRoutes(dbConfig));
app.use('/api/cardapio', cardapioRoutes(dbConfig));
app.use('/api/pedidos', itemPedidoRoutes(dbConfig));
app.use('/api/garcons', garcomMesaRoutes(dbConfig));

app.get('/', (req, res) => {
  res.send('API do Sistema de Restaurante 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
