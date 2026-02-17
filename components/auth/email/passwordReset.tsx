import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
  Link,
  Img,
} from '@react-email/components';

interface PasswordResetEmailProps {
  userEmail: string;
  resetLink: string;
  expirationTime: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com';

export default function PasswordResetEmail({
  userEmail,
  resetLink,
  expirationTime,
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password - Inner Voice Space</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={logoSection}>
            <table
              width="100%"
              cellPadding="0"
              cellSpacing="0"
              role="presentation"
            >
              <tr>
                <td align="center">
                  <img
                    src={`${baseUrl}/Inner-Voice-Logo-design.png`}
                    alt="Inner Voice Space Logo"
                    style={logo}
                  />
                  <Text style={brandName}>Inner Voice Space</Text>
                </td>
              </tr>
            </table>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            {/* Lock Icon */}
            <table
              width="100%"
              cellPadding="0"
              cellSpacing="0"
              role="presentation"
            >
              <tr>
                <td align="center" style={{ paddingBottom: '24px' }}>
                  <div style={iconCircle}>
                    <Text style={iconText}>🔐</Text>
                  </div>
                </td>
              </tr>
            </table>

            <Text style={heading}>Password Reset Request</Text>

            <Text style={greeting}>Hello,</Text>

            <Text style={text}>
              We received a request to reset the password for your account
              associated with <strong>{userEmail}</strong>.
            </Text>

            <Text style={text}>
              Click the button below to create a new password:
            </Text>

            {/* Reset Button - Centered with table */}
            <table
              width="100%"
              cellPadding="0"
              cellSpacing="0"
              role="presentation"
              style={{ margin: '32px 0' }}
            >
              <tr>
                <td align="center">
                  <Button href={resetLink} style={button}>
                    Reset My Password
                  </Button>
                </td>
              </tr>
            </table>

            {/* Alternative Link */}
            <Text style={altText}>
              If the button doesn't work, copy and paste this link into your
              browser:
            </Text>
            <table
              width="100%"
              cellPadding="0"
              cellSpacing="0"
              role="presentation"
            >
              <tr>
                <td style={linkBox}>
                  <Link href={resetLink} style={linkText}>
                    {resetLink}
                  </Link>
                </td>
              </tr>
            </table>

            {/* Warning Box */}
            <table
              width="100%"
              cellPadding="0"
              cellSpacing="0"
              role="presentation"
              style={{ margin: '24px 0' }}
            >
              <tr>
                <td style={warningBox}>
                  <Text style={warningText}>
                    ⏰ <strong>Important:</strong> This reset link will expire
                    in <strong>{expirationTime}</strong> for security reasons.
                  </Text>
                </td>
              </tr>
            </table>

            <Text style={text}>
              If you didn't request this password reset, please ignore this
              email or contact our support team if you have concerns about your
              account security.
            </Text>

            {/* Security Tips */}
            <table
              width="100%"
              cellPadding="0"
              cellSpacing="0"
              role="presentation"
              style={{ marginTop: '32px' }}
            >
              <tr>
                <td style={tipsBox}>
                  <Text style={tipsTitle}>
                    <strong>🛡️ Security Tips:</strong>
                  </Text>
                  <Text style={tipsText}>
                    • Use a unique password you don't use elsewhere
                    <br />
                    • Make it at least 12 characters long
                    <br />
                    • Include numbers, symbols, and mixed case letters
                    <br />• Never share your password with anyone
                  </Text>
                </td>
              </tr>
            </table>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Need help?{' '}
              <Link href={`${baseUrl}/support`} style={footerLink}>
                Contact Support
              </Link>
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} Inner Voice Space. All rights
              reserved.
              <br />
              Kampala, Uganda
            </Text>
            <Text style={footerSmall}>
              This is an automated security email. Please do not reply to this
              message.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ——————— STYLES ———————

const main = {
  backgroundColor: '#f5f5f5',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
  padding: '20px 0',
  WebkitFontSmoothing: 'antialiased' as const,
  MozOsxFontSmoothing: 'grayscale' as const,
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  width: '100%',
  maxWidth: '600px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
};

const logoSection = {
  textAlign: 'center' as const,
  padding: '32px 20px 24px',
  backgroundColor: '#ffffff',
  borderBottom: '2px solid #f5f5f5',
};

const logo = {
  margin: '0 auto',
  borderRadius: '8px',
  display: 'block',
};

const brandName = {
  margin: '12px 0 0',
  fontSize: '18px',
  fontWeight: '600',
  color: '#0d0d0d',
  letterSpacing: '-0.5px',
};

const content = {
  padding: '40px 24px',
};

const iconCircle = {
  width: '72px',
  height: '72px',
  borderRadius: '50%',
  backgroundColor: '#eff6ff',
  border: '3px solid #dbeafe',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
};

const iconText = {
  fontSize: '32px',
  margin: '0',
  lineHeight: '1',
};

const heading = {
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '1.3',
  color: '#0d0d0d',
  margin: '0 0 24px',
  letterSpacing: '-0.5px',
  textAlign: 'center' as const,
};

const greeting = {
  fontSize: '16px',
  fontWeight: '500',
  color: '#0d0d0d',
  margin: '0 0 16px',
};

const text = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#404040',
  margin: '0 0 16px',
};

const button = {
  backgroundColor: '#0d0d0d',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  minWidth: '200px',
  lineHeight: '1.5',
};

const altText = {
  fontSize: '13px',
  color: '#737373',
  margin: '24px 0 8px',
  textAlign: 'center' as const,
};

const linkBox = {
  backgroundColor: '#fafafa',
  border: '1px solid #e5e5e5',
  borderRadius: '6px',
  padding: '12px 16px',
  margin: '8px 0 0',
  wordBreak: 'break-all' as const,
};

const linkText = {
  fontSize: '13px',
  color: '#2563eb',
  textDecoration: 'none',
  lineHeight: '1.5',
};

const warningBox = {
  backgroundColor: '#fef3c7',
  border: '2px solid #fde68a',
  borderRadius: '8px',
  padding: '16px 20px',
  borderLeft: '4px solid #f59e0b',
};

const warningText = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#92400e',
  margin: '0',
};

const tipsBox = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  borderRadius: '8px',
  padding: '20px',
};

const tipsTitle = {
  fontSize: '15px',
  color: '#166534',
  margin: '0 0 12px',
};

const tipsText = {
  fontSize: '14px',
  lineHeight: '1.8',
  color: '#166534',
  margin: '0',
};

const divider = {
  borderColor: '#e5e5e5',
  margin: '32px 24px',
};

const footer = {
  textAlign: 'center' as const,
  padding: '0 24px 32px',
};

const footerText = {
  fontSize: '13px',
  lineHeight: '1.6',
  color: '#737373',
  margin: '0 0 8px',
};

const footerLink = {
  color: '#2563eb',
  textDecoration: 'none',
  fontWeight: '500',
};

const footerSmall = {
  fontSize: '12px',
  color: '#a3a3a3',
  margin: '16px 0 0',
  fontStyle: 'italic',
};

