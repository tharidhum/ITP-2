import express from "express";
import { addFaq } from "../controllers/faq.controller.js";


const router = express.Router();

router.post("/add",addFaq);


export default router;
