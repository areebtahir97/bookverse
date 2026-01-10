import 'dotenv/config';
console.log("DB_PASSWORD type:", typeof process.env.DB_PASSWORD);
import express from 'express'
import db from './configs/db.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js';
import libraryRouter from './routes/libraryRoutes.js'
import cors from 'cors'
import bodyParser from 'body-parser'

const app=express();
// Intialize Middlewares
app.use(express.json())
app.use(
  cors({
    origin: "https://bookverse-gksg.onrender.com", 
    credentials: true,               
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
await db.connect()
//To check the db connection
db.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("DB connection failed", err);
  } else {
    console.log("DB connected at:", res.rows[0].now);
  }
});

app.use('/api',userRouter)
app.use("/api/library",libraryRouter)
app.get('/', (req,res) => res.send("API Working"))

app.listen(3000,()=>{
    console.log('Running on port 3000')
})
