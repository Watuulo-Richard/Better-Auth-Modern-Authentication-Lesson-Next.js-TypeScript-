"use server";

import { Resend } from "resend";
import { auth } from "@/lib/auth";
import db from "@/prisma/instance";
import { baseAPI } from "@/config/axios";
import { APIError } from "better-auth/api";
import { SingleReactQueryUserTypesResponse } from "@/types/user";
import PasswordResetEmail from "@/components/auth/email/passwordReset";
import { EmailTemplate } from "@/components/auth/email/verification-email";
import { ForgotPasswordUserSchemaTypes, RegisterUserSchemaTypes, SignInUserSchemaTypes } from "@/types/user.schema";

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.BETTER_AUTH_URL || "";

type SendVerificationData = {
  to: string;
  token: string;
  userName: string;
};

export async function registerUser(
  userRegisterDetails: RegisterUserSchemaTypes,
) {
  try {
    /* Step 1: Create user with Better Auth */
    await auth.api.signUpEmail({
      body: {
        email: userRegisterDetails.email,
        image: userRegisterDetails.image as string,
        password: userRegisterDetails.password,
        name: `${userRegisterDetails.firstName} ${userRegisterDetails.lastName}`,
        firstName: userRegisterDetails.firstName,
        lastName: userRegisterDetails.lastName,
        phone: userRegisterDetails.phone,
      },
    });

    // Step 2: Send verification OTP automatically (handled by emailOTP plugin)
    // The emailOTP plugin will automatically trigger sendVerificationOTP
    await auth.api.sendVerificationOTP({
      body: {
        email: userRegisterDetails.email,
        type: "email-verification",
      },
    });

    // Step 3: Fetch the created user from database to get the id
    const createdUser = await db.user.findUnique({
      where: {
        email: userRegisterDetails.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        firstName: true,
        lastName: true,
        phone: true,
        image: true,
      },
    });

    if (!createdUser) {
      throw new Error("User was created but could not be retrieved");
    }

    return {
      success: true,
      data: {
        id: createdUser.id,
        email: createdUser.email,
        image: createdUser.image as string,
        name: `${createdUser.firstName} ${createdUser.lastName}`,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        phone: createdUser.phone,
      },
      message:
        "User Saved Successfully! Check your email for verification code...✅",
      error: null,
    };
  } catch (error) {
    if (error instanceof APIError) {
      if (error.status === "UNPROCESSABLE_ENTITY") {
        const errorMsg =
          error.message === "Failed to create user"
            ? "Phone Number is Already Taken"
            : "Email is Already Taken";
        return {
          success: false,
          data: null,
          error: errorMsg,
          status: error.status,
        };
      }
    }
    console.error("Registration error:", error);
    return {
      success: false,
      data: null,
      message: "Failed To Save User In The Database...!!!🥺😔",
      error:
        "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
    };
  }
}

