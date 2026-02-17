"use client";

// Think of imports like getting tools from a toolbox
import { useState, useRef, useEffect } from "react"; // React's special helpers
import { motion, AnimatePresence } from "framer-motion"; // Makes things move smoothly
import { useRouter } from "next/navigation"; // Helps us go to different pages
import Link from "next/link"; // Makes clickable links
import { ArrowRight, CheckCircle2, Clock, RefreshCw } from "lucide-react"; // Pretty icons
import { useForm } from "react-hook-form"; // Helps manage our form (like a form helper)
import { zodResolver } from "@hookform/resolvers/zod"; // Checks if our code is correct
import * as z from "zod"; // Rule maker - tells us what's allowed
import { verifyEmail, resendVerificationEmail } from "@/actions/user"; // Functions to check email
import { toast } from "sonner"; // Shows pop-up messages

// THE RULES: What makes a good verification code?
// It must be exactly 6 numbers, like: 123456
const otpSchema = z.object({
  otp: z
    .string() // It's text
    .length(6, "OTP must be exactly 6 digits") // Must be 6 characters long
    .regex(/^\d+$/, "OTP must contain only numbers"), // Only numbers allowed (0-9)
});

// TypeScript helper - tells us what type of data we're working with
type OTPFormValues = z.infer<typeof otpSchema>;

// What information does our component need to work?
interface MinimalOTPVerificationProps {
  userId: string; // Who is the user?
  email: string | undefined; // What's their email?
}

