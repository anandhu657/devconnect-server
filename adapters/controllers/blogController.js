import findAll from "../../applications/use_cases/blog/findAll";
import createBlog from "../../applications/use_cases/blog/createBlog";
import findById from "../../applications/use_cases/blog/findById";

export default function blogController(
    blogDbRepository,
    blogDbRepositoryImpl
) {
    const dbRepository = blogDbRepository(blogDbRepositoryImpl());

    const getAllBlogs = (req, res, next) => {
        const id = req.decodeToken.user.id;
        findAll(id, dbRepository)
            .then((blogs) => res.json(blogs))
            .catch((err) => console.log(err))
    }

    const addBlog = (req, res, next) => {
        const id = req.decodeToken.user.id;
        const { title, details } = req.body;
        const date = new Date();

        createBlog({
            id,
            title,
            details,
            date,
            dbRepository
        })
            .then((message) => res.json(message))
            .catch((err) => console.log(err))
    }

    const getBlog = (req, res, next) => {
        const id = req.params.id;
        findById(id, dbRepository)
            .then((blog) => res.json(blog))
            .catch((err) => console.log(err))
    }

    return {
        getAllBlogs,
        getBlog,
        addBlog
    }
}