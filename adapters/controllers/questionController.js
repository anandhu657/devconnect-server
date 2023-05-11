import findAll from "../../applications/use_cases/question/findAll";
import createQuestion from "../../applications/use_cases/question/createQuestion";
import findById from "../../applications/use_cases/question/findById";
import findAllByProfileId from "../../applications/use_cases/question/findAllByProfileId";
import updateLikeByUserId from "../../applications/use_cases/user/updateLikeById";
import updateLikeByQuestionId from "../../applications/use_cases/question/updateLikeByQuestionId";
import count from "../../applications/use_cases/question/countQuestions";
import findQuestionByTag from '../../applications/use_cases/question/findQuestionByTag';
import addCommentById from "../../applications/use_cases/question/addComment";

export default function questionController(
    questionDbRepository,
    questionDbRepositoryImpl,
    tagsDbRepository,
    tagsDbRepositoryImpl,
    usersDbRepository,
    usersDbRepositoryImpl
) {
    const dbRepository = questionDbRepository(questionDbRepositoryImpl());
    const tagsRepository = tagsDbRepository(tagsDbRepositoryImpl());
    const userRepository = usersDbRepository(usersDbRepositoryImpl());

    const getAllQuestions = async (req, res) => {
        const id = req.decodeToken.user.id;
        const page = parseInt(req.query.skip) + 1
        const pageSize = +req.query.limit || 10
        const skip = (page - 1) * pageSize
        const totalPosts = await count(id, dbRepository)

        findAll(id, pageSize, skip, dbRepository)
            .then((questions) => res.json({ questions, totalPosts }))
            .catch((err) => console.log(err))
    }

    const addQuestion = (req, res, next) => {
        console.log(req.body)
        const id = req.decodeToken.user.id;
        const { title, description } = req.body.question;
        const date = new Date();
        const tags = req.body.tags;

        createQuestion({
            id,
            title,
            description,
            date,
            tags,
            dbRepository,
            tagsRepository
        })
            .then(() => res.json({ success: true }))
            .catch((err) => next(err))
    }

    const getQuestion = (req, res, next) => {
        const id = req.params.id;
        findById(id, dbRepository)
            .then((question) => res.json(question))
            .catch((err) => console.log(err))

    }

    const getQuestionByProfileId = (req, res, next) => {
        const id = req.params.id;
        findAllByProfileId(id, dbRepository)
            .then((questions) => res.json(questions))
            .catch((err) => console.log(err))
    }

    const getQuestionByTag = (req, res) => {
        const tags = req.query.tags.split(',');
        const id = req.decodeToken.user.id;
        findQuestionByTag(tags, id, dbRepository)
            .then((questions) => res.json(questions))
            .catch(err => console.log(err))
    }

    const likeQuestion = async (req, res) => {
        const userId = req.decodeToken.user.id;
        const questionId = req.body.question_id;
        const button = 'like'

        const response = await updateLikeByUserId(userId, button, userRepository)
        if (response.modifiedCount !== 0) {
            updateLikeByQuestionId(questionId, button, dbRepository)
                .then(() => res.json({ success: true }))
                .catch((err) => console.log(err))
        } else {
            res.json({ success: false })
        }
    }

    const dislikeQuestion = async (req, res) => {
        const userId = req.decodeToken.user.id;
        const questionId = req.body.question_id;
        const button = 'dislike'

        const response = await updateLikeByUserId(userId, button, userRepository)
        if (response.modifiedCount !== 0) {
            updateLikeByQuestionId(questionId, button, dbRepository)
                .then(() => res.json({ success: true }))
                .catch((err) => console.log(err))
        } else {
            res.json({ success: false })
        }
    }

    const addComment = (req, res) => {
        console.log(req.body)
        const { question_id } = req.body;
        const { comment } = req.body.comment;
        const userId = req.decodeToken.user.id;

        addCommentById(question_id, userId, comment, dbRepository)
            .then(() => res.json({ success: true }))
            .catch((err) => console.log(err))
    }

    return {
        getAllQuestions,
        addQuestion,
        getQuestion,
        getQuestionByProfileId,
        getQuestionByTag,
        likeQuestion,
        dislikeQuestion,
        addComment
    }
}