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
import dotenv from 'dotenv';

dotenv.config();
const mongoKey = process.env.DB_PASSWORD

export async function connectMongo() {
  try {
    await connect(
      /* PONER TU STRING ENTERO ACA */
      `mongodb+srv://greensebas:${mongoKey}@cluster0.9omke6v.mongodb.net/backend?retryWrites=true&w=majority`
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
import { MsgsModel } from "./DAO/models/msgs.model.js";
import { env } from "process";

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
    });

    socket.on('msg_front_to_back', async (msg) => {
      const msgCreated = await MsgsModel.create(msg);
      const msgs = await MsgsModel.find({});
      socketServer.emit('msg_back_to_front', msgs);
    });
})
}