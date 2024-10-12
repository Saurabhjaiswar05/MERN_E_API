import { Cart } from "../Models/Cart.js";

// add to cart
export const addtoCart = async (req, res) => {
  try {
    const { productId, title, price, qty, imgSrc } = req.body;
    const userId = req.user;

    let cart = await Cart.findOne({userId});

    if(!cart){
      cart = new Cart({ userId, items: [] });
    }
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if(itemIndex > -1){
      cart.items[itemIndex].qty += qty;
      cart.items[itemIndex].price += price*qty;
    }else{
      cart.items.push({ productId, title, price, qty, imgSrc });
    }
    
    await cart.save();
    res.status(200).json({
      success: true,
      message: "Items Added To Cart",
      cart,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get User Cart 
export const userCart = async(req,res)=>{
  try {
    const userId = req.user;
    let cart = await Cart.findOne({userId});

    if(!cart){
      return res.json({
        success:false,
        message:"Cart not found"
      });
    }
     res.status(200).json({
      success:true,
      message:"user cart",
      cart
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// remove product from cart
export const removeProductFromCart = async(req,res)=>{
  try {
    const productId  = req.params.productId;
    const userId = req.user;

    let cart = await Cart.findOne({userId});

    if(!cart){
      return res.json({
        success:false,
        message:"Cart not found"
      });
    }

    cart.items = cart.items.filter((item => item.productId.toString() !== productId))

    await cart.save();

     res.status(200).json({
      success:true,
      message:"Product Remove from cart"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// clear cart
export const clearCart = async(req,res)=>{
  try {
    
    const userId = req.user;

    let cart = await Cart.findOne({userId});

    if(!cart){
      cart = new Cart({items:[]})
    }else{
      cart.items = [];
    }

    await cart.save();

     res.status(200).json({
      success:true,
      message:"cart Cleared ! "
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// decease qty from cart
export const decreaseProductQty = async (req, res) => {
  try {
    const { productId, qty} = req.body;
    const userId = req.user;

    let cart = await Cart.findOne({userId});

    if(!cart){
      cart = new Cart({ userId, items: [] });
    }
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if(itemIndex > -1){
      const item = cart.items[itemIndex]

      if(item.qty > qty){
        const pricePerUnit = item.price/item.qty 
        item.qty -= qty 
        item.price -= pricePerUnit * qty
      }else{
        cart.items.splice(itemIndex,1)
      }



    }else{
      return res.json({
        success:false,
        message:"Invalid Prduct ID"
      })
    }
    
    await cart.save();
    res.status(200).json({
      success: true,
      message: "Items Qty Decrease",
      cart,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

