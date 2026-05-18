import express from 'express';
import {createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct} from '../controllers/product.controller.js'

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getAllProducts);
router.put("/:id", updateProduct);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);
export default router;