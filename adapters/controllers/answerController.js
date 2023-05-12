import createAnswer from "../../applications/use_cases/answer/createAnswer";
import createAnswerComment from "../../applications/use_cases/answer/addComment";
import addAcceptAnswer from "../../applications/use_cases/answer/acceptAnswer";
import addLikeAnswer from "../../applications/use_cases/answer/addLikeAnswer";
import addDislikeAnswer from "../../applications/use_cases/answer/addDislikeAnswer";

export default function answerController(
    answerDbRepository,
    answerDbRepositoryImpl
) {
    const dbRepository = answerDbRepository(answerDbRepositoryImpl());

    const addAnswer = (req, res) => {
        const { question_id } = req.body;
        const { answer } = req.body.answer;
        const user = req.decodeToken.user.id;
        const date = new Date();

        createAnswer({
            answer,
            question_id,
            user,
            date,
            dbRepository
        })
            .then(() => res.json({ success: true }))
            .catch((err) => console.log(err))
    }

    const addComment = (req, res) => {
        const { questionId, answerId } = req.body;
        const { comment } = req.body.answerComment;
        const userId = req.decodeToken.user.id;

        createAnswerComment(questionId, answerId, userId, comment, dbRepository)
            .then(() => res.json({ success: true }))
            .catch((err) => console.log(err))
    }

    const acceptAnswer = (req, res) => {
        const { questionId, answerId } = req.body;

        addAcceptAnswer(questionId, answerId, dbRepository)
            .then(() => res.json({ success: true }))
            .catch((err) => console.log(err))
    }

    const likeAnswer = (req, res) => {
        const { questionId, answerId } = req.body;
        const userId = req.decodeToken.user.id;

        addLikeAnswer(questionId, answerId, userId, dbRepository)
            .then(() => res.json({ success: true }))
            .catch((err) => console.log(err))
    }

    const dislikeAnswer = (req, res) => {
        const { questionId, answerId } = req.body;
        const userId = req.decodeToken.user.id;

        addDislikeAnswer(questionId, answerId, userId, dbRepository)
            .then(() => res.json({ success: true }))
            .catch((err) => console.log(err))
    }

    return {
        addAnswer,
        addComment,
        acceptAnswer,
        likeAnswer,
        dislikeAnswer
    }
}