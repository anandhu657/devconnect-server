import authMiddleware from "../middlewares/authMiddleware";
import blogController from "../../../adapters/controllers/blogController";
import blogDbRepository from "../../../applications/repositories/blogDbRepository";
import blogDbRepositoryMongoDB from "../../database/mongoDB/repositories/blogDbRepositoryMongoDB";
import tagsDbRepository from "../../../applications/repositories/tagsDbRepository";
import tagsDbRepositoryMongoDB from "../../database/mongoDB/repositories/tagsRepositoryMongoDB";
import userDbRepository from "../../../applications/repositories/userDbRepository";
import userDbRepositoryMongoDB from "../../database/mongoDB/repositories/userRepositoryMongoDB";

export default function blogRouter(express) {
    const router = express.Router();

    const controller = blogController(
        blogDbRepository,
        blogDbRepositoryMongoDB,
        tagsDbRepository,
        tagsDbRepositoryMongoDB,
        userDbRepository,
        userDbRepositoryMongoDB
    );

    router.route('/').get(authMiddleware, controller.getAllBlogs);
    router.route('/add').post(authMiddleware, controller.addBlog);
    router.route('/blog/:id').get(authMiddleware, controller.getBlog);
    router.route('/latest').get(authMiddleware, controller.getLatestBlog)
    router.route('/tags').get(authMiddleware, controller.getBlogByTag);
    router.route('/like/:blogId').get(authMiddleware, controller.likeBlog);
    router.route('/save/:blogId').get(authMiddleware, controller.saveBlog);
    router.route('/userBlogs/:user').get(authMiddleware, controller.getUserBlogs);
    // router.route('/noanswers').get(authMiddleware, controller.getBlogsWithNoAnswers);

    return router;
}