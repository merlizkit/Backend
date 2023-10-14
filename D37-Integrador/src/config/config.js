import 'dotenv/config';

export default {
    PORT : process.env.PORT || 8080,
    ENVIRONMENT : process.env.ENVIRONMENT || 'development',

    MONGO_ATLAS_URL : process.env.MONGO_ATLAS_URL,
    MONGO_LOCAL_URL : process.env.MONGO_LOCAL_URL,
    SECRET_KEY_JWT : process.env.SECRET_KEY_JWT,
    SECRET_MONGO : process.env.SECRET_MONGO,
    SECRET_COOKIES : process.env.SECRET_COOKIES,
    PERSISTENCE: process.env.PERSISTENCE,

    CLIENT_ID : process.env.CLIENT_ID,
    CLIENT_SECRET : process.env.CLIENT_SECRET,

    ADMIN_EMAIL : process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD : process.env.ADMIN_PASSWORD,

    EMAIL : process.env.EMAIL,
    PASSWORD : process.env.PASSWORD
}