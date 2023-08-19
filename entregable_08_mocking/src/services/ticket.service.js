import { TicketsDAO } from "../models/daos/app.daos.js";
import { ProductService } from "./product.service.js";
import { CartService } from "./cart.service.js";

export class TicketService {

    async createTicket ( ticket ) {
        try {
            const newTicket = await TicketsDAO.create( ticket )
        }
        catch(error) {

        }
    }
}