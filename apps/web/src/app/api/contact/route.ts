import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// CMS API URL - use internal URL if available (for Docker), otherwise public URL
const CMS_API_URL = process.env.CMS_INTERNAL_URL || process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001';

/**
 * Contact Form API Endpoint
 * 
 * Receives contact form submissions and saves them to PayloadCMS
 */
export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to CMS
    const cmsResponse = await fetch(`${CMS_API_URL}/api/contact-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        subject: data.subject || '',
        message: data.message,
        status: 'new',
        source: 'website',
      }),
    });

    if (!cmsResponse.ok) {
      const errorText = await cmsResponse.text();
      console.error('[Contact Form] CMS Error:', cmsResponse.status, errorText);
      throw new Error('Failed to save to CMS');
    }

    // Optional: Send email notification
    // Uncomment and configure when email service is set up
    /*
    if (process.env.SENDGRID_API_KEY) {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      await sgMail.send({
        to: process.env.CONTACT_EMAIL_TO || 'contact@yourcompany.com',
        from: process.env.CONTACT_EMAIL_FROM || 'noreply@yourcompany.com',
        replyTo: data.email,
        subject: `[Contact Form] ${data.subject || 'New Message'} from ${data.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject || 'N/A'}</p>
          <h3>Message:</h3>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
      });
    }
    */

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact Form Error]', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    );
  }
}
