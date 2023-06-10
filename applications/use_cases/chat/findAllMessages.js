export default function findAllMessages(senderEmail, recipientEmail, chatRepository) {
    return chatRepository.findAllMessages(senderEmail, recipientEmail);
}