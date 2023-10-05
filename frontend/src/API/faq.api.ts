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
  static deleteFAQ = (_id : string) => {
    console.log(_id)
    return axios.delete(`${BASE_URL}/faq/delete/${_id}`);
  };

};

export default FAQAPI;
