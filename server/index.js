import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
// import path from "path";


dotenv.config({});

//connect and call  db connect  here 
connectDB();

const app=express();

// const _dirname=path.resolve(); 

const PORT =process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://learn-academy-ecwl.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

// app.use(express.static(path.join(_dirname, "/client/dist")))

// app.get('*', (_,res)=>{
//     res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
// });


app.listen(PORT, ()=>{
    console.log (`server listenning to port ${PORT}`)
}
)
