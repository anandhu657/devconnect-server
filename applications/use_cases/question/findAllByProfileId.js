export default function findAllByProfileId(id, questionRepository) {
    if (!id) {
        const error = new Error('id is required');
        error.statusCode = 401;
        throw error;
    }

    return questionRepository.findAllByProfileId(id).then((questions) => {
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