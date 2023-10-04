import express from "express";
import { generateNextTicketId, getAllTicketsByUser, raiseTicket } from "../controllers/ticketCotroller.js";

const Router = express.Router();

Router.get("/get/newId",generateNextTicketId);
Router.post('/raise',raiseTicket);
Router.get("/:userId",getAllTicketsByUser)
export default Router;
