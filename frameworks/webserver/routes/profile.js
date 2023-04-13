import profileController from '../../../adapters/controllers/profileController';
import userDbRepository from '../../../applications/repositories/userDbRepository';
import userDbRepositoryMongoDB from '../../database/mongoDB/repositories/userRepositoryMongoDB';
import authMiddleware from '../middlewares/authMiddleware';

export default function profileRouter(express) {
    const router = express.Router();

    const controller = profileController(
        userDbRepository,
        userDbRepositoryMongoDB,
    );

    router.route('/').get(authMiddleware, controller.fetchUserById);
    router.route('/edit').get(authMiddleware, controller.fetchUserById);
    router.route('/edit').post(authMiddleware, controller.updateUserByEmail);

    return router;
}