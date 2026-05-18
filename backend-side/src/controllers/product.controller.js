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
        const { 
                page = 1, 
                limit = 10, 
                keyword, 
                category, 
                minPrice, 
                maxPrice,
                sort
            } = req.query;

        let query = {};

        // serch by name
        if(keyword){
            query.name = { $regrex: keyword, $options: "i"}
        }

        if(category){
            query.category = category.toLowerCase();
        }

        // filter by price range
        if(minPrice || maxPrice){
            query.price = {};
            if(minPrice){
                query.price.$gte = Number(minPrice);
            }
            if(maxPrice){
                query.price.$lte = Number(maxPrice);
            }
        }

        // pagination
        const skip = (page - 1) * limit;

        // sorting
        let sortOption = {};
        if(sort){
            sortOption[sort.replace("-", "")] = sort.startsWith("-") ? -1 : 1;
        }
        
        const products = await Product.find(query).skip(skip).limit(Number(limit));


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

const updateProduct = async(req, res) => { 
    try {
        const  productId = req.params.id;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if(!updatedProduct){
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Product not found!"
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            data: updatedProduct,
            message: "Product updated successfully!"
        })
    } catch(error){
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error updating product!"
        })
    }
}

const deleteProduct = async(req, res) => {
    try{
        const productId = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct){
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Product not found!"
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: "Product deleted successfully!"
        })
    } catch(error){
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error deleting product!"
        })
    }
}

export {createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct};