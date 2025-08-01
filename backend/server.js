import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';
import resumeRoutes from './routes/resumeRoutes.js'

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename)


const app = express();
const PORT= 4000;

app.use(cors());

//connectDB
connectDB();

app.use(express.json());

app.use('/api/auth',userRoutes);
app.use('/api/resume',resumeRoutes);

app.use(
    '/uploads',
    express.static(path.join(__dirname,'uploads'),{
        setHeaders:(res,_path)=>{
            res.set('Access-Control-Allow-Origin','https://nxtresume-frontend.onrender.com')
        }
    })
)

app.get('/',function(req,res){
    res.send("Working");
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})