import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';

//manufacturer
import manufacturerProfileRoutes from './routes/manufacturerProfile.routes.js';

//designer
import projectRoutes from './routes/project.routes.js';
import designerProfileRoutes from './routes/designerProfile.routes.js';

//rfq
import rfqRoutes from './routes/rfq.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

//quotation
import quotationRoutes from './routes/quotation.routes.js';

//order
import orderRoutes from './routes/order.routes.js';

//messages
import conversationRoutes from './routes/conversation.routes.js';

//ai
import aiRoutes from './routes/ai.routes.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

//manufacturer
app.use('/api/manufacturer-profile', manufacturerProfileRoutes);

//designer
app.use('/api/projects', projectRoutes);
app.use('/api/designer-profile', designerProfileRoutes);

//rfq
app.use('/api/rfqs', rfqRoutes);

//quotation
app.use('/api/quotations', quotationRoutes);

//order
app.use('/api/orders', orderRoutes);

//messages
app.use('/api/conversations', conversationRoutes);

//ai
app.use('/api/ai', aiRoutes);

app.use(errorHandler);

export default app;