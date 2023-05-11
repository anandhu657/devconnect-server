import AdminModel from '../models/admin'

export default function adminRepositoryMongoDb() {
    const findByEmail = (email) => AdminModel.findOne({ email: email })

    return {
        findByEmail
    }
}