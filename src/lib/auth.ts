import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import EmailProvider from 'next-auth/providers/email'
import { prisma } from './prisma'

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
                            subject: 'Sign in to Prism - Your Status Page Dashboard',
                            html: `
                                <!DOCTYPE html>
                                <html>
                                <head>
                                    <meta charset="utf-8">
                                    <title>Sign in to Prism</title>
                                </head>
                                <body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: Arial, sans-serif;">
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center">
                                                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                                                    <!-- Header -->
                                                    <tr>
                                                        <td style="background-color: #1a1a2e; padding: 30px; text-align: center;">
                                                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">PRISM</h1>
                                                            <p style="color: #add8e6; margin: 5px 0 0; font-size: 16px;">Status Page Dashboard</p>
                                                        </td>
                                                    </tr>
                                                    
                                                    <!-- Content -->
                                                    <tr>
                                                        <td style="padding: 30px;">
                                                            <h2 style="color: #333333; margin: 0 0 20px; font-size: 24px;">Welcome to Prism! ✨</h2>
                                                            
                                                            <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0 0 25px;">
                                                                You're just one click away from accessing your status page dashboard. Click the button below to securely sign in to your account.
                                                            </p>
                                                            
                                                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0;">
                                                                <tr>
                                                                    <td align="center">
                                                                        <a href="${url}" style="display: inline-block; background-color: #add8e6; color: #1a1a2e; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                                                                            🚀 Sign in to Dashboard
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            
                                                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0;">
                                                                <tr>
                                                                    <td style="background-color: #f8f9fa; border-left: 4px solid #add8e6; padding: 20px;">
                                                                        <h3 style="color: #333333; margin: 0 0 15px; font-size: 18px;">What you can do with Prism:</h3>
                                                                        <ul style="color: #666666; margin: 0; padding-left: 20px; line-height: 1.6;">
                                                                            <li>Monitor your services and uptime in real-time</li>
                                                                            <li>Create and manage incidents with your team</li>
                                                                            <li>Update status pages with beautiful design</li>
                                                                            <li>View detailed analytics and performance reports</li>
                                                                            <li>Get instant alerts across all your channels</li>
                                                                            <li>Integrate with your existing tools and workflows</li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            
                                                            <p style="color: #999999; font-size: 14px; line-height: 1.4; margin: 25px 0 0; text-align: center;">
                                                                🔒 This link will expire in 24 hours for security reasons.<br>
                                                                If you didn't request this email, you can safely ignore it.
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    
                                                    <!-- Footer -->
                                                    <tr>
                                                        <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                                                            <p style="color: #999999; font-size: 13px; margin: 0;">
                                                                This is an automated message from your Prism Status Page application.<br>
                                                                Need help? Contact our support team at support@prism.com
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </body>
                                </html>
                            `,
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
                        subject: `Sign in to Prism - Your Status Page Dashboard`,
                        text: `Welcome to Prism! Click here to sign in to your dashboard: ${url}`,
                        html: `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <meta charset="utf-8">
                                <title>Sign in to Prism</title>
                            </head>
                            <body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: Arial, sans-serif;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td align="center">
                                            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                                                <!-- Header -->
                                                <tr>
                                                    <td style="background-color: #1a1a2e; padding: 30px; text-align: center;">
                                                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">PRISM</h1>
                                                        <p style="color: #add8e6; margin: 5px 0 0; font-size: 16px;">Status Page Dashboard</p>
                                                    </td>
                                                </tr>
                                                
                                                <!-- Content -->
                                                <tr>
                                                    <td style="padding: 30px;">
                                                        <h2 style="color: #333333; margin: 0 0 20px; font-size: 24px;">Welcome to Prism! ✨</h2>
                                                        
                                                        <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0 0 25px;">
                                                            You're just one click away from accessing your status page dashboard. Click the button below to securely sign in to your account.
                                                        </p>
                                                        
                                                        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0;">
                                                            <tr>
                                                                <td align="center">
                                                                    <a href="${url}" style="display: inline-block; background-color: #add8e6; color: #1a1a2e; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                                                                        🚀 Sign in to Dashboard
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        
                                                        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0;">
                                                            <tr>
                                                                <td style="background-color: #f8f9fa; border-left: 4px solid #add8e6; padding: 20px;">
                                                                    <h3 style="color: #333333; margin: 0 0 15px; font-size: 18px;">What you can do with Prism:</h3>
                                                                    <ul style="color: #666666; margin: 0; padding-left: 20px; line-height: 1.6;">
                                                                        <li>Monitor your services and uptime in real-time</li>
                                                                        <li>Create and manage incidents with your team</li>
                                                                        <li>Update status pages with beautiful design</li>
                                                                        <li>View detailed analytics and performance reports</li>
                                                                        <li>Get instant alerts across all your channels</li>
                                                                        <li>Integrate with your existing tools and workflows</li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        
                                                        <p style="color: #999999; font-size: 14px; line-height: 1.4; margin: 25px 0 0; text-align: center;">
                                                            🔒 This link will expire in 24 hours for security reasons.<br>
                                                            If you didn't request this email, you can safely ignore it.
                                                        </p>
                                                    </td>
                                                </tr>
                                                
                                                <!-- Footer -->
                                                <tr>
                                                    <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                                                        <p style="color: #999999; font-size: 13px; margin: 0;">
                                                            This is an automated message from your Prism Status Page application.<br>
                                                            Need help? Contact our support team at support@prism.com
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </body>
                            </html>
                        `,
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