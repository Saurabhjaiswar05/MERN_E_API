import express, { Router } from "express";
import { addtoCart, clearCart, decreaseProductQty, removeProductFromCart, userCart } from "../Controllers/cart.js";
import { Authenticated } from "../Middlewares/auth.js";

const router = express.Router();
// add to cart
router.post("/add",Authenticated, addtoCart);

// get usercart
router.get("/user",Authenticated,userCart);

// remove product from cart
router.delete("/remove/:productId",Authenticated,removeProductFromCart);

// clear cart 
router.delete("/clear",Authenticated,clearCart);

// decrease product qty 
router.post("/--qty",Authenticated,decreaseProductQty);

export default router;
