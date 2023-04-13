export default function questionRepository(repository) {
    const findAll = (id) => repository.findAll(id);
    const create = (question) => repository.create(question);
    const findById = (id) => repository.findById(id);
    
    return {
        findAll,
        findById,
        create
    }
}