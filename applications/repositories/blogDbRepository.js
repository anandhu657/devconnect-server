export default function blogRepository(repository) {
    const findAll = (id) => repository.findAll(id);
    const create = (id) => repository.create(id);
    const findById = (id) => repository.findById(id);

    return {
        findAll,
        findById,
        create
    }
}