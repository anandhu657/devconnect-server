export default function blockUserById(userId, userRepository) {

    if (!userId) {
        const error = new Error('userId is required');
        error.statusCode = 401;
        throw error;
    }

    return userRepository.blockUserById(userId).then((res) => {
        if (res.status)
            return { status: false };
        else
            return { status: true };
    })
}