// THE MAIN COMPONENT - This is our verification page!
export default function MinimalOTPVerification({
  email,
  userId,
}: MinimalOTPVerificationProps) {
  
  // ========================================
  // SECTION 1: STATE (Memory for our page)
  // Think of state like sticky notes that remember things
  // ========================================
  
  // Remember the 6 digits the user types (starts as 6 empty boxes)
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  // Example: ["", "", "", "", "", ""] becomes ["1", "2", "3", "4", "5", "6"]
  
  // Is the page checking the code right now?
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Did the code work? Are we verified?
  const [isVerified, setIsVerified] = useState(false);
  
  // Countdown timer (600 seconds = 10 minutes)
  const [timeLeft, setTimeLeft] = useState(600);
  
  // Are we sending a new code?
  const [isResending, setIsResending] = useState(false);

  // ========================================
  // SECTION 2: SPECIAL HELPERS
  // ========================================
  
  // Router - helps us go to different pages (like /dashboard)
  const router = useRouter();
  
  // Refs - like name tags for our 6 input boxes so we can talk to them
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ========================================
  // SECTION 3: REACT HOOK FORM SETUP
  // This is the form manager - it helps us handle the form easily
  // ========================================
  
  const {
    handleSubmit, // Function that runs when we click "Verify"
    setValue, // Updates the form value
    setError, // Shows an error message
    formState: { errors }, // Remembers if there are any errors
    clearErrors, // Removes error messages
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema), // Use our rules (otpSchema)
    defaultValues: {
      otp: "", // Start with empty OTP
    },
  });

  // ========================================
  // SECTION 4: COUNTDOWN TIMER
  // Makes the timer count down every second
  // ========================================
  
  useEffect(() => {
    // Only count down if:
    // 1. Time is still left (timeLeft > 0)
    // 2. We haven't verified yet (!isVerified)
    if (timeLeft > 0 && !isVerified) {
      // Wait 1 second, then subtract 1 from timeLeft
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      
      // Clean up when component updates (prevents memory leaks)
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isVerified]); // Run this whenever timeLeft or isVerified changes

  // ========================================
  // SECTION 5: UPDATE FORM WHEN OTP CHANGES
  // Whenever the user types a number, update the form
  // ========================================
  
  useEffect(() => {
    // Join the 6 digits into one string: ["1","2","3","4","5","6"] → "123456"
    setValue("otp", otp.join(""));
    
    // If there was an error before, clear it
    if (errors.otp) {
      clearErrors("otp");
    }
  }, [otp, setValue, clearErrors, errors.otp]); // Run when OTP changes

  // ========================================
  // SECTION 6: HELPER FUNCTIONS
  // ========================================
  
  // Turn seconds into "minutes:seconds" format
  // Example: 125 seconds → "2:05"
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60); // Get minutes
    const secs = seconds % 60; // Get remaining seconds
    return `${mins}:${secs.toString().padStart(2, "0")}`; // Add 0 if needed (5 → "05")
  };

  // When user types in a box
  const handleChange = (index: number, value: string) => {
    // Clear any error messages
    clearErrors("otp");

    // Only allow numbers (0-9)
    if (value && !/^\d$/.test(value)) return; // If not a number, stop here

    // Update the OTP array at this position
    const newOtp = [...otp]; // Make a copy of the array
    newOtp[index] = value; // Change the digit at this box
    setOtp(newOtp); // Save the new array

    // If user typed a number AND it's not the last box, jump to next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus(); // Move cursor to next box
    }
  };

  // When user presses keys (like backspace or arrows)
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // If user presses backspace on an empty box, go back to previous box
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Left arrow key - go to previous box
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Right arrow key - go to next box
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // When user pastes a code (like copying from email)
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault(); // Stop normal paste behavior
    
    // Get what the user pasted
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Make sure it's only numbers
    if (!/^\d+$/.test(pastedData)) {
      setError("otp", {
        type: "manual",
        message: "Please paste numbers only",
      });
      return; // Stop if not numbers
    }

    // Split the pasted code into individual digits and take only first 6
    const pastedOtp = pastedData.split("").slice(0, 6);
    const newOtp = [...otp];

    // Fill each box with a pasted digit
    pastedOtp.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });

    setOtp(newOtp); // Save the filled boxes

    // Move cursor to next empty box (or last box if all filled)
    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus(); // Focus last box
    }
  };

  // ========================================
  // SECTION 7: SUBMIT THE CODE
  // When user clicks "Verify Email" button
  // ========================================
  
  async function onSubmit(data: OTPFormValues) {
    // Check if time ran out
    if (timeLeft <= 0) {
      setError("otp", {
        type: "manual",
        message: "Verification code has expired. Please request a new one.",
      });
      return; // Stop here
    }

    setIsVerifying(true); // Show loading spinner

    try {
      // Ask the server: "Is this code correct?"
      const result = await verifyEmail({
        email: email as string,
        code: data.otp, // The 6-digit code
      });

      if (result.success) {
        // CODE IS CORRECT! 🎉
        setIsVerified(true); // Show success screen
        toast.success(result.message || "Email verified successfully!");
        
        // Wait 2 seconds, then go to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        // CODE IS WRONG ❌
        setError("otp", {
          type: "manual",
          message: result.error || "Invalid verification code",
        });
        toast.error(result.error || "Verification failed");
      }
    } catch (error) {
      // Something went wrong with the server
      setError("otp", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      });
      toast.error("Verification failed");
    } finally {
      setIsVerifying(false); // Stop showing loading spinner
    }
  };

  // ========================================
  // SECTION 8: RESEND CODE
  // When user clicks "Resend code" button
  // ========================================
  
  const handleResend = async () => {
    // Don't resend if time hasn't run out yet
    if (timeLeft > 0) return;

    setIsResending(true); // Show loading

    try {
      // Ask server to send a new code
      const result = await resendVerificationEmail(email as string);

      if (result.success) {
        toast.success(result.message || "Verification code sent!");
        setTimeLeft(600); // Reset timer to 10 minutes
        setOtp(Array(6).fill("")); // Clear all boxes
        clearErrors("otp"); // Clear any errors
        inputRefs.current[0]?.focus(); // Focus first box
      } else {
        toast.error(result.error || "Failed to resend code");
      }
    } catch (error) {
      toast.error("Failed to resend code");
    } finally {
      setIsResending(false); // Stop loading
    }
  };

  // Check if all 6 boxes have numbers
  const isOtpComplete = otp.every((digit) => digit !== "");

  // ========================================
  // SECTION 9: THE HTML (What you see on screen)
  // ========================================
  
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        {/* Show different screens based on verification status */}
        <AnimatePresence mode="wait">
          {!isVerified ? (
            // SCREEN 1: Verification form (before verifying)
            <motion.div
              key="verification"
              initial={{ opacity: 0, y: 20 }} // Start invisible and below
              animate={{ opacity: 1, y: 0 }} // Fade in and move up
              exit={{ opacity: 0, y: -20 }} // Fade out and move up
              transition={{ duration: 0.3 }} // Take 0.3 seconds
            >
              {/* Title and instructions */}
              <div className="text-center">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  Email Verification
                </h1>
                <p className="mb-2 text-gray-600">
                  We&apos;ve sent a 6-digit verification code to
                </p>
                <p className="mb-8 font-semibold text-gray-900">{email}</p>
              </div>

              {/* The form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8">
                  {/* The 6 input boxes */}
                  <div className="flex justify-center space-x-3">
                    {otp.map((digit, index) => (
                      <div key={index} className="relative w-12">
                        <input
                          ref={(el) => {
                            inputRefs.current[index] = el; // Give box a name tag
                          }}
                          type="text"
                          inputMode="numeric" // Show number keyboard on mobile
                          maxLength={1} // Only 1 character allowed
                          value={digit} // Show the digit
                          onChange={(e) =>
                            handleChange(
                              index,
                              e.target.value.replace(/[^0-9]/g, ""), // Remove non-numbers
                            )
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={index === 0 ? handlePaste : undefined} // Only first box can paste
                          className={`h-14 w-full border-b-2 ${
                            errors.otp
                              ? "border-red-500" // Red if error
                              : "border-gray-300" // Gray normally
                          } bg-transparent text-center text-xl font-bold text-gray-900 outline-none transition-all focus:border-black`}
                          autoFocus={index === 0} // First box starts selected
                          disabled={isVerifying} // Can't type while verifying
                        />
                        {/* Animated underline */}
                        <motion.div
                          className={`absolute bottom-0 left-0 h-0.5 w-full ${
                            errors.otp ? "bg-red-500" : "bg-black"
                          }`}
                          initial={{ scaleX: 0 }} // Start with no width
                          animate={{ scaleX: digit ? 1 : 0 }} // Full width if filled
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Error message (shows if code is wrong) */}
                  {errors.otp && (
                    <motion.p
                      className="mt-3 text-center text-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.otp.message}
                    </motion.p>
                  )}
                </div>

                {/* Countdown timer */}
                <div className="mb-6 flex items-center justify-center">
                  <Clock className={`mr-2 h-4 w-4 ${timeLeft <= 60 ? "text-red-500" : "text-gray-500"}`} />
                  <span className={`text-sm ${timeLeft <= 60 ? "text-red-500 font-semibold" : "text-gray-500"}`}>
                    {timeLeft > 0
                      ? `Code expires in ${formatTime(timeLeft)}`
                      : "Code expired"}
                  </span>
                </div>

                {/* Verify button */}
                <motion.button
                  type="submit"
                  className="mb-4 flex w-full items-center justify-center rounded-lg bg-black py-3 font-medium text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isVerifying || !isOtpComplete || timeLeft <= 0}
                  whileHover={{ scale: isVerifying ? 1 : 1.02 }} // Grow slightly on hover
                  whileTap={{ scale: isVerifying ? 1 : 0.98 }} // Shrink when clicked
                >
                  {isVerifying ? (
                    // Loading spinner
                    <motion.div
                      className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                      animate={{ rotate: 360 }} // Spin around
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY, // Spin forever
                        ease: "linear",
                      }}
                    />
                  ) : (
                    <>
                      Verify Email
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Resend button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={timeLeft > 0 || isResending}
                  className={`inline-flex items-center justify-center text-sm transition-all ${
                    timeLeft > 0 || isResending
                      ? "cursor-not-allowed text-gray-400"
                      : "text-gray-900 hover:underline"
                  }`}
                >
                  {isResending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                      </motion.div>
                      Resending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      {timeLeft > 0 ? `Resend code in ${formatTime(timeLeft)}` : "Resend code"}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            // SCREEN 2: Success screen (after verifying)
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Success checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.1,
                }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
              >
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </motion.div>

              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Verification Successful!
              </h2>
              <p className="mb-8 text-gray-600">
                Your email has been verified successfully. Redirecting...
              </p>

              <Link href="/dashboard">
                <motion.button
                  className="inline-flex items-center rounded-lg bg-black px-6 py-3 font-medium text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}