import authRouter from './auth';
import profileRouter from './profile';
import questionRouter from './question';
import blogRouter from './blogs';
import answersRouter from './answers';
import chatRouter from './chat';
import adminAuthRouter from './adminAuth';
import abuseReportRouter from './reports';

export default function routes(app, express) {
    app.use('/login', authRouter(express));
    app.use('/profile', profileRouter(express));
    app.use('/questions', questionRouter(express));
    app.use('/answers', answersRouter(express));
    app.use('/blogs', blogRouter(express));
    app.use('/chat', chatRouter(express));
    app.use('/report', abuseReportRouter(express));

    app.use('/adminlogin', adminAuthRouter(express));
    app.use('/admin', abuseReportRouter(express));
}