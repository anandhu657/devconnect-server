import adminAuthController from "../../../adapters/controllers/adminAuthController";
import adminDbRepository from "../../../applications/repositories/adminDbRepository";
import adminRepositoryMongoDb from "../../database/mongoDB/repositories/adminRepositoryMongoDB";
import authServiceInterface from "../../../applications/services/authService";
import authServiceImpl from "../../services/authService";
import bcryptServiceInterface from '../../../applications/services/bcryptService';
import bcryptServiceImpl from "../../services/bcryptService";

export default function adminAuthRouter(express) {
    const router = express.Router();

    const controller = adminAuthController(
        adminDbRepository,
        adminRepositoryMongoDb,
        authServiceInterface,
        authServiceImpl,
        bcryptServiceInterface,
        bcryptServiceImpl
    );

    router.route('/').post(controller.loginAdmin);

    return router;
}