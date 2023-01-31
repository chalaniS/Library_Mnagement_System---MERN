import GoogleStratergy from "passport-google-oauth20";
import config from ".";
import User from "../api/model/user.model"



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
      async (accessToken, refreshToken, profile, callback) => {

        const userObj = {
          googleId: profile.id,
          displayName: profile.displayName,
          gmail: profile.email[0].value,
          image: profile.photos[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        }

        //SELECT * FROM User WHERE googleId = profile.id
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return callback(null, user);
        }

        //create user in data base
        User.create(userObj)
          .then((user) => {
            return callback(null, user);
          }).catch((err) => {
            return callback(err.message);
          });


      }
    )
  );

  passport.serializeUser(function (user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser((id, callback) => {
    User.findById(id, function (err, user) {
      callback(err, user);
    });
  });
};


export { googleAuth };