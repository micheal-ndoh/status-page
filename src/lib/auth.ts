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
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>Sign in to Prism</title>
                                </head>
                                <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f8fafc;">
                                    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                                        <!-- Header -->
                                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                                            <div style="background-color: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
                                                <div style="font-size: 32px; font-weight: bold; color: #667eea; text-align: center; line-height: 1;">
                                                    <span style="display: block; font-size: 36px;">P</span>
                                                    <span style="display: block; font-size: 12px; color: #764ba2; margin-top: -5px;">rism</span>
                                                </div>
                                            </div>
                                            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Prism</h1>
                                            <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">Status Page Dashboard</p>
                                        </div>
                                        
                                        <!-- Content -->
                                        <div style="padding: 40px 30px;">
                                            <h2 style="color: #1a202c; margin: 0 0 20px; font-size: 24px; font-weight: 600;">Welcome to Prism! ✨</h2>
                                            
                                            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
                                                You're just one click away from accessing your status page dashboard. Click the button below to securely sign in to your account.
                                            </p>
                                            
                                            <div style="text-align: center; margin: 30px 0;">
                                                <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                                                    🚀 Sign in to Dashboard
                                                </a>
                                            </div>
                                            
                                            <div style="background-color: #f7fafc; border-left: 4px solid #667eea; padding: 20px; border-radius: 0 8px 8px 0; margin: 30px 0;">
                                                <h3 style="color: #2d3748; margin: 0 0 10px; font-size: 18px; font-weight: 600;">What you can do:</h3>
                                                <ul style="color: #4a5568; margin: 0; padding-left: 20px; line-height: 1.6;">
                                                    <li>Monitor your services and uptime</li>
                                                    <li>Create and manage incidents</li>
                                                    <li>Update status pages in real-time</li>
                                                    <li>View detailed analytics and reports</li>
                                                </ul>
                                            </div>
                                            
                                            <p style="color: #718096; font-size: 14px; line-height: 1.5; margin: 30px 0 0; text-align: center;">
                                                This link will expire in 24 hours for security reasons.<br>
                                                If you didn't request this email, you can safely ignore it.
                                            </p>
                                        </div>
                                        
                                        <!-- Footer -->
                                        <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                                            <p style="color: #a0aec0; font-size: 14px; margin: 0;">
                                                This is an automated message from your Prism status page application.<br>
                                                Need help? Contact our support team.
                                            </p>
                                        </div>
                                    </div>
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
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Sign in to Prism</title>
                            </head>
                            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f8fafc;">
                                <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                                    <!-- Header -->
                                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                                        <div style="background-color: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
                                            <div style="font-size: 32px; font-weight: bold; color: #667eea; text-align: center; line-height: 1;">
                                                <span style="display: block; font-size: 36px;">P</span>
                                                <span style="display: block; font-size: 12px; color: #764ba2; margin-top: -5px;">rism</span>
                                            </div>
                                        </div>
                                        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Prism</h1>
                                        <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">Status Page Dashboard</p>
                                    </div>
                                    
                                    <!-- Content -->
                                    <div style="padding: 40px 30px;">
                                        <h2 style="color: #1a202c; margin: 0 0 20px; font-size: 24px; font-weight: 600;">Welcome to Prism! ✨</h2>
                                        
                                        <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
                                            You're just one click away from accessing your status page dashboard. Click the button below to securely sign in to your account.
                                        </p>
                                        
                                        <div style="text-align: center; margin: 30px 0;">
                                            <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                                                🚀 Sign in to Dashboard
                                            </a>
                                        </div>
                                        
                                        <div style="background-color: #f7fafc; border-left: 4px solid #667eea; padding: 20px; border-radius: 0 8px 8px 0; margin: 30px 0;">
                                            <h3 style="color: #2d3748; margin: 0 0 10px; font-size: 18px; font-weight: 600;">What you can do:</h3>
                                            <ul style="color: #4a5568; margin: 0; padding-left: 20px; line-height: 1.6;">
                                                <li>Monitor your services and uptime</li>
                                                <li>Create and manage incidents</li>
                                                <li>Update status pages in real-time</li>
                                                <li>View detailed analytics and reports</li>
                                            </ul>
                                        </div>
                                        
                                        <p style="color: #718096; font-size: 14px; line-height: 1.5; margin: 30px 0 0; text-align: center;">
                                            This link will expire in 24 hours for security reasons.<br>
                                            If you didn't request this email, you can safely ignore it.
                                        </p>
                                    </div>
                                    
                                    <!-- Footer -->
                                    <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                                        <p style="color: #a0aec0; font-size: 14px; margin: 0;">
                                            This is an automated message from your Prism status page application.<br>
                                            Need help? Contact our support team.
                                        </p>
                                    </div>
                                </div>
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