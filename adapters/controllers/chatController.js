import findAllUsers from '../../applications/use_cases/chat/findAllUsers';
import findById from '../../applications/use_cases/user/findById';
import findAllMessages from '../../applications/use_cases/chat/findAllMessages';

export default function chatController(
    chatDbRepository,
    chatDbRepositoryImpl,
    userDbRepository,
    userDbRepositoryImpl
) {
    const userRepository = userDbRepository(userDbRepositoryImpl());
    const chatRepository = chatDbRepository(chatDbRepositoryImpl());

    const fetchAllUsers = (req, res) => {
        const id = req.decodeToken.user.id;
        findAllUsers(id, userRepository)
            .then((users) => res.json(users))
            .catch((err) => console.log(err))
    }

    const fetchCurrentUser = (req, res) => {
        const id = req.decodeToken.user.id;
        findById(id, userRepository)
            .then((user) => res.json(user))
            .catch(err => console.log(err))
    }

    const fetchAllMessages = (req, res) => {
        const email = req.decodeToken.user.email;
        findAllMessages(email, chatRepository)
            .then((messages) => res.json(messages))
            .catch((err) => console.log(err))
    }

    return {
        fetchAllUsers,
        fetchCurrentUser,
        fetchAllMessages
    }
}