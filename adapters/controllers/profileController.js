import findById from "../../applications/use_cases/user/findById";
import updateByEmail from "../../applications/use_cases/user/updateByEmail";
import fetchQuestionsByUserId from "../../applications/use_cases/user/fetchQuestionsByUserId";

export default function userController(
    userDbRepository,
    userDbRepositoryImpl
) {
    const dbRepository = userDbRepository(userDbRepositoryImpl());

    const fetchUserById = (req, res) => {
        const id = req.decodeToken.user.id;
        findById(id, dbRepository)
            .then(async (user) => {
                if (user._id) {
                    fetchQuestionsByUserId(user._id, dbRepository)
                        .then((questions) => {
                            res.json(user, questions)
                        })
                        .catch((err) => console.log(err))
                }
            })
            .catch((err) => console.log(err))
    };

    const updateUserByEmail = (req, res) => {
        const { email, title, about, gitlink, linkinlink, personalWeblink } = req.body;

        updateByEmail({
            email,
            title,
            about,
            gitlink,
            linkinlink,
            personalWeblink,
            dbRepository
        })
            .then((message) => res.json(message))
            .catch((err) => console.log(err))

    }

    return {
        fetchUserById,
        updateUserByEmail
    }
}