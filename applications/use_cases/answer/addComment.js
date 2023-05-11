export default function addComment(questionId, answerId, userId, comment, dbRepository) {
    if (!questionId) {
        const error = new Error('question_id is required');
        error.statusCode = 401;
        throw error;
    }

    if (!comment) {
        const error = new Error('comment is required');
        error.statusCode = 401;
        throw error;
    }

    if (!userId) {
        const error = new Error('userid  is required');
        error.statusCode = 401;
        throw error;
    }

    if (!answerId) {
        const error = new Error('answerId  is required');
        error.statusCode = 401;
        throw error;
    }

    return dbRepository.addComment(questionId, answerId, userId, comment).then((response) => {
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