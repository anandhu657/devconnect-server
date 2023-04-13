export default {
    port: process.env.PORT || 3000,
    mongo: {
        uri: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-code'
    },
    jwtSecret: process.env.JWT_SECRET || 'jkl!±@£!@ghj1237'
}