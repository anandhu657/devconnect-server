export default function findAllTags(tagRepository) {

    return tagRepository.findAllTags().then((tags) => {
        try {
            if (!tags) {
                const error = new Error('No tags found');
                error.statusCode = 401;
                throw error;
            }

            const names = tags.map((tag) => tag.name);
            return names;
        } catch (error) {
            console.log(error);
        }
    })
}