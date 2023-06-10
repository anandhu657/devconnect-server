import chatController from "../../../adapters/controllers/chatController";
import chatDbRepository from "../../../applications/repositories/chatDbRepository";
import chatDbRepositoryMongoDB from "../../database/mongoDB/repositories/chatDbRepositoryMongoDB";
import userRepositry from "../../../applications/repositories/userDbRepository";
import userRepositryMongoDB from "../../database/mongoDB/repositories/userRepositoryMongoDB";
import authMiddleware from "../middlewares/authMiddleware";

export default function chatRouter(express) {
    const router = express.Router();

    const controller = chatController(
        chatDbRepository,
        chatDbRepositoryMongoDB,
        userRepositry,
        userRepositryMongoDB
    );

    router.route('/users').get(authMiddleware, controller.fetchAllUsers);
    router.route('/currentUser').get(authMiddleware,controller.fetchCurrentUser);
    router.route('/messages/:email').get(authMiddleware, controller.fetchAllMessages);

    return router;
}