import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import UserDao from "../daos/mongodb/userDao.js";
import 'dotenv/config';


const userDao = new UserDao();

export const initializePassport = () => {
    passport.use('register', new LocalStrategy (
        {passReqToCallback: true, usernameField: 'email', passwordField: 'password'}, async (req,username,password,done) => {
            try {
                const result = await userDao.registerUser(req.body);
                return done(null,result);
            }
            catch (error) {
                return done("Error at getting user: " + error);
            }
        }
    ))

    passport.use('login', new LocalStrategy (
        {usernameField: 'email'}, async (username, password, done) => {
            try {
                const userExists = await userDao.loginUser({email: username, password});
                if(!userExists) return done(null, false);
                return done(null, userExists);
            }
            catch (error) {
                console.log(error);
                throw new Error(error);
            }
        }
    ))

    passport.use('github', new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/users/githubcallback'
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                const userExists = await userDao.getByEmail(profile._json.email);
                if(!userExists) {
                    const newUser = {
                        first_name: profile._json.name.split(' ')[0],
                        last_name: profile._json.name.split(' ')[1],
                        age: 38,
                        email: profile._json.email,
                        password: ''
                    }
                    const result = await userDao.registerUser(newUser);
                    return done(null, result);
                } else {
                    return done(null, userExists);
                };
            }
            catch (error) {
                console.log(error);
            }
        }
        ))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    });
    
    passport.deserializeUser(async(id, done)=> {
        const user = await userDao.getById(id);
        return done(null, user);
    });
}