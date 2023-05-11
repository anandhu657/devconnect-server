export default function chatDbRepository(repository) {
    const findAllMessages = (email) => repository.findAllMessages(email);

    return {
        findAllMessages
    }
}