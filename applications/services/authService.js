export default function authService(service) {
    const verify = (token) => service.verify(token);

    const generateToken = (payload) => service.generateToken(payload);

    return {
        verify,
        generateToken
    };
}