import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js"
import productRouter from "./Routes/product.js"
import cartRouter from "./Routes/cart.js"
import addressRouter from "./Routes/address.js"
import paymentRouter from "./Routes/payment.js"
import dotenv from "dotenv"
import cors from "cors";

dotenv.config();

const app = express();


// parser it will alway on top

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin:true,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}));


// checking routes home page
app.get("/",(req,res)=>{
    res.json({message:"this is home page "});
});



// user Routes

app.use("/api/user",userRouter);

// product router
app.use("/api/product",productRouter);

// cart router
app.use("/api/cart",cartRouter);

// address router
app.use("/api/address",addressRouter);

// payment router
app.use("/api/payment",paymentRouter)

// database connection
mongoose
  .connect(
    "mongodb+srv://sjsaurabh082:SYuN5CELB1zsZ0Ap@cluster0.y4jzl.mongodb.net/MERN_E_Commerce?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = 1000;
// server connection
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
