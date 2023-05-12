export default function blogRepository(repository) {
    const findAll = (id, pageSize, skip, filter, sort) => repository.findAll(id, pageSize, skip, filter, sort);
    const create = (blog) => repository.create(blog);
    const findById = (id) => repository.findById(id);
    const findLatest = (id) => repository.findLatest(id);
    const findBlogByTag = (tags, id) => repository.findBlogByTag(tags, id);
    const likeBlogById = (blogId, userId) => repository.likeBlogById(blogId, userId);
    const saveBlog = (blogId, userId) => repository.saveBlog(blogId, userId);
    const count = (id) => repository.count(id);
    const fetchUserBlogs = (id) => repository.fetchUserBlogs(id);
    const changeReportCount = (blogId, value) => repository.changeReportCount(blogId, value);
    const blockBlogById = (blogId) => repository.blockBlogById(blogId);

    return {
        findAll,
        findById,
        create,
        findLatest,
        findBlogByTag,
        likeBlogById,
        saveBlog,
        count,
        fetchUserBlogs,
        changeReportCount,
        blockBlogById
    }
}