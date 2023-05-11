export default function acceptConnectionRequest(sender, receiver, userRepository) {
    return userRepository.acceptConnectionRequest(sender, receiver);
}