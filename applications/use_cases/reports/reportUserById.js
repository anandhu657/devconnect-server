import reportEntity from '../../../entities/report';

export default function reportUserById(user, reportedUser, reason, dbRepository) {
    if (!user) {
        const error = new Error('user_id is required');
        error.statusCode = 401;
        throw error;
    }

    if (!reportedUser) {
        const error = new Error('reported user id is required');
        error.statusCode = 401;
        throw error;
    }

    const newReport = reportEntity(user, reportedUser, reason);

    return dbRepository.reportUserById(newReport);
}