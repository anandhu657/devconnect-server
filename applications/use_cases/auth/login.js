 import userEntity from '../../../entities/user'

export default function login(email, username, profile_pic, userRepository, authService) {
    if (!email) {
        const error = new Error('Please enter an email address');
        error.statusCode = 401;
        throw error;
    }

    return userRepository.findByEmail(email).then(async (user) => {
        if (!user) {
            let date = new Date();
            const newUser = userEntity({
                username: username,
                email: email,
                profile_pic: profile_pic,
                date: date
            }
            )
            user = await userRepository.add(newUser);
        }

        const payloads = {
            user: {
                id: user._id,
                email: user.email,
            }
        }
        return authService.generateToken(payloads);
    })
}