import Razorpay from "razorpay";
import { Payment } from "../Models/Payment.js";

const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_SECRET",
});

// chekout
export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;
  const options = {
    amount: amount * 100, // amount in the local currency
    currency: "INR",
    receipt: `receipt_${Date.now}`,
  };

  const order = razorpay.orders.create(options);
  res.json({
    orderId: order.id,
    amount: amount,
    cartItems,
    userShipping,
    userId,
    payStatus: "created",
  });
};


// verify , save to db
export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userID,
    userShipping,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userID,
    userShipping,
    payStatus: "paid",
  });
  res.json({
    message:"payment successfull..",
    success:true,
    orderConfirm
  });
};

// user specific order
export const userOrder = async(req,res)=>{
    let userId = req.user._id.toString()
    let orders = await Payment.find({userId:userId}).sort({orderDate:-1})
    res.json(orders);
}

// all order
export const allOrders = async(req,res)=>{
    let orders = await Payment.find().sort({orderDate:-1})
    res.json(orders);
}
