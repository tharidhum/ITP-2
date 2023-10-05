import Faq from "../models/FAQ.model.js";


//get all added faq
export const getAllFAQ = async (req, res) => {
  try {
    const Faqs = await Faq.find();

    res.status(200).json(Faqs); // Send the Faqs as the response
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Faqs", error });
  }
};


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

//delete faq from the db
export const deleteFAQ = async (req, res) => {
  const _id = req.params.id;

  console.log(_id);
  try {
    const deletedFAQ = await Faq.findByIdAndDelete(_id);
    res.status(200).json({ message: "FAQ deleted", deletedFAQ })


  } catch (err) {
    res.status(500).json({ message: "Failed to FAQ member", err });

  }
}