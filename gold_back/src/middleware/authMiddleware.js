import passport from "passport";
import { ApiResponse } from "../constant/ApiResponse.js";

const protect = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, admin) => {
    // console.log(admin);
    
    if (err || !admin) {
      return res.status(401).json(new ApiResponse(false, 401, "UnAuthorize"));
    }
    req.user = admin;
    next();
  })(req, res, next);
};
export default protect;
