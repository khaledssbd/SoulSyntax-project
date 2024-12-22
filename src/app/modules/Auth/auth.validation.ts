import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .trim()
      .max(25, { message: 'Name cannot exceed 25 characters' }),

    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .trim()
      .email({ message: 'Invalid email address' }),

    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(8, { message: "Password can't be less then 8 characters" })
      .max(20, { message: "Password can't be more then 20 characters" }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required!' }),
    password: z.string({ required_error: 'Password is required!' }),
  }),
});

export const AuthValidations = {
  userValidationSchema,
  loginValidationSchema,
};
