import authController from '../../../adapters/controllers/authController';
import userDbRepository from '../../../applications/repositories/userDbRepository';
import userDbRepositoryMongoDB from '../../database/mongoDB/repositories/userRepositoryMongoDB';
import authServiceInterface from '../../../applications/services/authService';
import authServiceImpl from '../../services/authService';

export default function authRouter(express) {
    const router = express.Router();

    const controller = authController(
        userDbRepository,
        userDbRepositoryMongoDB,
        authServiceInterface,
        authServiceImpl
    );

    router.route('/').post(controller.loginUser)

    return router;
}