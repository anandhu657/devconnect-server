import jwt from 'jsonwebtoken';
import config from '../../config/config';

export default function authService() {
    const verify = (token) => jwt.verify(token, config.jwtSecret);

    const generateToken = (payload) =>
        jwt.sign(payload, config.jwtSecret, {
            expiresIn: 24 * 60 * 60
        });

    return {
        verify,
        generateToken
    };
};