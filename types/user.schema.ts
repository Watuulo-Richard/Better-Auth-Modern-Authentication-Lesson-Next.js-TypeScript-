import { z } from "zod";

export const UserRoleSchema = z.enum(["USER", "ADMIN"]);

export const UserSchema = z.object({
  id: z.string().cuid(),
  firstName: z.string().min(2, "First-Name must be at least 2 characters"),
  emailVerified: z.boolean(),
  phoneVerified: z.boolean(),
  physicalVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: UserRoleSchema,
  lastName: z.string().min(2, "Last-Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  createdAt: z.string(),
  updatedAt: z.string(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
});

export const RegisterUserSchema = UserSchema.omit({
  id: true,
  emailVerified: true,
  phoneVerified: true,
  physicalVerified: true,
  createdAt: true,
  updatedAt: true,
  role: true,
});

export type RegisterUserSchemaTypes = z.infer<typeof RegisterUserSchema>;

// Define the validation schema with Zod for Signin
export const SignInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
    rememberMe: z.boolean().optional(),
});
export type SignInUserSchemaTypes = z.infer<typeof SignInSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type ForgotPasswordUserSchemaTypes = z.infer<
  typeof forgotPasswordSchema
>;

export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: z.string(),
  token: z.string(),
});

export type ResetPasswordUserSchemaTypes = z.infer<typeof resetPasswordSchema>;
