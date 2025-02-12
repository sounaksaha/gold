import { ApiResponse } from "../../constant/ApiResponse.js";
import { Admin } from "../../model/admin.js";
import { registerValidation } from "./validation.js";
import jwtToken from "./../../constant/jwtToken.js";

export const registerUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    // console.log(req.body);

    const { error } = registerValidation.validate({ userName, password });
    if (error) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            401,
            error.details[0].message.replace(/"/g, "").trim()
          )
        );
    }
    const admin = await Admin.findOne({ userName });
    if (admin) {
      return res
        .status(409)
        .json(
          new ApiResponse(false, 409, "Same UserName is Already Present....!!!")
        );
    }
    const newAdmin = new Admin({
      userName,
      password,
    });
    await newAdmin.save();

    //console.log(newAdmin)
    return res.status(201).json(
      new ApiResponse(true, 201, "Admin Created Successfully...!!!", {
        newAdmin,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(false, 500, "Server Error...!!!", error.message));
  }
};

export const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  const { error } = registerValidation.validate({ userName, password });
  if (error) {
    return res
      .status(400)
      .json(
        new ApiResponse(401, error.details[0].message.replace(/"/g, "").trim())
      );
  }

  const admin = await Admin.findOne({ userName });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json(new ApiResponse(false, 401, "Unauthorize"));
  }
  const token = jwtToken(admin._id, admin.userName);
  return res
    .status(200)
    .json(
      new ApiResponse(true, 200, "Login Successfull", {
        token: token,
        admin: admin,
      })
    );
};
