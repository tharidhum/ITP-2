import express from "express";
import { addFaq,getAllFAQ,deleteFAQ } from "../controllers/faq.controller.js";


const router = express.Router();

router.get("/",getAllFAQ)
router.post("/add",addFaq);
router.delete("/delete/:id",deleteFAQ)


export default router;
