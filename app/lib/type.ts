import z from "zod";

export const TodoSchema = z.object({
  content: z.string()
    .min(1, 'Content cannot be empty')
    .max(255, 'Content cannot be longer than 255 characters'),

})

export type Todo = z.infer<typeof TodoSchema>

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10, 'Password must be at least 10 characters long'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

export type SignUpSchema = z.infer<typeof signUpSchema>