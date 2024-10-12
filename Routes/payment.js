import express from "express";
import {allOrders, checkout,userOrder,verify} from "../Controllers/Payment.js"
import {Authenticated} from "../Middlewares/auth.js"
const router = express.Router();

//initiate payment or checkout

router.post("/checkout",checkout)

// verify payment and sae to db
router.post("/verify-payment",verify)

// user order
router.get("/userorder",Authenticated,userOrder)

// all order
router.get("/orders",allOrders)

export default router