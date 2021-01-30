require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn'],
});
const axios = require('axios');
const validateCountryCode = require('../../utils/validateCountry');
const validateLocationResults = require('../../utils/validateLocationResults');

const openCageApi = 'https://api.opencagedata.com/geocode/v1/json?';
const ocKey = process.env.OPENCAGE_KEY;

const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = {
    Query: {
        getUserFavourites: async (_root, _args, request) => {
            //Primary auth conditional to check if user is logged in before accesing this query
            if (!request.user?.id) return ("You must be logged in to access the application.");

            return await prisma.favourites.findMany({ where: { userId: request.user.id } })
                .finally(async () => {
                    await prisma.$disconnect()
                });
        },
        getUserCity: async (_root, { lat, lon }, request) => {
            //Primary auth conditional to check if user is logged in before accesing this query
            if (!request.user?.id) return ("You must be logged in to access the application.");

            //Retrieve user city based on provided lat/lon
            return await axios.get(`${openCageApi}q=${lat},${lon}&key=${ocKey}`)
                .then(async ({ data }) => {

                    const result = await validateLocationResults(data);

                    const queryObj = {
                        city: result.components.city ? result.components.city : result.components.county,
                        state: result.components.state,
                        country: result.components.country,
                    };

                    return queryObj;

                })
                .catch(err => console.error(err));
        },
    },
    Mutation: {
        loginUser: async (_root, { email, pwd }, request) => {
            const user = await prisma.user.findUnique({
                where: { email: email },
                include: { login_data: { select: { pwd: true } } }
            })
                .finally(async () => {
                    await prisma.$disconnect()
                });

            const pwdMatch = await bcrypt.compare(pwd, user.login_data.pwd);

            if (!user) {
                return (`Could not find a user associated with the email: ${email}`);
            } else if (!pwdMatch) {
                return (`Password does not match our records for email: ${email}`);
            } else {
                request.login(user, error => (error ? error : user));
                return true;
            }
        },
        signupUser: async (_root, { email, pwd }, request) => {
            const existingUser = await prisma.user.findUnique({ where: { email: email } })
                .finally(async () => {
                    await prisma.$disconnect()
                });

            if (existingUser) {
                return false;
            } else {
                const hashedPwd = await bcrypt.hash(pwd, saltRounds);

                const user = await prisma.user.create({
                    data: {
                        email: email,
                        login_data: {
                            create: { pwd: hashedPwd },
                        },
                    }
                })
                    .finally(async () => {
                        await prisma.$disconnect()
                    });

                request.login(user, error => (error ? error : user));
                return true;
            }
        },
        //Create a favourite record based on provided trail id and user comments
        addFavourite: async (_root, { id, notes, name }, request) => {
            //Primary auth conditional to check if user is logged in before accesing this mutation
            if (!request.user?.id) return ("You must be logged in to add a favourite.");

            return await prisma.favourites.create({
                data: {
                    trail_id: parseInt(id),
                    trail_name: name,
                    trail_notes: notes ? notes : "",
                    user: {
                        connect: {// Connect to the main user table 
                            id: request.user.id
                        }
                    }
                },
            })
                .then(resp => {
                    return true;
                })
                .finally(async () => {
                    await prisma.$disconnect()
                });
        },
        editFavourite: async (_root, { id, notes }, request) => {
            //Primary auth conditional to check if user is logged in before accesing this mutation
            if (!request.user?.id) return ("You must be logged in to add a favourite.");

            return await prisma.favourites.update({
                where: { id: id },
                data: {
                    trail_notes: notes
                },
            })
                .then(resp => {
                    return true;
                })
                .finally(async () => {
                    await prisma.$disconnect()
                });
        },
        deleteFavourite: async (_root, { id }, request) => {
            //Primary auth conditional to check if user is logged in before accesing this mutation
            if (!request.user?.id) return ("You must be logged in to add a favourite.");

            return await prisma.favourites.delete({
                where: { id: id },
            })
                .then(resp => {
                    return true;
                })
                .finally(async () => {
                    await prisma.$disconnect()
                });
        },
        //Retrieve user coordinates based on manually submitted city and country values.
        getUserCoordinates: async (_root, { city, country }, request) => {
            //Primary auth conditional to check if user is logged in before accesing this mutation
            if (!request.user?.id) return ("You must be logged in to access the application.");

            //Validate country submitted and retrieve country code for API
            const countryCode = await validateCountryCode(country);

            //Return error value that country is not recognized and validate on front end
            if (!countryCode) return ("Country entered is not recognized.");

            return await axios.get(`${openCageApi}q=${city}&countrycode=${countryCode}&key=${ocKey}`)
                .then(async ({ data }) => {
                    const result = await validateLocationResults(data, countryCode);

                    return ({
                        lat: result.bounds.northeast.lat,
                        lng: result.bounds.northeast.lng,
                        city: result.components.city ? result.components.city : result.components.county,
                        country: result.components.country
                    });
                })
                .catch(err => console.log(err));
        },
        updateUserPref: async (_root, { fName, lName, lat, lon }, request) => {
            //Primary auth conditional to check if user is logged in before accesing this mutation
            if (!request.user?.id) return ("You must be logged in to access the application.");

            await prisma.user.update({
                where: { id: request.user.id },
                data: {
                    first_name: fName.charAt(0).toUpperCase() + fName.slice(1),
                    last_name: lName.charAt(0).toUpperCase() + lName.slice(1),
                    UserPref: {
                        create: {
                            set_lat: parseFloat(lat.toPrecision(6)),
                            set_lon: parseFloat(lon.toPrecision(6)),
                        }
                    },
                    LastLocation: {
                        create: {
                            lat: parseFloat(lat.toPrecision(6)),
                            lon: parseFloat(lon.toPrecision(6)),
                        }
                    }
                }
            })
                .finally(async () => {
                    await prisma.$disconnect()
                });

            return true;
        },
        //General mutation to retrieve all stored user data
        getUserData: async (_root, _args, request) => {
            //Primary auth conditional to check if user is logged in before accesing this mutation
            if (!request.user?.id) return ("You must be logged in to access the application.");

            return await prisma.user.findUnique({ where: { id: request.user.id }, include: { UserPref: { select: { set_lat: true, set_lon: true } } } })
                .then(resp => {
                    return resp;
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(async () => {
                    await prisma.$disconnect()
                });
        },
        logoutUser: (_root, _args, request) => {
            //Primary auth conditional to check if user is logged in before accesing this mutation
            if (!request.user) return ("You must be logged in to access the application.");

            request.logout();
            return true;
        },
    },
    User: {
        login_data: async (root) => {
            return await prisma.loginData.findUnique({ where: { userId: root.id } })
                .finally(async () => {
                    await prisma.$disconnect()
                });
        },
        UserPref: async (root) => {
            return await prisma.userPref.findUnique({ where: { userId: root.id } })
                .finally(async () => {
                    await prisma.$disconnect()
                });
        },
        LastLocation: async (root) => {
            return await prisma.lastLocation.findFirst({ where: { userId: root.id } })
                .finally(async () => {
                    await prisma.$disconnect()
                });
        },
        Favourites: async (root) => {
            return await prisma.favourites.findMany({ where: { userId: root.id } })
                .finally(async () => {
                    await prisma.$disconnect()
                });
        },
    }

}