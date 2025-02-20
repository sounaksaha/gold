import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Admin } from "../model/admin.js";

const configurePassport = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.secret,
  };
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const admin = await Admin.findById(jwt_payload._id);
        // console.log(admin);
        if (admin) {
          // console.log(admin);
          
          return done(null, admin);
        }
        return done(null, false);
      } catch (error) {
        console.error(error);
      }
    })
  );
};
export default configurePassport;