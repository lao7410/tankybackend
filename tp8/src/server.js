const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');

const PORT = 8080;

const server = http.createServer(app);
const io = new Server(server);

const serverInstance = server.listen(PORT, (err) => {
  if (err) return err;
  console.log(`Escuchando en el puerto ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("Usuario conectado");
  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

module.exports = serverInstance;
