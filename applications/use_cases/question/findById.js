export default function findById(id, questionRepository) {
    if (!id) {
        const error = new Error('id is required');
        error.statusCode = 401;
        throw error;
    }

    return questionRepository.findById(id).then((question) => {
        try {
            if (!question) {
                const error = new Error('No question found');
                error.statusCode = 401;
                throw error;
            }

            return question;
        } catch (error) {
            console.log(error);
        }
    })
}