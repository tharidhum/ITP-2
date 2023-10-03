import express from 'express';
import { submitRatings } from '../controllers/ratingController.js';


const Router = express.Router();

// rating submit
Router.post("/submit",submitRatings);


export default Router;