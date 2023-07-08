const express = require('express');
const app = express();
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Configuración del servidor y middleware
app.use(express.json());

// Rutas y controladores
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Iniciar el servidor
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
