export default function bcryptService(sevice) {
    const comparePassword = (password, hash) => sevice.compare(password, hash);

    return {
        comparePassword
    }
} 