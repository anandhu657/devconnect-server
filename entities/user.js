export default function user(...args) {
    return {
        getUserName: () => args[0].username,
        getEmail: () => args[0].email,
        getProfilePic: () => args[0].profile_pic,
        getDate: () => args[0].date,
        getTitle: () => args[0].title,
        getAbout: () => args[0].about,
        getGitLink: () => args[0].gitlink,
        getLinkedInLink: () => args[0].linkinlink,
        getPersonalWebLink: () => args[0].personalWeblink,
    }
}