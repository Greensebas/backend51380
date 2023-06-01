// --------------- MULTER ---------------
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });



// --------------- DIRNAME ---------------
import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);



// --------------- MONGOOSE ---------------
import { connect } from 'mongoose';

export async function connectMongo() {
  try {
    await connect(
      /* PONER TU STRING ENTERO ACA */
      'mongodb+srv://greensebas:coder123house456@cluster0.9omke6v.mongodb.net/backend?retryWrites=true&w=majority'
      //'mongodb+srv://greensebas:coder123house456@cluster0.9omke6v.mongodb.net/backend?'
    );
    console.log('plug to mongo!');
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}





// --------------- SOCKET ---------------
import {Server} from 'socket.io';
import {productService} from './controllers/products.controllers.js';

export function connectSocket(httpServer) {

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`New Client Connection with ID: ${socket.id}`);

    socket.on('createProduct', async data => {
        const product = await productService.addProduct(data);
        socketServer.emit('productCreated', product.payload );
    });

    socket.on('deleteProduct', async id => {
        await productService.deleteProductById(id);
        socketServer.emit('productDeleted', id);
    })
})
}