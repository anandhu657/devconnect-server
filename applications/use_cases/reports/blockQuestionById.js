export default function blockQuestionById(questionId, questionRepository) {

    if (!questionId) {
        const error = new Error('questionId is required');
        error.statusCode = 401;
        throw error;
    }

    return questionRepository.blockQuestionById(questionId).then((res) => {
        if (res.status)
            return { status: false };
        else
            return { status: true };
    })
}