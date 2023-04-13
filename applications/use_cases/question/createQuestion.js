import question from "../../../entities/question";
import { ObjectId } from 'mongodb';

export default function createQuestion({
    id,
    title,
    description,
    date,
    dbRepository
}) {
    const newQuestion = question({
        user: new ObjectId(id),
        title: title,
        description: description,
        date: date
    }
    );

    return dbRepository.create(newQuestion);
}
