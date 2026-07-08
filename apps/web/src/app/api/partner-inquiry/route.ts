import { NextRequest, NextResponse } from 'next/server';

interface PartnerInquiryData {
  // Company Information
  companyName: string;
  website?: string;
  country: string;
  companyType: string;
  
  // Contact Information
  contactName: string;
  email: string;
  phone?: string;
  role?: string;
  
  // Business Information
  annualVolume?: string;
  destinationsOfInterest?: string[];
  servicesOfInterest?: string[];
  
  // Additional Information
  partnershipType?: string;
  message?: string;
  howDidYouHear?: string;
  locale?: string;
}

// CMS API URL - use internal URL if available (for Docker), otherwise public URL
const CMS_API_URL = process.env.CMS_INTERNAL_URL || process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3005';

/**
 * Partner Inquiry API Endpoint
 * 
 * Receives B2B partnership inquiries and saves them to PayloadCMS
 */
export async function POST(request: NextRequest) {
  try {
    const data: PartnerInquiryData = await request.json();

    // Validate required fields
    const requiredFields = ['companyName', 'country', 'companyType', 'contactName', 'email'];
    const missingFields = requiredFields.filter(field => !data[field as keyof PartnerInquiryData]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
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

    // Transform arrays for Payload CMS array field format
    const destinationsArray = data.destinationsOfInterest?.map(dest => ({ destination: dest })) || [];
    const servicesArray = data.servicesOfInterest?.map(svc => ({ service: svc })) || [];

    // Build CMS payload - only include optional select fields if they have valid values
    const cmsPayload: Record<string, unknown> = {
      companyName: data.companyName,
      website: data.website || '',
      country: data.country,
      companyType: data.companyType,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone || '',
      role: data.role || '',
      destinationsOfInterest: destinationsArray,
      servicesOfInterest: servicesArray,
      message: data.message || '',
      howDidYouHear: data.howDidYouHear || '',
      locale: data.locale || 'en',
      status: 'new',
      priority: 'normal',
    };

    // Only include select fields if they have valid non-empty values
    if (data.annualVolume) {
      cmsPayload.annualVolume = data.annualVolume;
    }
    if (data.partnershipType) {
      cmsPayload.partnershipType = data.partnershipType;
    }

    // Save to CMS
    const cmsResponse = await fetch(`${CMS_API_URL}/api/partner-inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cmsPayload),
    });

    if (!cmsResponse.ok) {
      const errorText = await cmsResponse.text();
      console.error('[Partner Inquiry] CMS Error:', cmsResponse.status, errorText);
      throw new Error('Failed to save to CMS');
    }

    // Optional: Send email notification to partnerships team
    // Uncomment and configure when email service is set up
    /*
    if (process.env.SENDGRID_API_KEY) {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      await sgMail.send({
        to: process.env.PARTNERSHIPS_EMAIL || 'partnerships@yourcompany.com',
        from: process.env.CONTACT_EMAIL_FROM || 'noreply@yourcompany.com',
        replyTo: data.email,
        subject: `[B2B Inquiry] ${data.companyName} - ${data.companyType}`,
        html: `
          <h2>New B2B Partnership Inquiry</h2>
          
          <h3>Company Information</h3>
          <ul>
            <li><strong>Company:</strong> ${data.companyName}</li>
            <li><strong>Website:</strong> ${data.website || 'N/A'}</li>
            <li><strong>Country:</strong> ${data.country}</li>
            <li><strong>Type:</strong> ${data.companyType}</li>
          </ul>
          
          <h3>Contact Information</h3>
          <ul>
            <li><strong>Name:</strong> ${data.contactName}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Phone:</strong> ${data.phone || 'N/A'}</li>
            <li><strong>Role:</strong> ${data.role || 'N/A'}</li>
          </ul>
          
          <h3>Business Details</h3>
          <ul>
            <li><strong>Annual Volume:</strong> ${data.annualVolume || 'N/A'}</li>
            <li><strong>Destinations:</strong> ${data.destinationsOfInterest?.join(', ') || 'N/A'}</li>
            <li><strong>Services:</strong> ${data.servicesOfInterest?.join(', ') || 'N/A'}</li>
            <li><strong>Partnership Type:</strong> ${data.partnershipType || 'N/A'}</li>
          </ul>
          
          <h3>Message</h3>
          <p>${data.message?.replace(/\n/g, '<br>') || 'No message provided'}</p>
          
          <hr>
          <p><small>Source: ${data.howDidYouHear || 'Not specified'} | Locale: ${data.locale || 'en'}</small></p>
        `,
      });
    }
    */

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your partnership inquiry. Our team will review and respond within 2 business days.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Partner Inquiry Error]', error);
    return NextResponse.json(
      { error: 'Failed to process your inquiry. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
