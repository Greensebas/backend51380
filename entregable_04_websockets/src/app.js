import express from 'express';
import apiRoutes from './routes/app.routes.js'


const PORT = process.env.PORT || 8080;

const app = express();

// Middlewares
app.use(express.json()); // es para parsear el body que viene en el post
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

// Routes
app.use('/api', apiRoutes);

// ---- || ----

const connectedServer = app.listen(PORT, () => {
    console.log(`🚀 Server is up and run on port ${PORT} 🚀`);
});