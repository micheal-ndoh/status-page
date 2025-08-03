import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import EmailProvider from 'next-auth/providers/email'
import { prisma } from './prisma'
import { generateEmailHTML, generateEmailText, emailTemplates } from './email-templates'

// Custom adapter to handle PostgreSQL replica identity issue
const customPrismaAdapter = {
    ...PrismaAdapter(prisma),
    useVerificationToken: async (params: { identifier: string; token: string }) => {
        const { identifier, token } = params
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token }
        })

        if (!verificationToken) {
            return null
        }

        // Check if token is expired
        if (verificationToken.expires < new Date()) {
            // Try to delete expired token, but don't fail if it doesn't work
            try {
                await prisma.verificationToken.delete({
                    where: { token }
                })
            } catch (error) {
                console.warn('Could not delete verification token:', error)
            }
            return null
        }

        // Try to delete the token, but don't fail if it doesn't work
        try {
            await prisma.verificationToken.delete({
                where: { token }
            })
        } catch (error) {
            console.warn('Could not delete verification token:', error)
        }

        return verificationToken
    }
}

export const authOptions: NextAuthOptions = {
    adapter: customPrismaAdapter,
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST || 'smtp.resend.com',
                port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
                auth: {
                    user: 'resend',
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
                secure: false,
                tls: {
                    rejectUnauthorized: false
                }
            },
            from: process.env.EMAIL_FROM || 'noreply@localhost',
            sendVerificationRequest: async ({ identifier, url, provider }) => {
                // Get user's language preference from localStorage or default to 'en'
                let userLanguage = 'en';
                
                // Try to get language from localStorage (this will be set by the frontend)
                if (typeof window !== 'undefined') {
                    const storedLanguage = localStorage.getItem('user_language');
                    if (storedLanguage) {
                        userLanguage = storedLanguage;
                    }
                }

                // Use Resend API directly for better reliability
                const resendApiKey = process.env.EMAIL_SERVER_PASSWORD

                if (resendApiKey && resendApiKey.startsWith('re_')) {
                    // Use Resend API
                    const response = await fetch('https://api.resend.com/emails', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${resendApiKey}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            from: 'Prism <onboarding@resend.dev>',
                            to: identifier,
                            subject: emailTemplates[userLanguage as keyof typeof emailTemplates]?.subject || emailTemplates.en.subject,
                            html: generateEmailHTML(url, userLanguage),
                        }),
                    })

                    if (!response.ok) {
                        const error = await response.text()
                        throw new Error(`Failed to send email: ${error}`)
                    }
                } else {
                    // Fallback to nodemailer
                    const { host, port, auth, secure } = provider.server
                    const transport = require('nodemailer').createTransport({
                        host,
                        port,
                        auth,
                        secure,
                        tls: {
                            rejectUnauthorized: false
                        }
                    })

                    const result = await transport.sendMail({
                        to: identifier,
                        from: `"Prism" <${provider.from}>`,
                        subject: emailTemplates[userLanguage as keyof typeof emailTemplates]?.subject || emailTemplates.en.subject,
                        text: generateEmailText(url, userLanguage),
                        html: generateEmailHTML(url, userLanguage),
                    })

                    const failed = result.rejected.concat(result.pending).filter(Boolean)
                    if (failed.length) {
                        throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
                    }
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        async redirect({ url, baseUrl }) {
            console.log('Redirect callback - url:', url, 'baseUrl:', baseUrl);

            // Always redirect to dashboard after successful authentication
            if (url.includes('callbackUrl')) {
                return `${baseUrl}/dashboard`
            }

            // Handle dashboard redirects
            if (url.startsWith('/dashboard')) {
                return `${baseUrl}/dashboard`
            }

            // Handle relative URLs
            if (url.startsWith('/')) {
                return `${baseUrl}${url}`
            }

            // Handle same origin URLs
            if (new URL(url).origin === baseUrl) {
                return url
            }

            // Default to dashboard
            return `${baseUrl}/dashboard`
        },
    },
    pages: {
        signIn: '/auth/signin',
        verifyRequest: '/auth/verify-request',
    },
    debug: process.env.NODE_ENV === 'development',
} 