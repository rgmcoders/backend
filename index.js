import express from 'express'; 
import dotenv from 'dotenv';
import dbConnection from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from "cors";
import blogRouter from './routes/blogRoutes.js';
  
const app = express();
dotenv.config();


////// midddleware
app.use(cors({
    origin: 'http://localhost:5173', // Aapka frontend origin
    credentials: true
}));
app.use(express.json());

// 2. Database Connection Middleware (Fixed function name)
app.use(async (req, res, next) => {
    try {
        await dbConnection(); // 👈 dbConnection use kiya jo top par imported hai
        next(); 
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