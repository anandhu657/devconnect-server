export default function answerDbRepository(repository) {
    const create = (question_id, answer) => repository.create(question_id, answer);
    const addComment = (questionId, answerId, userId, comment) => repository.addComment(questionId, answerId, userId, comment);

    return {
        create,
        addComment
    }
}