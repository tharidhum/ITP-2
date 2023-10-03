import Rate from '../models/rating.model.js';

export const submitRatings = async(req,res) =>{
    const {userId ,rate ,comment} = req.body;

    try{

        // checking if one of above field value is missing
        if(!userId || !rate || !comment){
            throw new Error("All fields are required!");
        }

        // submit the user ratings
        const recordedRate = await Rate.create({userId,rate,comment});

        // then send the saved data to the frontend
        res.status(201).json(recordedRate);

    }catch(error){
        console.log(error);
        res.status(500).json({error:error.message})
    }
}