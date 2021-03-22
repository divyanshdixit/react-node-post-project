import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());

app.use('/posts', postRoutes);

app.get('/', (req,res)=> {
    res.send('Hello! Welcome to my project')
})

const PORT = process.env.PORT || 8000;
// connect database:
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
    .then( () => {
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    })
    .catch( (e) => console.log(e.message));