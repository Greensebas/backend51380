import express from 'express';
import apiRoutes from './routes/app.routes.js';

import { __dirname, connectMongo, connectSocket } from './utils.js';
import path from 'path';
import handebars from 'express-handlebars';

import viewsRouter from './routes/views.routes.js';


const PORT = process.env.PORT || 8080;
const app = express();



// Middlewares
app.use(express.json()); // es para parsear el body que viene en el post
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));  // Para aclarar que 'public' está dentro de /src

// Handlebars
app.engine('handlebars', handebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


// Routes
app.use('/api', apiRoutes);
app.use('/', viewsRouter);


// ---- || ----

const httpServer = app.listen(PORT, () => {
    console.log(`🚀 Server is up and run on port ${PORT} 🚀`);
});

httpServer.on('error', (error) => {
    console.log(error.message)
});


// MongoDB
connectMongo();

// Socket
connectSocket(httpServer);
