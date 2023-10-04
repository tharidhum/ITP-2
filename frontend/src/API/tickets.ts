import axios from "axios";




class TicketAPI {
    static generateNextTicketId(){
        return axios.get("http://localhost:3001/tickets/get/newId")
    }

    static raiseTicket(values : {ticketId : string, date : string, issueId : string, subject : string,message : string, category : string,userId:string}){
        return axios.post("http://localhost:3001/tickets/raise",values);
    }

    // get all tickets by user
    static getAllTicketsByUser(userId : string){
        return axios.get(`http://localhost:3001/tickets/${userId}`);
    }
}

export default TicketAPI;
