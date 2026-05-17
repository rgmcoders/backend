import express from 'express'; 
import dotenv from 'dotenv';
import dbConnection from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from "cors";
import blogRouter from './routes/blogRoutes.js';
  
const app = express();
dotenv.config();


////// midddleware
app.use(express.json());
app.use(cors());


app.use(async (req, res, next) => {
    try {
        await connectDB();
        next(); // Sab theek hai, agay controller par jao
    } catch (error) {
        console.error("Database connection failed in middleware:", error);
        res.status(500).json({ success: false, message: "Database connection error" });
    }
});



///// routes

app.use('/api/auth', authRoutes)
app.use('/api/blog', blogRouter)

app.get("",(req,res)=>{
res.send("hello")
})

app.listen(process.env.PORT, ()=>console.log(`Server is running on port ${process.env.PORT}`));