export default function blog(...args) {
    return {
        getTitle: () => args[0].title,
        getDetails: () => args[0].details,
        getDate: () => args[0].date,
        getUser: () => args[0].user,
    }
}