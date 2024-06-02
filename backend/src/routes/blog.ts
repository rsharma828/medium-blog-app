import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRoutes.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];

    try {
        const user = await verify(token, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({ error: "unauthorized" });
        }
    } catch (error) {
        console.error("JWT verification failed:", error);
        c.status(403);
        return c.json({ error: "unauthorized" });
    }
});

blogRoutes.post('/', async (c) => {
    const body = await c.req.json();
    const authorId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId,
        }
    });

    return c.json({
        id : blog.id
    });
});

blogRoutes.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,
            authorId: c.get("userId") || "nfis" // Using dynamic authorId
        }
    });

    return c.json({
        blog:blog
    });
});


blogRoutes.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany();

    return c.json({
        blogs
    });
});


blogRoutes.get('/:id', async (c) => {
    const id  = c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
        });

        if (blog) {
            return c.json({ blog });
        } else {
            c.status(404);
            return c.json({ message: "Blog post not found" });
        }
    } catch (e) {
        console.error(e);
        c.status(500);
        return c.json({
            message: "Error while fetching blog post"
        });
    }
});

