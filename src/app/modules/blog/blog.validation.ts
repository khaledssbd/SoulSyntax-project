import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .trim()
      .min(8, { message: "Title can't be less then 8 characters" }),

    content: z
      .string({
        required_error: 'Content is required',
        invalid_type_error: 'Content must be a string',
      })
      .trim()
      .min(10, { message: "Content can't be less then 10 characters" }),

    //     author: z.string({
    //       invalid_type_error: 'Author id must be string',
    //       required_error: 'Author id is required',
    //     }),
  }),
});


const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .trim()
      .min(8, { message: "Title can't be less then 8 characters" })
      .optional(),

    content: z
      .string({
        required_error: 'Content is required',
        invalid_type_error: 'Content must be a string',
      })
      .trim()
      .min(10, { message: "Content can't be less then 10 characters" })
      .optional(),

    //     author: z.string({
    //       invalid_type_error: 'Author id must be string',
    //       required_error: 'Author id is required',
    //     }),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
