import express from 'express';
import routes from './routes/app.routes.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { __dirname, connectMongo, connectSocket } from './utils.js';
import path from 'path';
import handebars from 'express-handlebars';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


dotenv.config();
const mongoKey = process.env.DB_PASSWORD
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

// Sessions
app.use(cookieParser());
app.use(
    session({
      store: MongoStore.create({ mongoUrl: `mongodb+srv://greensebas:${mongoKey}@cluster0.9omke6v.mongodb.net/backend?retryWrites=true&w=majority`, ttl: 1000 }),
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
    })
  );


// Routes
app.use('/', routes);


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
