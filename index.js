// import express from 'express'; 
// import dotenv from 'dotenv';
// import dbConnection from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
// import cors from "cors";
// import blogRouter from './routes/blogRoutes.js';
  
// const app = express();
// dotenv.config();




// ////// midddleware
// app.use(cors({
//     origin: 'http://localhost:5173', // Aapka frontend origin
//     credentials: true
// }));
// app.use(express.json());

// // 2. Database Connection Middleware (Fixed function name)
// app.use(async (req, res, next) => {
//     try {
//         await dbConnection(); // 👈 dbConnection use kiya jo top par imported hai
//         next(); 
//     } catch (error) {
//         console.error("Database connection failed in middleware:", error);
//         res.status(500).json({ success: false, message: "Database connection error" });
//     }
// });


// ///// routes

// app.use('/api/auth', authRoutes)
// app.use('/api/blog', blogRouter)

// app.get("",(req,res)=>{
// res.send("hello")
// })

// app.listen(process.env.PORT, ()=>console.log(`Server is running on port ${process.env.PORT}`));


import 'dotenv/config';
import express from 'express'; 
import cors from "cors";

// 1. Dotenv ko sab se upar config karein taaki database config ko env variables mil sakein
// dotenv.config();

import dbConnection from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import blogRouter from './routes/blogRoutes.js';
  
const app = express();

// 2. Database ko direct server start hote hi connect karein (No Middleware)
const startServer = async () => {
    try {
        await dbConnection();
        console.log("Database connected successfully ✅");

        // DB connect hone ke BAAD server listen karega
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} 🚀`);
        });
    } catch (error) {
        console.error("Database connection failed ❌:", error);
        process.exit(1); // Agar DB connect na ho to server band ho jaye
    }
};

////// Middlewares
app.use(cors({
    origin: 'http://localhost:5173', // Aapka frontend origin
    credentials: true
}));
app.use(express.json());

///// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRouter);

app.get("/", (req, res) => {
    res.send("Hello World! API is working.");
});

// Server function ko call karein
startServer();