import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TagSchema = new Schema({
    name: {
        type: 'string',
        required: true,
        unique: true,
        lowercase: true
    },
});

const Tag = mongoose.model("tags", TagSchema);

export default Tag;