/* Send verification email with 6-digit OTP */
export async function sendVerificationEmail(data: SendVerificationData) {
  try {
    const { data: responseData, error } = await resend.emails.send({
      from: "Watuulo-Richard Better Auth🔐 <info@lubegajovan.com>",
      to: data.to,
      subject: "Verify your email address",
      react: EmailTemplate({
        userEmail: data.to,
        userName: data.userName,
        verificationCode: data.token, // 6-digit OTP code
        expirationTime: "10 Mins",
      }),
    });

    console.log("✅ Verification OTP sent successfully:", {
      email: data.to,
      otp: data.token,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }

    return {
      success: true,
      error: null,
      data: responseData,
    };
  } catch (error) {
    console.error("❌ Send verification email error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
      data: null,
    };
  }
}

/* Verify email with 6-digit OTP code using emailOTP plugin */
export async function verifyEmail(data: { email: string; code: string }) {
  try {
    // Validate OTP format (should be 6 digits)
    if (!/^\d{6}$/.test(data.code)) {
      return {
        success: false,
        data: null,
        error: "Invalid verification code format. Please enter a 6-digit code.",
      };
    }

    // Use the emailOTP plugin's verifyEmail endpoint
    const result = await auth.api.verifyEmailOTP({
      body: {
        email: data.email,
        otp: data.code, // Send the 6-digit OTP
      },
    });

    return {
      success: true,
      data: result,
      message: "Email verified successfully! ✅",
      error: null,
    };
  } catch (error) {
    if (error instanceof APIError) {
      let errorMessage = error.message;

      // Handle specific error cases
      if (error.message.includes("TOO_MANY_ATTEMPTS")) {
        errorMessage =
          "Too many incorrect attempts. Please request a new verification code.";
      } else if (error.status === "BAD_REQUEST") {
        errorMessage = "Invalid or expired verification code.";
      } else if (error.status === "NOT_FOUND") {
        errorMessage = "Verification code not found. Please request a new one.";
      }

      console.error("❌ Verify email error:", {
        error: errorMessage,
        status: error.status,
      });

      return {
        success: false,
        data: null,
        error: errorMessage,
        status: error.status,
      };
    }

    console.error("❌ Verify email error:", error);
    return {
      success: false,
      data: null,
      error: "Failed to verify email. Please try again.",
    };
  }
}

/* Resend verification OTP code */
export async function resendVerificationEmail(email: string) {
  try {
    // Use the emailOTP plugin's sendVerificationOTP endpoint
    await auth.api.sendVerificationOTP({
      body: {
        email: email,
        type: "email-verification",
      },
    });

    console.log("✅ Verification OTP resent successfully to:", email);

    return {
      success: true,
      message: "Verification code sent! Check your email ✅",
      error: null,
    };
  } catch (error) {
    console.error("❌ Resend verification error:", error);

    if (error instanceof APIError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    return {
      success: false,
      error: "Failed to send verification code.",
    };
  }
}

export async function signInUserAction(userSigninDetails: SignInUserSchemaTypes) {
  try {
    await auth.api.signInEmail({
      body: {
        email: userSigninDetails.email,
        password: userSigninDetails.password,
        rememberMe: userSigninDetails.rememberMe,
      },
    });

    return {
      success: true,
      data: userSigninDetails,
      message: "User Signed In Successfully...✅",
      error: null,
    };
  } catch (error) {
    if (error instanceof APIError) {
      if (error.status === "UNAUTHORIZED") {
        return {
          success: false,
          data: null,
          error: error.message,
          status: error.status,
        };
      }
    }
    return {
      success: false,
      data: null,
      message: "Failed To Signin User...!!!🥺😔",
      error:
        "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
    };
  }
}

type SendMailData = {
  to: string;
  subject: string;
  url: string;
};

export async function sendEmail(data: SendMailData) {
  try {
    const { data: responseData, error } = await resend.emails.send({
      from: "Watuulo-Richard Better Auth🔐 <info@lubegajovan.com>",
      to: data.to,
      subject: data.subject,
      react: PasswordResetEmail({
        userEmail: data.to,
        resetLink: data.url,
        expirationTime: "10 Mins",
      }),
    });

    if (error) {
      return {
        success: false,
        error: error,
        data: null,
      };
    }

    return {
      success: true,
      error: null,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      data: null,
    };
  }
}

export async function sendForgotPasswordToken(
  forgotPasswordDetail: ForgotPasswordUserSchemaTypes,
) {
  try {
    const data = await auth.api.requestPasswordReset({
      body: {
        email: forgotPasswordDetail.email,
        redirectTo: `${baseUrl}/reset-password`,
      },
    });

    return {
      success: true,
      data: data,
      error: null,
    };
  } catch (error) {
    if (error instanceof APIError) {
      if (error.status === "UNAUTHORIZED") {
        return {
          success: false,
          data: null,
          error: error.message,
          status: error.status,
        };
      }
    }
    return {
      success: false,
      data: null,
      error:
        "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
    };
  }
}

export async function resetPassword(formData: {
  newPassword: string;
  token: string;
}) {
  try {
    const data = await auth.api.resetPassword({
      body: {
        newPassword: formData.newPassword,
        token: formData.token,
      },
    });

    return {
      success: true,
      data: data,
      error: null,
    };
  } catch (error) {
    if (error instanceof APIError) {
      if (error.status === "UNAUTHORIZED") {
        return {
          success: false,
          data: null,
          error: error.message,
          status: error.status,
        };
      }
    }
    return {
      success: false,
      data: null,
      error:
        "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
    };
  }
}

export async function getUserById(
  id: string,
): Promise<SingleReactQueryUserTypesResponse> {
  try {
    const userResponse = await baseAPI.get(`/user/${id}`);
    return {
      success: userResponse.data.success,
      data: userResponse.data.data,
      statusCode: userResponse.data.statusCode,
      error: userResponse.data.error,
      message: userResponse.data.message,
    };
  } catch (error) {
    console.error("Database error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      data: null,
      statusCode: 500,
      error: errorMessage,
      message: "Failed To Get User From The DataBase...!!!🥺😔",
    };
  }
}

