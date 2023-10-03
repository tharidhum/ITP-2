import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
   
    question  : {
        type : String,
        required : true,
    },
    category :{
        type : String,
        required : true,

    },
    answer : {
        type : String,
        required : true,
    },
    
},{timeStamps : true});


const Faq = mongoose.model("faqs",faqSchema);

export default Faq;