import question from "../../../entities/question";
import { ObjectId } from 'mongodb';

export default async function createQuestion({
    id,
    title,
    description,
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

    const newQuestion = question({
        user: new ObjectId(id),
        title: title,
        description: description,
        date: date,
        tags: tagId
    }
    );

    return dbRepository.create(newQuestion);
}
