import { ApiResponse } from "../../constant/ApiResponse.js";
import { Quantity } from "../../model/quantity.js";
import { quantityValidation } from "./validation.js";

export const createQuantity = async (req, res) => {
  const { productType, quantity } = req.body;
  try {
    if (!req.user) {
      return res.status(401).json(new ApiResponse(false, 401, "Unauthorized"));
    }
    const { error } = quantityValidation.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            false,
            400,
            error.details[0].message.replace(/"/g, "").trim()
          )
        );
    }

    const adminId = req.user._id;
    const getQuantity = await Quantity.findOneAndUpdate(
      { productType, admin: adminId },
      { $inc: {quantity}},
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res
      .status(200)
      .json(
        new ApiResponse(
          true,
          200,
          "Product Update Successfully...!!",
          getQuantity
        )
      );
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, 500, "Server Error",error.message));
  }
};
