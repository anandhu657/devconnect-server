import findById from "../../applications/use_cases/user/findById";
import updateByEmail from "../../applications/use_cases/user/updateByEmail";
import addConnectionRequest from "../../applications/use_cases/user/addConnectionRequest";
import acceptConnectionRequest from "../../applications/use_cases/user/acceptConnectionRequest";
import disConnect from "../../applications/use_cases/user/disConnectRequest";
import fetchSavedBlogs from "../../applications/use_cases/user/fetchSavedBlogs";


export default function userController(
    userDbRepository,
    userDbRepositoryImpl
) {
    const dbRepository = userDbRepository(userDbRepositoryImpl());

    const fetchUserById = (req, res) => {
        const id = req.params.user
        findById(id, dbRepository)
            .then((user) => {
                console.log(user);
                res.json(user)
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

    const fetchCurrentUser = (req, res) => {
        const id = req.decodeToken.user.id;
        res.json(id)
    }

    const sendConnectionRequest = (req, res) => {
        const requestSenderId = req.decodeToken.user.id;
        const requestReceiverId = req.body.userId;

        addConnectionRequest(
            requestSenderId,
            requestReceiverId,
            dbRepository
        )
            .then(() => res.json())
            .catch((err) => console.log(err))
    }

    const acceptRequest = (req, res) => {
        const requestReceiverId = req.decodeToken.user.id;
        const requestSenderId = req.body.userId;

        acceptConnectionRequest(
            requestSenderId,
            requestReceiverId,
            dbRepository
        )
            .then(() => res.json())
            .catch((err) => console.log(err))
    }

    const disConnectRequest = (req, res) => {
        const requestReceiverId = req.decodeToken.user.id;
        const requestSenderId = req.body.userId;

        disConnect(
            requestSenderId,
            requestReceiverId,
            dbRepository
        )
            .then(() => res.json())
            .catch((err) => console.log(err))
    }

    const getSavedBlogs = (req, res) => {
        const userId = req.params.user;

        fetchSavedBlogs(userId, dbRepository)
            .then((blogs) => res.json(blogs))
            .catch((err) => console.log(err))
    }

    return {
        fetchUserById,
        updateUserByEmail,
        fetchCurrentUser,
        sendConnectionRequest,
        acceptRequest,
        disConnectRequest,
        getSavedBlogs,
    }
}