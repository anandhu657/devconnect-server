export default function findAllMessages(email, chatRepository) {
    return chatRepository.findAllMessages(email);
}