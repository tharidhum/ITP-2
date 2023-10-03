import mongoose from 'mongoose';



const ratingSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },
    rate : {
        type : Number,
        required : true,
    },
    comment : {
        type : String,
        required : true
    }
});


const ratingModel = mongoose.model("ratings",ratingSchema);

export default ratingModel;