export default function updateLikeByQuestionId(questionId, button, questionRepository) {
    if (button === 'like')
        return questionRepository.updateLikeById(questionId);
    if (button === 'dislike')
        return questionRepository.updatedisLikeById(questionId);
}