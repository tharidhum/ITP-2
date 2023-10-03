import axios from 'axios';

class RatingAPI{
    static submitUserRating(values : {userId : string,rate : number,comment : string}){
        return axios.post('http://localhost:3001/rate/submit',values);
    }
}

export default RatingAPI;