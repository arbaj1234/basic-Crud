import express from 'express';
import dotenv from 'dotenv'
import { connectDb } from './connectionDB/UserconnectDB.js';
import router from './routers/UserRouters.js';

dotenv.config()
const app = express();
connectDb()



app.use(express.json());
app.use('/api',router)




const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server start ${PORT}`);
})