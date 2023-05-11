export default function userRepositry(repository) {
    const findByEmail = (email) => repository.findByEmail(email);
    const add = (user) => repository.add(user);
    const findById = (id) => repository.findById(id);
    const updateByEmail = (email, user) => repository.updateByEmail(email, user);
    const updateLikeById = (id) => repository.updateLikeById(id);
    const updatedisLikeById = (id) => repository.updatedisLikeById(id);
    const findAllUsers = (id) => repository.findAllUsers(id);
    const addConnectionRequest = (sender, receiver) => repository.addConnectionRequest(sender, receiver);
    const acceptConnectionRequest = (sender, receiver) => repository.acceptConnectionRequest(sender, receiver);
    const disConnectRequest = (sender, receiver) => repository.disConnectRequest(sender, receiver);
    const saveBlog = (blogId, userId) => repository.saveBlog(blogId, userId);
    const fetchSavedBlogs = (id) => repository.fetchSavedBlogs(id);
    const changeReportCount = (id, value) => repository.changeReportCount(id, value);
    const blockUserById = (userId) => repository.blockUserById(userId);

    return {
        findByEmail,
        add,
        findById,
        updateByEmail,
        updateLikeById,
        updatedisLikeById,
        findAllUsers,
        addConnectionRequest,
        acceptConnectionRequest,
        disConnectRequest,
        saveBlog,
        fetchSavedBlogs,
        changeReportCount,
        blockUserById
    };
}