import  express  from 'express';
import 'dotenv/config';
import cors from 'cors';
import dbConnect from "./configs/dbConfig.js";
import faqRoutes from "./routes/faq.routes.js"
import ratingRoutes from './routes/ratingRoutes.js';
import ticketsRoutes from './routes/ticket.routes.js';


const app = express();

const PORT = process.env.PORT || 6001;

//cors initialization
app.use(cors())

//initialize the json
app.use(express.json());

// config the urlEncoded middleware
app.use(express.urlencoded({extended : false}));

app.use((req,res,next)=>{
    console.log(`${req.method} =====> URL: ${req.url}`);
    next();
});

//config routes
app.get('/',(req,res)=>{
    res.send("Tracking System");
});

// redirect to faq routes
app.use('/faq',faqRoutes);

// redirect to rating routes
app.use("/rate",ratingRoutes);

// redirect to ticket routes
app.use('/tickets',ticketsRoutes);

app.listen(PORT,()=>{
    console.log(`Server is started on port ${PORT}🚀👍`);
    dbConnect();
});