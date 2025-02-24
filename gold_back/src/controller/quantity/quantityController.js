import { ApiResponse } from "../../constant/ApiResponse";
import { Quantity } from "../../model/quantity";
import { quantityValidation } from "./validation";

export const createQuantity = async (req, res) => {
  const { productType, quantity } = req.body;
  try {
    if (!req.user) {
      return res.status(401).json(new ApiResponse(false, 401, "Unathorize"));
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
    const quantity = await Quantity.findOne({ productType, admin: adminId });
    if (quantity) {
    }
  } catch (error) {}
};
