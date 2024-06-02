import z from "zod";

const signupInputs = z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
  })

  //type inference in zod

  export type signupInputs = z.infer<typeof signupInputs>

  export const signinInputs = z.object({
    username : z.string().email(),
    password:z.string().min(6)
  })

  export type signinInputs = z.infer<typeof signinInputs>

  export const createBlog = z.object({
    title : z.string(),
    content : z.string(),
  })

  export type createblog = z.infer<typeof signinInputs>

  export const updateBlog = z.object({
    title : z.string(),
    content : z.string(),
    id : z.string()
  })

  export type updateblog = z.infer<typeof signinInputs>