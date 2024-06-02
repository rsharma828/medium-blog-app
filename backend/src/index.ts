import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify, sign, decode } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRoutes } from './routes/blog'

const app = new Hono();

app.route("api/v1/user",userRouter);
app.route("api/v1/blog",blogRoutes);

// removed the links
export default app
