const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const googleAuth = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn'],
});

//Handle Google authentication based on Passport Google OAuth Stretegy
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.log('No Google ID or secret found, skipping Google Auth.');
} else {
    const googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/googleAuth/callback",
        passReqToCallback: true
    };

    const validateUser = async (request, accessToken, refreshToken, profile, done) => {
        await prisma.user.findUnique({
            where: {
                auth_id: profile.id,
            }
        })
            .then(async (resp) => {
                if (resp) {
                    return done(null, resp);
                } else {
                    await prisma.user.create({
                        data: {
                            auth_id: profile.id,
                            email: profile.email,
                        }
                    })
                        .then(resp => {
                            return done(null, resp);
                        })
                        .catch(err => console.log("User creation error:", err));
                }
            })
            .catch(err => console.log("User Find error:", err));
    }

    passport.use(new GoogleStrategy(
        googleConfig,
        validateUser
    ));

};


googleAuth.get('/', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

googleAuth.get('/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: 'http://localhost:3000/login',
}));


module.exports = googleAuth;
