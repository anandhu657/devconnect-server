export default function userRepositry(repository) {
    const findByEmail = (email) => repository.findByEmail(email);
    const add = (user) => repository.add(user);
    const findById = (id) => repository.findById(id);
    const updateByEmail = (email, user) => repository.updateByEmail(email, user);

    return {
        findByEmail,
        add,
        findById,
        updateByEmail
    };
}