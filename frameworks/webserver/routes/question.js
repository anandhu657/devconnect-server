import authMiddleware from "../middlewares/authMiddleware";
import questionController from "../../../adapters/controllers/questionController";
import questionDbRepository from "../../../applications/repositories/questionDbRepository";
import questionDbRepositoryMongoDB from "../../database/mongoDB/repositories/questionRepositoryMongoDB";


export default function questionRouter(express) {
    const router = express.Router();

    const controller = questionController(
        questionDbRepository,
        questionDbRepositoryMongoDB,
    );

    router.route('/').get(authMiddleware, controller.getAllQuestions);
    router.route('/add').post(authMiddleware, controller.addQuestion);
    router.route('/:id').get(authMiddleware, controller.getQuestion);
    
    return router;
}