import authMiddleware from "../middlewares/authMiddleware";
import questionController from "../../../adapters/controllers/questionController";
import questionDbRepository from "../../../applications/repositories/questionDbRepository";
import questionDbRepositoryMongoDB from "../../database/mongoDB/repositories/questionRepositoryMongoDB";
import tagsDbRepository from "../../../applications/repositories/tagsDbRepository";
import tagsDbRepositoryMongoDB from "../../database/mongoDB/repositories/tagsRepositoryMongoDB";
import userDbRepository from "../../../applications/repositories/userDbRepository";
import userDbRepositoryMongoDB from "../../database/mongoDB/repositories/userRepositoryMongoDB";

export default function questionRouter(express) {
    const router = express.Router();

    const controller = questionController(
        questionDbRepository,
        questionDbRepositoryMongoDB,
        tagsDbRepository,
        tagsDbRepositoryMongoDB,
        userDbRepository,
        userDbRepositoryMongoDB
    );

    router.route('/').get(authMiddleware, controller.getAllQuestions);
    router.route('/add').post(authMiddleware, controller.addQuestion);
    router.route('/question/:id').get(authMiddleware, controller.getQuestion);
    router.route('/profile/:id').get(authMiddleware, controller.getQuestionByProfileId);
    router.route('/like').post(authMiddleware, controller.likeQuestion);
    router.route('/dislike').post(authMiddleware, controller.dislikeQuestion);
    router.route('/tags').get(authMiddleware,controller.getQuestionByTag)
    router.route('/comment').post(authMiddleware, controller.addComment);

    return router;
}