import TicketSchema from "../../schemas/tickets.schema";

class TicketsMongoDAO {

    async getAll() {
        try {
            const tickets = await TicketSchema.find({});
            return tickets;
        } catch (error) {
            console.log(error);
        }
    }

    async getById( tid ) {
        try {
            let ticket;
            ticket = await TicketSchema.findOne({ _id: tid });
            return ticket;
        } catch (error) {
            console.log(error);
        }
    }

    async add(ticket) {
        try {
            const newTicket = await TicketSchema.create(ticket);
            return newTicket;
        } catch (error) {
            console.log(error);
        }
    }

    async update(tid, ticket) { 

    }

    async delete(tid) { 
        try {
            const deletedTicket = await TicketSchema.findOneAndDelete({_id: tid});
            return { success: true, message: 'Ticket deleted successfully', payload: deletedTicket };
        } catch (error) {
            console.log(error);
        }
    }

}

export { TicketsMongoDAO }