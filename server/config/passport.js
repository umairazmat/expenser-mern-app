import pkg from 'passport-jwt'
import User from '../models/User.js';
const JwtStrategy = pkg.Strategy
const ExtractJwt = pkg.ExtractJwt
import dotenv from "dotenv";

dotenv.config();


let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({ _id: jwt_payload._id });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
