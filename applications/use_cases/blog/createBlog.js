import blog from '../../../entities/blog';
import { ObjectId } from 'mongodb';

export default function createBlog({
    id,
    title,
    details,
    date,
    dbRepository
}) {
    const newBlog = blog({
        user: new ObjectId(id),
        title: title,
        details: details,
        date: date
    });

    return dbRepository.create(newBlog);
}