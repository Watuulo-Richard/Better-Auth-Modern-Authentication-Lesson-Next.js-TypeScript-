'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/actions/user';
import { signIn } from '@/lib/auth-client';
import { RegisterUserSchema, RegisterUserSchemaTypes } from '@/types/user.schema';
import { Icons } from '../ui/icons';

export default function MinimalistSignUpForm() {
  const form = useForm<RegisterUserSchemaTypes>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });
  const formErrors = form.formState.errors;
  const passwordVariable = form.watch('password');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState<'google' | null>(null);
  const [isGithubLoading, setIsGithubLoading] = useState<'github' | null>(null);
  const [isLinkedinLoading, setIsLinkedinLoading] = useState<'linkedin' | null>(
    null,
  );
  async function onSubmitUserDetails(
    userRegisterDetails: RegisterUserSchemaTypes,
  ) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    try {
      /* Handle form submission */
      const response = await registerUser(userRegisterDetails);
      if (response.success && response.data) {
        setIsLoading(false);
        toast.success('Success!!!', {
          description: 'Your account has been created successfully',
        });
        // Access the data directly from response.data
        router.push(`/verify/${response.data.id}`);
      } else {
        if (response.status === 'UNPROCESSABLE_ENTITY') {
          setIsLoading(false);
          toast.error('Account Registration Failed', {
            description: response.error,
          });
        } else {
          setIsLoading(false);
          toast.error('Error', {
            description: response.error,
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Error', {
        description:
          '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
      });
      console.log(error);
    }
  }
  async function handleGoogleSignIn(provider: 'google') {
    setIsGoogleLoading(provider);
    try {
      const googleResponse = await signIn.social({
        provider: provider,
        callbackURL: '/dashboard',
      });
      console.log(googleResponse, 'cool');
      if (googleResponse.data) {
        setIsGoogleLoading(null);
        toast.success('Success!!!', {
          description:
            'You have signed in successfully with your google account',
        });
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Sign in failed:', error);
      setIsGoogleLoading(null);
      toast.error('Error', {
        description:
          '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
      });
      console.log(error);
    }
  }
  async function handleGithubSignIn(provider: 'github') {
    setIsGithubLoading(provider);
    try {
      const githubResponse = await signIn.social({
        provider: provider,
        callbackURL: '/dashboard',
      });
      console.log(githubResponse, 'cool');
      if (githubResponse.data) {
        setTimeout(() => {
          setIsGithubLoading(null);
        }, 1500);
        toast.success('Success!!!', {
          description:
            'You have signed in successfully with your github account',
        });
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Sign in failed:', error);
      setIsGithubLoading(null);
      toast.error('Error', {
        description:
          '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
      });
      console.log(error);
    }
  }
  async function handleLinkedinSignIn(provider: 'linkedin') {
    setIsLinkedinLoading(provider);
    try {
      const githubResponse = await signIn.social({
        provider: provider,
        callbackURL: '/dashboard',
      });
      console.log(githubResponse, 'cool');
      if (githubResponse.data) {
        setTimeout(() => {
          setIsLinkedinLoading(null);
        }, 1500);
        toast.success('Success!!!', {
          description:
            'You have signed in successfully with your linkedin account',
        });
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Sign in failed:', error);
      setIsLinkedinLoading(null);
      toast.error('Error', {
        description:
          '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
      });
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4 sm:p-6 lg:p-2">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div
          className="mb-6 flex justify-center sm:mb-8"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 sm:h-12 sm:w-12">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:h-6 sm:w-6"
            >
              <path
                d="M12 2L20 7V17L12 22L4 17V7L12 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        <h1 className="mb-6 text-center text-xl font-medium text-gray-900 sm:mb-8 sm:text-2xl">
          Create your account
        </h1>

        <form
          onSubmit={form.handleSubmit(onSubmitUserDetails)}
          className="space-y-4 sm:space-y-5"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                <input
                  type="text"
                  className="w-full border-b border-gray-300 bg-transparent px-2 py-2 text-sm outline-none transition-all duration-200 focus:border-gray-900 sm:px-4 sm:py-3"
                  placeholder="John"
                  {...form.register('firstName', { required: true })}
                />
                {formErrors.firstName && (
                  <span className="text-xs text-red-600">
                    {formErrors.firstName.message}
                  </span>
                )}
              </motion.div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                <input
                  type="text"
                  className="w-full border-b border-gray-300 bg-transparent px-2 py-2 text-sm outline-none transition-all duration-200 focus:border-gray-900 sm:px-4 sm:py-3"
                  placeholder="Doe"
                  {...form.register('lastName', { required: true })}
                />
                {formErrors.lastName && (
                  <span className="text-xs text-red-600">
                    {formErrors.lastName.message}
                  </span>
                )}
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                <input
                  type="email"
                  className="w-full border-b border-gray-300 bg-transparent px-2 py-2 text-sm outline-none transition-all duration-200 focus:border-gray-900 sm:px-4 sm:py-3"
                  placeholder="name@example.com"
                  {...form.register('email', { required: true })}
                />
                {formErrors.email && (
                  <span className="text-xs text-red-600">
                    {formErrors.email.message}
                  </span>
                )}
              </motion.div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                <input
                  type="tel"
                  className="w-full border-b border-gray-300 bg-transparent px-2 py-2 text-sm outline-none transition-all duration-200 focus:border-gray-900 sm:px-4 sm:py-3"
                  placeholder="+256-759-268-262"
                  {...form.register('phone', { required: true })}
                />
                {formErrors.phone && (
                  <span className="text-xs text-red-600">
                    {formErrors.phone.message}
                  </span>
                )}
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                <input
                  type="password"
                  className="w-full border-b border-gray-300 bg-transparent px-2 py-2 text-sm outline-none transition-all duration-200 focus:border-gray-900 sm:px-4 sm:py-3"
                  placeholder="••••••••"
                  {...form.register('password', { required: true })}
                />
                {formErrors.password && (
                  <span className="text-xs text-red-600">
                    {formErrors.password.message}
                  </span>
                )}
              </motion.div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                <input
                  type="password"
                  className="w-full border-b border-gray-300 bg-transparent px-2 py-2 text-sm outline-none transition-all duration-200 focus:border-gray-900 sm:px-4 sm:py-3"
                  placeholder="••••••••"
                  {...form.register('confirmPassword', {
                    required: true,
                    validate: (value) =>
                      value === passwordVariable || "Passwords don't match",
                  })}
                />
                {formErrors.confirmPassword && (
                  <span className="text-xs text-red-600">
                    {formErrors.confirmPassword.message}
                  </span>
                )}
              </motion.div>
            </div>
          </div>

          <motion.button
            type="submit"
            className="flex w-full items-center justify-center rounded-md bg-gray-900 py-2.5 text-sm font-medium text-white sm:py-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                className="h-5 w-5 rounded-full border-2 border-white border-t-transparent text-white"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ) : (
              <>
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-4 sm:mt-3">
          <p className="text-center text-xs text-gray-600 sm:text-sm">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-gray-900 transition-colors hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-3 border-t border-gray-200 pt-4 sm:mt-3 sm:pt-6">
          <div className="flex justify-center space-x-4 sm:space-x-6">
            {isGoogleLoading === 'google' ? (
              <motion.button
                className="text-gray-400 transition-colors hover:text-gray-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Google</span>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={() => handleGoogleSignIn('google')}
                className="text-gray-400 transition-colors hover:text-gray-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Google</span>
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </motion.button>
            )}

            {isGithubLoading === 'github' ? (
              <motion.button
                className="text-gray-400 transition-colors hover:text-gray-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">GitHub</span>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              </motion.button>
            ) : (
              <motion.button
                onClick={() => handleGithubSignIn('github')}
                className="text-gray-400 transition-colors hover:text-gray-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>
            )}

            {isLinkedinLoading === 'linkedin' ? (
              <motion.button
                className="text-gray-400 transition-colors hover:text-gray-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">LinkedIn</span>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                onClick={() => handleLinkedinSignIn('linkedin')}
                className="text-gray-400 transition-colors hover:text-gray-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

