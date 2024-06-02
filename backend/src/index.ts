import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify, sign, decode } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRoutes } from './routes/blog'

const app = new Hono();

app.route("api/v1/user",userRouter);
app.route("api/v1/blog",blogRoutes);

// postgres avien tech url - postgres://avnadmin:AVNS_sH9U_QIR788URei_ULP@pg-1ef72a7b-medium-project-rksharma.d.aivencloud.com:23598/defaultdb?sslmode=require9
// connection pool url - DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiODI5NmIyYTEtZjg1NS00MTc5LTgxZDMtYzJhMmVmMGMzNWU2IiwidGVuYW50X2lkIjoiNTA2YTViMTQ2MWY4NzNlMDk3YjgwMDI4OTc5MzcxMzFmOTA2MDNjNDcyODNjMTY0YWMzMGIxY2FhM2Q5NWI1YiIsImludGVybmFsX3NlY3JldCI6ImUxYWNkYWJkLTk0YjctNGVhNS1iYjdmLWFhZjY2ZmU4NTI1ZiJ9.KNKcbcfDGJNzsNrBZ70-w8TqC_Yb5vLzBXrgfaTwpLg"


export default app
