import login from "../../applications/use_cases/adminAuth/login";

export default function adminAuthController(
    adminDbRepository,
    adminDbRepositoryImpl,
    authServiveInterface,
    authServiceImpl,
    bcryptServiceInterface,
    bcryptServiceImpl
) {
    const dbRepository = adminDbRepository(adminDbRepositoryImpl());
    const authService = authServiveInterface(authServiceImpl());
    const bcryptService = bcryptServiceInterface(bcryptServiceImpl());

    const loginAdmin = (req, res, next) => {
        const { email, password } = req.body;

        login(email, password, dbRepository, authService, bcryptService)
            .then((token) => {
                res.status(200).json({ token: token })
            })
            .catch((err) => console.log(err))
    };

    return {
        loginAdmin
    }
}