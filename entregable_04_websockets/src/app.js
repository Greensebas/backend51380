import express from 'express';
import apiRoutes from './routes/app.routes.js';
import handlebarsRoutes from './routes/handlebar.routes.js';
import realTimeProductsRoutes from './routes/realTimeProducts.routes.js';
import { __dirname } from './utils.js';
import path from 'path';
import handebars from 'express-handlebars';
import { Server } from 'socket.io';

import { productManager } from './controllers/products.controllers.js';
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

// app.use('/', handlebarsRoutes);
// app.use('/realtimeproducts', realTimeProductsRoutes);

// ---- || ----

const httpServer = app.listen(PORT, () => {
    console.log(`🚀 Server is up and run on port ${PORT} 🚀`);
});

httpServer.on('error', (error) => {
    console.log(error.message)
});


// Socket io
const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log(`New Client Connection with ID: ${socket.id}`);

    socket.on('new-product', async (newProd) => {
        try {
            await productManager.addProduct(newProd );

            let productList = await productManager.getProducts();

            socket.emit('products', productList);
        }
        catch(error) {
            console.log(error.message);
        }
    })
})