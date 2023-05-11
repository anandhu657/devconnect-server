export default function report(content, user, reason) {
    return {
        getContent: () => content,
        getUser: () => user,
        getReason: () => reason
    }
}