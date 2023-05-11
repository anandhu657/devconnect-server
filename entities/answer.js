export default function answers(...args) {
    return {
        getAnswer: () => args[0].answer,
        getQuestion: () => args[0].question,
        getUser: () => args[0].user,
        getDate: () => args[0].date,
    }
}