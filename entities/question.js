export default function question(...args) {
    return {
        getTitle: () => args[0].title,
        getDescription: () => args[0].description,
        getDate: () => args[0].date,
        getUser: () => args[0].user,
        getTags: () => args[0].tags
    }
}