export default function addConnectionRequest(sender, receiver, userRepository) {
    return userRepository.addConnectionRequest(sender, receiver);
}