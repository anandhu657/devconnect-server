import authMiddleware from "../middlewares/authMiddleware";
import blogController from "../../../adapters/controllers/blogController";
import blogDbRepository from "../../../applications/repositories/blogDbRepository";
import blogDbRepositoryMongoDB from "../../database/mongoDB/repositories/blogDbRepositoryMongoDB";

export default function blogRouter(express) {
    const router = express.Router();

    const controller = blogController(
        blogDbRepository,
        blogDbRepositoryMongoDB,
    );

    router.route('/').get(authMiddleware, controller.getAllBlogs);
    router.route('/add').post(authMiddleware, controller.addBlog);
    router.route('/:id').get(authMiddleware, controller.getBlog);

    return router;
}