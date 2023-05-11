export default function findAllUsers(id, userRepository) {
    if (!id) {
        const error = new Error('id is required');
        error.statusCode = 401;
        throw error;
    }

    return userRepository.findAllUsers(id).then((users) => {
        try {
            if (!users) {
                const error = new Error('No users found');
                error.statusCode = 401;
                throw error;
            }

            return users;
        } catch (error) {
            console.log(error);
        }
    })
}