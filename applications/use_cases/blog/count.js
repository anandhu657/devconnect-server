export default function count(id, dbRepository) {
    if (!id) {
        const error = new Error('id is required');
        error.statusCode = 401;
        throw error;
    }
    
    return dbRepository.count(id)
}