import type { Request, Response } from "express";
import { Product } from "../../models/Product";

export const listProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find().where("category").equals(categoryId);

    res.status(200).json(products);
  } catch (error) {

    console.error(error);

    res.status(500).json({ error: "Internal server error" });
  }
};
