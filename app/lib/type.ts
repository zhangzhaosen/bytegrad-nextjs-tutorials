import z from "zod";

export const TodoSchema = z.object({
  content: z.string()
    .min(1, 'Content cannot be empty')
    .max(255, 'Content cannot be longer than 255 characters'),

})

export type Todo = z.infer<typeof TodoSchema>
