import reportEntity from '../../../entities/report';

export default function reportQuestionById(questionId, userId, reason, dbRepository) {
    if (!questionId) {
        const error = new Error('question_id is required');
        error.statusCode = 401;
        throw error;
    }

    if (!userId) {
        const error = new Error('question_id is required');
        error.statusCode = 401;
        throw error;
    }

    const newReport = reportEntity(questionId, userId, reason);

    return dbRepository.reportQuestionById(newReport);
}