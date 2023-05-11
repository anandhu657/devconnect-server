export default function fetchQuestionReportsById(questionId, dbRepository) {

    if (!questionId) {
        const error = new Error('questionId is required');
        error.statusCode = 401;
        throw error;
    }

    return dbRepository.fetchQuestionReportsById(questionId);
}