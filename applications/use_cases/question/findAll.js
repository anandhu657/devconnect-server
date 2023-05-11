export default function findAll(id, pageSize, skip, questionRepository) {
    if (!id) {
        const error = new Error('id is required');
        error.statusCode = 401;
        throw error;
    }

    return questionRepository.findAll(id, pageSize, skip).then((questions) => {
        try {
            if (!questions) {
                const error = new Error('No questions found');
                error.statusCode = 401;
                throw error;
            }

            return questions;
        } catch (error) {
            console.log(error);
        }
    })
}