import authMiddleware from "../middlewares/authMiddleware";
import abuseReportController from "../../../adapters/controllers/reportsController";
import abuseReportDbRepository from "../../../applications/repositories/reportsDbRepository";
import abuseReportDbRepositoryMongoDB from "../../database/mongoDB/repositories/reportsRepositoryMongoDB";
import userDbRepository from "../../../applications/repositories/userDbRepository";
import userDbRepositoryMongoDB from "../../database/mongoDB/repositories/userRepositoryMongoDB";
import questionDbRepository from "../../../applications/repositories/questionDbRepository";
import questionDbRepositoryMongoDB from "../../database/mongoDB/repositories/questionRepositoryMongoDB";
import blogDbRepository from "../../../applications/repositories/blogDbRepository";
import blogDbRepositoryMongoDB from "../../database/mongoDB/repositories/blogDbRepositoryMongoDB";

export default function abuseReportRouter(express) {
    const router = express.Router();

    const controller = abuseReportController(
        abuseReportDbRepository,
        abuseReportDbRepositoryMongoDB,
        userDbRepository,
        userDbRepositoryMongoDB,
        questionDbRepository,
        questionDbRepositoryMongoDB,
        blogDbRepository,
        blogDbRepositoryMongoDB
    );

    router.route('/report/user').post(authMiddleware, controller.reportUser);
    router.route('/get/user').get(authMiddleware, controller.getAllUserReports);
    router.route('/get/user/:userId').get(authMiddleware, controller.getUserReports);
    router.route('/report/change/valid').put(authMiddleware, controller.changeReportValid);
    router.route('/user/block').put(authMiddleware, controller.blockUser);

    router.route('/report/question').post(authMiddleware, controller.reportQuestion);
    router.route('/get/question').get(authMiddleware, controller.getAllQuestionReports);
    router.route('/get/question/:questionId').get(authMiddleware, controller.getQuestionReports);
    router.route('/report/change/valid/question').put(authMiddleware, controller.changeQuestionReportValid);
    router.route('/question/block').put(authMiddleware, controller.blockQuestion);

    router.route('/get/blog').get(authMiddleware, controller.getAllBlogReports);
    router.route('/report/blog').post(authMiddleware, controller.reportBlog);
    router.route('/get/blog/:blogId').get(authMiddleware, controller.getBlogReports);
    router.route('/report/change/valid/blog').put(authMiddleware, controller.changeBlogReportValid);
    router.route('/blog/block').put(authMiddleware, controller.blockBlog);

    return router;
}