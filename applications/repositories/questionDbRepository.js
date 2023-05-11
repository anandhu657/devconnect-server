export default function questionRepository(repository) {
    const findAll = (id, pageSize, skip) => repository.findAll(id, pageSize, skip);
    const create = (question) => repository.create(question);
    const findById = (id) => repository.findById(id);
    const findAllByProfileId = (id) => repository.findAllByProfileId(id);
    const updateLikeById = (id) => repository.updateLikeById(id);
    const updatedisLikeById = (id) => repository.updatedisLikeById(id)
    const count = (id) => repository.count(id);
    const findQuestionByTag = (tags, id) => repository.findQuestionByTag(tags, id);
    const addComment = (question_id, userId, comment) => repository.addComment(question_id, userId, comment);
    const changeReportCount = (id, value) => repository.changeReportCount(id, value);
    const blockQuestionById = (questionId) => repository.blockQuestionById(questionId);

    return {
        findAll,
        findById,
        create,
        findAllByProfileId,
        updateLikeById,
        updatedisLikeById,
        count,
        findQuestionByTag,
        addComment,
        changeReportCount,
        blockQuestionById
    }
}