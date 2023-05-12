import findAll from "../../applications/use_cases/blog/findAll";
import createBlog from "../../applications/use_cases/blog/createBlog";
import findById from "../../applications/use_cases/blog/findById";
import findLatest from "../../applications/use_cases/blog/findLatest";
import findBlogByTag from "../../applications/use_cases/blog/findBlogByTag";
import likeBlogById from "../../applications/use_cases/blog/likeBlog";
import saveBlogById from "../../applications/use_cases/blog/saveBlog";
import count from "../../applications/use_cases/blog/count";
import fetchUserBlogs from "../../applications/use_cases/blog/fetchUserBlogs";

export default function blogController(
    blogDbRepository,
    blogDbRepositoryImpl,
    tagsDbRepository,
    tagsDbRepositoryImpl,
    userDbRepository,
    userDbRepositoryImpl
) {
    const dbRepository = blogDbRepository(blogDbRepositoryImpl());
    const tagsRepository = tagsDbRepository(tagsDbRepositoryImpl());
    const userRepository = userDbRepository(userDbRepositoryImpl());

    const getAllBlogs = async (req, res) => {
        const id = req.decodeToken.user.id;
        const page = parseInt(req.query.skip) + 1
        const pageSize = +req.query.limit || 10
        const skip = (page - 1) * pageSize
        const filter = req.query.filter;
        const sort = req.query.sort;
        const totalPosts = await count(id, dbRepository)

        findAll(id, pageSize, skip, filter, sort, dbRepository)
            .then((blogs) => res.json({ blogs, totalPosts }))
            .catch((err) => console.log(err))
    }

    const addBlog = (req, res, next) => {
        const id = req.decodeToken.user.id;
        const { title, details } = req.body.blog;
        const date = new Date();
        const tags = req.body.tags;

        createBlog({
            id,
            title,
            details,
            date,
            tags,
            dbRepository,
            tagsRepository
        })
            .then(() => res.json({ success: true }))
            .catch((err) => console.log(err))
    }

    const getBlog = (req, res, next) => {
        const id = req.params.id;

        findById(id, dbRepository)
            .then((blog) => res.json(blog))
            .catch((err) => console.log(err))
    }

    const getLatestBlog = (req, res) => {
        const id = req.decodeToken.user.id
        findLatest(id, dbRepository)
            .then((blogs) => res.json(blogs))
            .catch(err => console.log(err))
    }

    const getBlogByTag = (req, res) => {
        const tags = req.query.tags.split(',');
        const id = req.decodeToken.user.id;

        findBlogByTag(tags, id, dbRepository)
            .then((blogs) => res.json(blogs))
            .catch(err => console.log(err))
    }

    const likeBlog = (req, res) => {
        const blogId = req.params.blogId;
        const userId = req.decodeToken.user.id;

        likeBlogById(blogId, userId, dbRepository)
            .then(() => res.json())
            .catch(err => console.log(err))
    }

    const saveBlog = (req, res) => {
        const blogId = req.params.blogId;
        const userId = req.decodeToken.user.id;

        saveBlogById(blogId, userId, dbRepository, userRepository)
            .then(() => res.json())
            .catch(err => console.log(err))
    }

    const getUserBlogs = (req, res) => {
        const userId = req.params.user;

        fetchUserBlogs(userId, dbRepository)
            .then((blogs) => res.json(blogs))
            .catch((err) => console.log(err))
    }

    return {
        getAllBlogs,
        getBlog,
        addBlog,
        getLatestBlog,
        getBlogByTag,
        likeBlog,
        saveBlog,
        getUserBlogs
    }
}