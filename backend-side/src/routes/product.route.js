import express from 'express';
import {createProduct, getAllProducts, getSingleProduct} from '../controllers/product.controller.js'

const router = express.Router();

router.post("/create", createProduct);
router.get("all", getAllProducts);
router.get("/:id", getSingleProduct);

export default router;