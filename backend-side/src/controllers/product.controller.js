import { Product } from "../models/product.model.js";

const createProduct = async(req, res) =>{
    try {
        // TODO: Implement create product logic
        // we take data from req.body and validate it
        // if data not sufficiet we return error response
        // if data is valid we create new product in database and return success response
        const {name, description, price, stock, category, image} = req.body;

        if(!name || !description || !price || !stock || !category){
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Please enter all required fields!"
            })
        }

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            category,
            image
        })

        return res.status(201).json({
            status: 201,
            success: true,
            data: product,
            message: "Product created successfully!"
        })

    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Something went wrong!"
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()

        res.status(200).json({
            status: 200,
            success: true,
            data: products,
            message: "Products fetched successfully!"
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: "Something went wrong!"
        })
    }
}

const getSingleProduct = async(req, res) => {
    try{
        const productId = req.params.id;

        const product = await Product.findById(productId)
        if(!product){
            returnres.status(404).json({
                status: 404,
                success: false,
                message: "Product not found!"
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            data: product,
            message: "Product fetched successfully!"
        })

    }catch(error){
        res.status(500).json({
            status: 500,
            success: false,
            message: "Something went wrong!"
        })
    }
}

export {createProduct, getAllProducts, getSingleProduct};