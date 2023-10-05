import express from "express";
import { addFaq,getAllFAQ,deleteFAQ,updateFaq } from "../controllers/faq.controller.js";


const router = express.Router();

router.get("/",getAllFAQ)
router.post("/add",addFaq);
router.delete("/delete/:id",deleteFAQ)
router.put("/update/:id",updateFaq);


export default router;
