export default function updateLikeByUserId(userId, button, userRepository) {
    if (button === 'like')
        return userRepository.updateLikeById(userId);
    if (button === 'dislike')
        return userRepository.updatedisLikeById(userId);
}
