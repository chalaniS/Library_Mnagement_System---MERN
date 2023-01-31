import GoogleStratergy from "passport-google-oauth20";
import config from ".";
import logger from "../utils/logger";


const googleAuth = (passport) => {

  GoogleStratergy.Strategy;

  console.log(config)

  passport.use(
    new GoogleStratergy(
      {
        clientID: "201911271068-nl9b483k5qr00sumou9kq8mql5aritfj.apps.googleusercontent.com",
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_REDIRECT_URL,
      },
      (accessToken, refreshToken, profile, callback) => {
        console.log(profile);
        return callback(null, profile);
      }
    )
  );

  passport.serializeUser(function (user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser((id, callback) => {
    callback(null, id);
  });
};


export { googleAuth };