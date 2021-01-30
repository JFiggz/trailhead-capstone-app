const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
const googleAuth = require('./utils/googleAuth');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 8080;

//GraphQl Schema and Resolvers compiled
const compiledSchema = makeExecutableSchema({
    typeDefs,
    resolvers
})

//Middleware
app.use(helmet({ contentSecurityPolicy: false }));

app.use(cors());

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    genid: (req) => uuidv4(),
    saveUninitialized: false,
    store: new MemoryStore({
        checkPeriod: 86400000
    })
}));


app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: id } });
        done(null, user);
    } catch (err) {
        done(err);
    };
})

//Google Auth Middleware
app.use('/googleAuth', googleAuth);

//GraphQL Middleware
app.use('/graphql', graphqlHTTP({
    schema: compiledSchema,
    graphiql: false,
}));


//Server Port
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});

