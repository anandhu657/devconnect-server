import authServiceImpl from '../../services/authService';
import authServiceInterface from '../../../applications/services/authService';

export default function authMiddleware(req, res, next) {
    const token = req.header('Authorization');

    const authService = authServiceInterface(authServiceImpl());

    if (!token) {
        throw new Error('No access token found');
    }

    if (token.split(' ')[0] !== 'Bearer') {
        throw new Error('Invalid token');
    }

    try {
        const decodeToken = authService.verify(token.split(' ')[1]);
        req.decodeToken = decodeToken;
        next();
    } catch (err) {
        throw new Error('Token is not valid');
    }
}