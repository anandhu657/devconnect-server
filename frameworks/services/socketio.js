import io from "socket.io";
import ChatModel from "../database/mongoDB/models/chat";
import notificationDbRepositoryMongoDB from "../database/mongoDB/repositories/notificationRepositoryMongoDB";

export default function socketioConfig(server) {
    const socketio = io(server, {
        cors: {
            origin: '*'
        }
    });

    socketio.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('personal-message', (message) => {
            console.log('Received personal message:', message);

            const newMessage = new ChatModel({
                sender: message.sender,
                recipient: message.recipient,
                text: message.text,
                created: new Date()
            });

            newMessage.save().then(() => {
                console.log('Message saved to database');
                // Broadcast the message to the sender and recipient
                socketio.emit('get-personal-message', message);
            });
        });

        socket.on('join-room', (userId) => {
            socket.join(userId);
        });

        socket.on('notification', async (message) => {
            console.log('Received personal message:', message);

            const newNotification = await notificationDbRepositoryMongoDB().addNotification(message.sender, message.receiver, message.questionId);
            console.log('Notification saved to database', newNotification);

            socketio.emit('send-new-notification', newNotification);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}