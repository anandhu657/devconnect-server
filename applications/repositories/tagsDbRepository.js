export default function tagsRepository(repository) {
    const add = (tag) => repository.add(tag);

    return {
        add
    };
}