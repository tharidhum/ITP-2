import axios from "axios";

const BASE_URL = "http://localhost:3001";


class FAQAPI {

  //add faq
  static addFAQ = (values: {
    question: string;
    category: string;
    answer: string;
  }) => {

    return axios.post(`${BASE_URL}/faq/add`, values);
  };

  //get all faq
  static getAllFAQ = () => {

    return axios.get(`${BASE_URL}/faq`)
  };

  //delete faq
  static deleteFAQ = (_id: string) => {
    return axios.delete(`${BASE_URL}/faq/delete/${_id}`);
  };

  //update battery details
  static updateFAQ = (values: {
    _id: string;
    question: string;
    category: string;
    answer: string;
  }) => {
    return axios.put(`${BASE_URL}/faq/update/${values._id}`, values,);
  };

};



export default FAQAPI;
