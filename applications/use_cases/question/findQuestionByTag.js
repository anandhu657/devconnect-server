export default function findQuestionByTag(tags, id, questionRepository) {
    if (!id) {
        const error = new Error('id is required');
        error.statusCode = 401;
        throw error;
    }

    if (!tags) {
        const error = new Error('tags is required');
        error.statusCode = 401;
        throw error;
    }

    return questionRepository.findQuestionByTag(tags, id).then((questions) => {
        try {
            if (!questions) {
                const error = new Error('No question found');
                error.statusCode = 401;
                throw error;
            }

            return questions;
        } catch (error) {
            console.log(error);
        }
    })
}