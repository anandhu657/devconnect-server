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

    router.route('/:user').get(authMiddleware, controller.fetchUserById);
    router.route('/edit').get(authMiddleware, controller.fetchUserById);
    router.route('/edit').post(authMiddleware, controller.updateUserByEmail);
    router.route('/current/user').get(authMiddleware, controller.fetchCurrentUser);
    router.route('/sendConnectionRequest').post(authMiddleware, controller.sendConnectionRequest);
    router.route('/acceptRequest').post(authMiddleware, controller.acceptRequest);
    router.route('/disConnectRequest').post(authMiddleware, controller.disConnectRequest);
    router.route('/savedBlogs/:user').get(authMiddleware, controller.getSavedBlogs);

    return router;
}