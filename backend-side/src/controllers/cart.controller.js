import Cart from "../models/cart.model.js";

const addToCart = async (req, res) => {
    try{
        const userId = req.user.id;

        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({
            user: userId,
        })

        if(!cart) {
            cart = await Cart.create({
                user: userId,
                items: [
                    { 
                        product: productId, 
                        quantity: quantity || 1 
                    }
                ],
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            cart,
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error adding product to cart",
            error: error.message
        })
    }
}

const getCart = async (req, res) => {
    // 1. Who is logged in?
    // 2. Find that user's cart
    // 3. Return cart data
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({
            user: userId,
        }).populate("items.product");

        if(!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart is empty",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Cart retrieved successfully",
            cart,
        })
 
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving cart",
            error: error.message
        })
    }
}