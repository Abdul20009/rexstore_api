const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const connectDb = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET))


app.use("/api", authRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 5000;

const start = async () => {
    try{
        await connectDb(process.env.MONGO_URI)
        console.log("mongodb connected")
        app.listen(port, console.log(`server is listening on port ${port}...`));
    }catch(error){
        console.log(error);
    };
}

start();






















