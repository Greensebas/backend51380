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
import env from "./config/env.config.js";
// import dotenv from 'dotenv';

// dotenv.config();
const mongoURL = env.MONGO_URL

export async function connectMongo() {
  try {
    await connect(
      mongoURL
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
};


//---------------- BCRYPT ----------------------
import bcrypt from 'bcrypt';
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);