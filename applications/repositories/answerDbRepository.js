export default function answerDbRepository(repository) {
    const create = (question_id, answer) => repository.create(question_id, answer);
    const addComment = (questionId, answerId, userId, comment) => repository.addComment(questionId, answerId, userId, comment);
    const acceptAnswer = (questionId, answerId) => repository.acceptAnswer(questionId, answerId);
    const addLikeAnswer = (questionId, answerId, userId) => repository.addLikeAnswer(questionId, answerId, userId);
    const addDislikeAnswer = (questionId, answerId, userId) => repository.addDislikeAnswer(questionId, answerId, userId);

    return {
        create,
        addComment,
        acceptAnswer,
        addLikeAnswer,
        addDislikeAnswer
    }
}