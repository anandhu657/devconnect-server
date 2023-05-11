import TagModel from '../models/tag';

export default function () {
    const add = async (tag) => {
        const newTag = {
            name: tag
        };

        return await TagModel.findOneAndUpdate({ name: newTag.name },{ $set: newTag },{ upsert: true });
    }

    return {
        add
    }
}