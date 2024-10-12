import { Products } from "../Models/Product.js";

// add products

export const addProduct =async(req,res)=>{
    try {
        const {title,description,price,category,qty,imgSrc} = req.body;
        if(!title || !description || !price || !category || !qty || !imgSrc){
            return res.status(400).json({
                success:false,
                message:"Required all the fields"
            })
        }
    
        const product = await Products.create({
            title,
            description,
            price,
            category,
            qty,
            imgSrc
        });
        await product.save();
        res.status(200).json({
            success:true,
            message:"Product added successfully",
            product
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// get all product

export const getProducts = async (req,res)=>{
    try {
        const products = await Products.find().sort({createdAt:-1});
        res.status(200).json({
            success:true,
            message:"All Products",
            products
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get sigle product by id

export const getProductById = async (req,res)=>{
    try {
        const id = req.params.id
        const product = await Products.findById(id);
        if(!product){
          return  res.status(400).json({
                success:false,
                message:"Product not found or Invalid id"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Specific product",
            product
        })

    } catch (error) {
        
    }
}

// update product by id

export const updateProductById = async (req,res)=>{
    try {
        const id = req.params.id;
        let product = await Products.findByIdAndUpdate(id,req.body,{new:true});
        if(!product){
            return res.status(400).json({
                success:false,
                message:"Product not found or invalid product"
            });
        }

        await product.save();
       return res.status(200).json({
            success:true,
            message:"Product upudated successfully",
            product
        });

    } catch (error) {
       return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// delete product by id

export const deleteProductById = async (req,res)=>{
    try {
        const id = req.params.id;
        let product = await Products.findByIdAndDelete(id);
        if(!product){
            return res.status(400).json({
                success:false,
                message:"Product not found or invalid product"
            });
        }

        res.status(200).json({
            success:true,
            message:"Product Deleted successfully",
            product
        });

    } catch (error) {
       return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}