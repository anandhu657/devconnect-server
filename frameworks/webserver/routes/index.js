import authRouter from './auth';
import profileRouter from './profile';
import questionRouter from './question';
import blogRouter from './blogs';

export default function routes(app, express) {
    app.use('/login', authRouter(express));
    app.use('/profile', profileRouter(express));
    app.use('/questions', questionRouter(express));
    app.use('/blogs', blogRouter(express));
}