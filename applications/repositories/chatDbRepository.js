export default function chatDbRepository(repository) {
    const findAllMessages = (senderEmail, recipientEmail) => repository.findAllMessages(senderEmail, recipientEmail);

    return {
        findAllMessages
    }
}