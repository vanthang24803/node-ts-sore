import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
});

export const RegisterResponse = z.object({
    email: z.string().email().min(1),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
  });
  

export const LoginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

