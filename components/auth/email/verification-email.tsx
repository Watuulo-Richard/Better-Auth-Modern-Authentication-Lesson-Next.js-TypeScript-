import { Github, Mail, Gamepad2, Twitter } from "lucide-react";

interface EmailTemplateProps {
  userEmail: string;
  userName?: string;
  verificationCode: string;
  expirationTime?: string;
  companyName?: string;
  tagline?: string;
}

export function EmailTemplate({
  userEmail,
  userName,
  verificationCode,
  expirationTime = "10 Mins",
  companyName = "Desishub-Company",
  tagline = "Building the future",
}: EmailTemplateProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 antialiased">
      {/* Main Card */}
      <div className="bg-card w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-sm border border-border overflow-hidden">
        <div className="px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-12 lg:py-14 flex flex-col items-center text-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 sm:w-9 sm:h-9"
            >
              <defs>
                <linearGradient
                  id="logoGradient"
                  x1="0"
                  y1="0"
                  x2="36"
                  y2="36"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--primary)" />
                </linearGradient>
              </defs>
              <path
                d="M6 8C6 5.79086 7.79086 4 10 4H26C28.2091 4 30 5.79086 30 8V28C30 30.2091 28.2091 32 26 32H10C7.79086 32 6 30.2091 6 28V8Z"
                fill="var(--primary)"
              />
              <rect
                x="9"
                y="4"
                width="2"
                height="28"
                fill="white"
                fillOpacity="0.3"
              />
            </svg>
            <span className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              {companyName}
            </span>
          </div>

          {/* Greeting */}
          {userName && (
            <p className="text-base sm:text-lg text-muted-foreground mb-4">
              Hi {userName},
            </p>
          )}

          {/* Heading */}
          <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold text-foreground tracking-tight mb-4 sm:mb-6 leading-tight">
            Verify your email to sign up for {companyName}
          </h1>

          {/* Primary Body Text */}
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-lg">
            We have received a sign-up attempt with the following code. Please
            enter it in the browser window where you started signing up for{" "}
            {companyName}.
          </p>

          {/* Verification Code Block */}
          <div className="bg-secondary rounded-xl sm:rounded-2xl w-full py-4 sm:py-5 px-4 sm:px-6 mb-6 sm:mb-8">
            <span className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-wider font-mono">
              {verificationCode}
            </span>
          </div>

          {/* Secondary Body Text */}
          <p className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-12 leading-relaxed max-w-lg">
            If you did not attempt to sign up but received this email, please
            disregard it. The code will remain active for {expirationTime}.
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-border mb-6 sm:mb-8" />

          {/* Tagline */}
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
            {companyName}, {tagline}
          </p>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Gamepad"
            >
              <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
            </a>
            <a
              href={`mailto:${userEmail}`}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            © 2025 {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmailTemplate;
