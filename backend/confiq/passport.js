import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import 'dotenv/config'
import userModel from "../models/userModel.js"

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'/api/auth/google/callback'
},

async (accessToken , refreshToken , profile , done)=>{
    try {
        let user = await userModel.findOne({googleId : profile.id});
        if(user){
            return done(null , user);
        }else{
            user = new userModel({
                fullname : profile.displayName,
                email : profile.emails[0].value,
                googleId:profile.id,
                isVerified : true,
            });
            await user.save();
            return done(null , user);
        }
    } catch (error) {
        return done(error, null)
    }
}
));

export default passport;