import findAll from "../../applications/use_cases/question/findAll";
import createQuestion from "../../applications/use_cases/question/createQuestion";
import findById from "../../applications/use_cases/question/findById";

export default function questionController(
    questionDbRepository,
    questionDbRepositoryImpl
) {
    const dbRepository = questionDbRepository(questionDbRepositoryImpl());

    const getAllQuestions = (req, res, next) => {
        const id = req.decodeToken.user.id;
        findAll(id, dbRepository)
            .then((questions) => res.json(questions))
            .catch((err) => console.log(err))
    }

    const addQuestion = (req, res, next) => {
        const id = req.decodeToken.user.id;
        const { title, description } = req.body;
        const date = new Date();

        createQuestion({
            id,
            title,
            description,
            date,
            dbRepository
        })
            .then((message) => res.json(message))
            .catch((err) => next(err))
    }

    const getQuestion = (req, res, next) => {
        const id = req.params.id;
        findById(id, dbRepository)
            .then((question) => res.json(question))
            .catch((err) => console.log(err))

    }

    return {
        getAllQuestions,
        addQuestion,
        getQuestion
    }
}
