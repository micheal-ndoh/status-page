import { NextRequest, NextResponse } from 'next/server';
import { generateEmailHTML, generateEmailText, emailTemplates } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  try {
    const { email, language = 'en' } = await request.json();
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Validate language
    const validLanguages = ['en', 'fr', 'de', 'zh', 'es'];
    const userLanguage = validLanguages.includes(language) ? language : 'en';

    // Generate a simple verification URL (in a real app, you'd use NextAuth's signIn)
    const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-request?email=${encodeURIComponent(email)}`;

    // Use Resend API
    const resendApiKey = process.env.EMAIL_SERVER_PASSWORD;
    
    if (!resendApiKey) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Prism <onboarding@resend.dev>',
        to: email,
        subject: emailTemplates[userLanguage as keyof typeof emailTemplates]?.subject || emailTemplates.en.subject,
        html: generateEmailHTML(verificationUrl, userLanguage),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 