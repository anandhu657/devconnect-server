import blog from '../../../entities/blog';
import { ObjectId } from 'mongodb';

export default async function createBlog({
    id,
    title,
    details,
    date,
    tags,
    dbRepository,
    tagsRepository
}) {
    let tagId = []
    if (tags.length != 0) {
        const tagIds = tags.map(async (tag) => {
            const { _id } = await tagsRepository.add(tag.split(' ').join(''));
            return _id;
        });

        tagId = await Promise.all(tagIds);
    }

    const newBlog = blog({
        user: new ObjectId(id),
        title: title,
        details: details,
        date: date,
        tags: tagId
    });

    return dbRepository.create(newBlog);
}