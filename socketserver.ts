import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Usuario conectado');

socket.on("notificacionUsuarioCreado",(usuario) => {
    console.log('Evento usuarioCreado recibido:', usuario);
    io.emit('notificacionUsuarioCreado', usuario);
  })

  socket.on('usuarioCreado', (usuario) => {
    console.log('Evento usuarioCreado recibido:', usuario);
    io.emit('notificacionUsuarioCreado', usuario);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
  console.log(`Servidor Socket.IO escuchando en el puerto ${PORT}`);
});
