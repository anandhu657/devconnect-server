import mongoose from "mongoose";

const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    username: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    role: {
        type: 'string',
        required: true
    }
});

const Admin = mongoose.model("admins", AdminSchema);

export default Admin;