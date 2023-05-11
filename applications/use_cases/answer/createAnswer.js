import answers from '../../../entities/answer';
import { ObjectId } from 'mongodb';

export default function createAnswer(
    {
        answer,
        question_id,
        user,
        date,
        dbRepository,
    },
) {
    const newAnswer = answers({
        answer: answer,
        user: new ObjectId(user),
        date: date,
    });

    return dbRepository.create(question_id, newAnswer);
}