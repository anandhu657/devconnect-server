import user from '../../../entities/user';

export default function updateByEmail({
    email,
    title,
    about,
    gitlink,
    linkinlink,
    personalWeblink,
    dbRepository
}) {
    const updatedUser = user({
        title: title,
        about: about,
        gitlink: gitlink,
        linkinlink: linkinlink,
        personalWeblink: personalWeblink
    }
    );

    return dbRepository.updateByEmail(email, updatedUser);
}