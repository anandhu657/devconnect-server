import authMiddleware from '../middlewares/authMiddleware';
import answerController from '../../../adapters/controllers/answerController';
import answerDbRepository from '../../../applications/repositories/answerDbRepository';
import answerDbRepositoryMongoDb from '../../database/mongoDB/repositories/answerRepositoryMongoDB';

export default function answersRouter(express) {
    const router = express.Router();

    const controller = answerController(
        answerDbRepository,
        answerDbRepositoryMongoDb,
    );

    router.route('/').post(authMiddleware, controller.addAnswer);
    router.route('/comment').post(authMiddleware, controller.addComment);
    router.route('/accept').post(authMiddleware, controller.acceptAnswer);
    router.route('/like').post(authMiddleware, controller.likeAnswer);
    router.route('/dislike').post(authMiddleware, controller.dislikeAnswer);

    return router;
}