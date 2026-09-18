import type { Request, Response } from "express";
import { Order } from "../../models/Order";

export const changeOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["WAITING", "IN_PRODUCTION", "DONE"].includes(status)) {
      return res
        .status(400)
        .json({ error: "Status must be one of: WAITING, IN_PRODUCTION, DONE" });
    }

    await Order.findByIdAndUpdate(orderId, { status });

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
