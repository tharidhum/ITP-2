import express from "express";
import { generateNextTicketId, getAllTicketsByUser, raiseTicket, getAllTicketsByAdmin,submitResponse } from "../controllers/ticketCotroller.js";

const Router = express.Router();

Router.get("/raised", getAllTicketsByAdmin)
Router.get("/get/newId", generateNextTicketId);
Router.get("/:userId", getAllTicketsByUser)
Router.post('/raise', raiseTicket);
Router.put("/response/:id",submitResponse)

export default Router;
