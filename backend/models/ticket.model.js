import mongoose from 'mongoose';


const ticketSchema = new mongoose.Schema({

    userId : {
        type : String,
        required : true,
    },
    ticketId : {
        type : String,
        reqired : true,
    },
    date : {
        type : Date ,
        required : true,
    },
    category : {
        type : String,
        required : true
    },
    issueId : {
        type : String,
    },
    subject : {
        type : String,
        required: true
    },
    message : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : "PENDING"
    },
    time : {
        type : String,
        required : true,
    },
    response : {
        type : String,
        default : ""
    },
    stakeHolder : {
        type : String, 
        required : true
    }
},{timestamps : true});


const ticketModel = mongoose.model("tickets",ticketSchema);

export default ticketModel;
