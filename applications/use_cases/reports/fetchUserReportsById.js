export default function fetchUserReportsById(userId, dbRepository) {

    if (!userId) {
        const error = new Error('userId is required');
        error.statusCode = 401;
        throw error;
    }

    return dbRepository.fetchUserReportsById(userId);
}