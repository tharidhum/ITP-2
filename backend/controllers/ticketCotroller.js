import Ticket from "../models/ticket.model.js";

export const generateNextTicketId = async (req, res) => {
  try {
    //get last ticket object, if there is a ticket, then return that ticket object, otherwise return empty array
    const lastTicketDetails = await Ticket.find().sort({ _id: -1 }).limit(1);

    //check if the result array is empty or not, if its empty then return first ticket Id
    if (lastTicketDetails.length === 0) {
      res.json({ ticketId: "TKS-0001" });
    } else {
      //if array is not null, get last ticket object id
      const ticketId = lastTicketDetails.map((data) => {
        return data.ticketId;
      });

      //then we get the Integer value from the last part of the ID
      const oldTicketId = parseInt(ticketId[0].split("-")[1]);

      const newTicketId = oldTicketId + 1; //then we add 1 to the past value

      //then we return the id according to below conditions
      if (newTicketId >= 1000) {
        res.json({ ticketId: `TKS-${newTicketId}` });
      } else if (newTicketId >= 100) {
        res.json({ ticketId: `TKS-0${newTicketId}` });
      } else if (newTicketId >= 10) {
        res.json({ ticketId: `TKS-00${newTicketId}` });
      } else {
        res.json({ ticketId: `TKS-000${newTicketId}` });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const raiseTicket = async (req, res) => {
  // get all the details from the request body
  const { ticketId, date, issueId, subject, message, category, userId,stakeHolder } =
    req.body;

  //get current time ticket is submitted
  const time = new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
  try {
    // save the details in the databse
    const savedTicket = await Ticket.create({
      ticketId,
      date,
      issueId,
      subject,
      message,
      category,
      userId,
      time,
      stakeHolder
    });

    // send success response along with saved data
    res.status(201).json(savedTicket);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};


// get all tickets by user
export const getAllTicketsByUser = async (req, res) => {
  const { userId } = req.params;
  try {

    // get all tickets by userId
    const prevRaisedTickets = await Ticket.find({ userId });

    res.status(200).json(prevRaisedTickets);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//get all tickets by admin
export const getAllTicketsByAdmin = async (req, res) => {

  try {
    const raisedTicket = await Ticket.find();

    res.status(200).json(raisedTicket);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Tickets", error });
  }
};

export const submitResponse = async (req, res) => {
  const _id = req.params.id;

  try {
    const updateFields = {
      response: req.body.message,
      status : "COMPLETE"
    };

    console.log(updateFields);
    const updatedRes = await Ticket.findByIdAndUpdate(_id,updateFields,{ new: true });

    res.status(201).json(updatedRes);
  } catch (error) {
    res.status(500).json({ message: "Failed to add Response", error });
  }
};

