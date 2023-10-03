import axios from "axios";

const BASE_URL = "http://localhost:3001";


class FAQAPI{

    //add faq
    static addFAQ = (values: {
        question: string;
        category: string;
        answer: string;
      }) => {

        return axios.post(`${BASE_URL}/faq/add`, values);
      };

};

export default FAQAPI;
