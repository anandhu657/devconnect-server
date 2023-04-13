import login from "../../applications/use_cases/auth/login";

export default function authController(
    userDbRepository,
    userDbRepositoryImpl,
    authServiceInterface,
    authServiceImpl
) {
    const dbRepository = userDbRepository(userDbRepositoryImpl())
    const authService = authServiceInterface(authServiceImpl())

    const loginUser = (req, res, next) => {
        const { email, name, picture } = req.body;
        const username = name;
        const profile_pic = picture;

        login(email, username, profile_pic, dbRepository, authService)
            .then((token) => {
                res.status(200).json({ token: token })
            })
            .catch((err) => console.log(err))
    };

    return {
        loginUser
    }
}