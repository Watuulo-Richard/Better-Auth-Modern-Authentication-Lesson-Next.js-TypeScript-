import { sendVerificationEmail } from "@/actions/user";
import db from "@/prisma/instance";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { headers } from "next/headers";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  session: {
    expiresIn: 60 * 60 * 24, // 1 day (in seconds)
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days for remember me
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
          name: profile.name,
          email: profile.email,
          emailVerified: profile.email_verified ?? true,
          image: profile.picture,
          role: "USER",
        };
      },
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        const [firstName, ...lastNameParts] = (
          profile.name || profile.login
        ).split(" ");
        return {
          firstName: firstName || profile.login,
          lastName: lastNameParts.join(" ") || "",
          name: profile.name || profile.login,
          email: profile.email,
          emailVerified: true,
          image: profile.avatar_url,
          role: "USER",
        };
      },
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        const [firstName, ...lastNameParts] = (profile.name || "").split(" ");
        return {
          firstName: firstName || profile.given_name || "",
          lastName: lastNameParts.join(" ") || profile.family_name || "",
          name: profile.name || `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          emailVerified: true,
          image: profile.picture,
          role: "USER",
        };
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
        input: false, // Prevent users from setting their own role
      },
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
      phone: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [
    nextCookies(),
    emailOTP({
      // Generate 6-digit OTP automatically (default behavior)
      // You can customize the length if needed
      // otpLength: 6,

      // OTP expires in 10 minutes (600 seconds)
      expiresIn: 600,

      // Maximum verification attempts before OTP becomes invalid
      allowedAttempts: 3,

      // Send OTP emails for email verification
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          // Get user details from database
          const user = await db.user.findUnique({
            where: { email },
            select: { name: true, email: true },
          });

          // Send the 6-digit OTP via email
          await sendVerificationEmail({
            to: email,
            token: otp, // This is the 6-digit OTP
            userName: user?.name || email,
          });
        }
      },
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;

export async function getAuthUser(): Promise<User | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user as User;
  return user;
}

