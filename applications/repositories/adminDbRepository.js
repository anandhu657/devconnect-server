export default function adminDbRepository(repository) {
    const findByEmail = (email) => repository.findByEmail(email);

    return {
        findByEmail
    };
}