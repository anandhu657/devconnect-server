export default async function saveBlog(blogId, userId, blogRepository, userRepository) {
    const blog = blogRepository.saveBlog(blogId, userId);
    const user = userRepository.saveBlog(blogId, userId);

    return Promise.all([blog, user])
}