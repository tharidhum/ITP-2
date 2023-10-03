import Faq from "../models/FAQ.model.js";


//add faq to the db
export const addFaq = async (req, res) => {
    try {
      const newFaq = new Faq({
        question: req.body.question,
        category: req.body.category,
        answer: req.body.answer,
        
      });
  
      const savedFaq = await newFaq.save(); 
    
      res.status(201).json(savedFaq); 
    } catch (error) {
      res.status(500).json({ message: "Failed to add FAQ", error });
    }
  };