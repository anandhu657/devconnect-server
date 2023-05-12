export default function tagsRepository(repository) {
    const add = (tag) => repository.add(tag);
    const findAllTags = () => repository.findAllTags();

    return {
        add,
        findAllTags
    };
}