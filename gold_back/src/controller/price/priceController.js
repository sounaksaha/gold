import { ApiResponse } from "../../constant/ApiResponse.js";
import { priceValidation } from "./validation.js";
import { Price } from "../../model/price.js";
import { paginate } from './../../utils/pagination.js';

export const createPrice = async (req, res) => {
  const { productType, date, time, price } = req.body;
  try {
    console.log("hei", req.user);
    if (!req.user) {
      return res.status(401).json(new ApiResponse(false, 401, "UnAuthorized"));
    }
    const { error } = priceValidation.validate(req.body);
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

    const newprice = new Price({
      productType,
      date,
      time,
      price,
    });

    await newprice.save();

    return res
      .status(200)
      .json(
        new ApiResponse(true, 200, "Price Added Successfully...!!!", newprice)
      );
  } catch (error) {
    console.log(error.message);

    return res
      .status(500)
      .json(new ApiResponse(false, 500, "Server Error", error.message));
  }
};

export const getSinglePrice = async (req, res) => {
  const { type } = req.query;
  console.log(type);

  try {
    if (!req.user) {
      return res.status(401).json(new ApiResponse(false, 401, "UnAuthorized"));
    }

    const price = await Price.findOne({ productType: type }).sort({
      date: -1,
      time: -1,
    });
    console.log(price);

    if (!price) {
      return (
        res.status(404), json(new ApiResponse(false, 404, "No Data Found"))
      );
    }
    console.log(price);
    // const lastPrice = price.filter()
    return res
      .status(200)
      .json(new ApiResponse(true, 200, "Price Chart", price));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(false, 500, "Server Error", error.message));
  }
};

export const getAllPrice = async (req, res) => {
  const { type, page, pageSize, date } = req.query;

  if (!type) {
    return res
      .status(400)
      .json(new ApiResponse(false, 400, "Type is not defined"));
  }

  // Build the filter object
  let filter = { productType: type };

  if (date) {
    // Convert date string to a JavaScript Date object
    const searchDate = new Date(date);
    
    if (!isNaN(searchDate.getTime())) {
      filter.date = {
        $gte: new Date(searchDate.setHours(0, 0, 0, 0)), // Start of the day
        $lt: new Date(searchDate.setHours(23, 59, 59, 999)) // End of the day
      };
    } else {
      return res
        .status(400)
        .json(new ApiResponse(false, 400, "Invalid date format"));
    }
  }

  try {
    const getAll = await paginate(Price, filter, { page, pageSize });

    if (!getAll.results.length) {
      return res.status(404).json(new ApiResponse(false, 404, "No data found"));
    }

    return res.status(200).json(new ApiResponse(true, 200, "List retrieved", getAll));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(false, 500, "Server Error"));
  }
};


// export default { createPrice, getGoldPrice };
