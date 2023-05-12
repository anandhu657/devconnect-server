export default function addDislikeAnswer(questionId, answerId, userId, dbRepository) {
    if (!questionId) {
        const error = new Error('question_id is required');
        error.statusCode = 401;
        throw error;
    }

    if (!answerId) {
        const error = new Error('answerId  is required');
        error.statusCode = 401;
        throw error;
    }
    console.log(dbRepository)

    return dbRepository.addDislikeAnswer(questionId, answerId, userId, dbRepository).then((response) => {
        try {
            if (!response) {
                const error = new Error('No response found');
                error.statusCode = 401;
                throw error;
            }

            return response;
        } catch (error) {
            console.log(error);
        }
    })
}