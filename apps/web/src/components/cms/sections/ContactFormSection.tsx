'use client';

import { useState } from 'react';

interface ContactFormSectionProps {
  config: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    fields?: {
      namePlaceholder?: string;
      emailPlaceholder?: string;
      subjectPlaceholder?: string;
      messagePlaceholder?: string;
      submitButtonText?: string;
    };
    successMessage?: string;
    errorMessage?: string;
  };
  dict?: Record<string, string>;
}

export function ContactFormSection({ config, dict }: ContactFormSectionProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  if (!config?.enabled) return null;

  const fields = config.fields || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (status === 'success') {
    return (
      <div className="bg-surface-secondary border border-accent p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <p className="text-body-lg text-content-primary">
          {config.successMessage || 'Thank you for your message! We will get back to you soon.'}
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div>
      {config.title && (
        <h2 className="font-serif text-heading-lg text-content-primary mb-4">
          {config.title}
        </h2>
      )}
      {config.subtitle && (
        <p className="text-body-md text-content-muted mb-8">
          {config.subtitle}
        </p>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-body-sm">
          {config.errorMessage || 'Something went wrong. Please try again.'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-label-sm uppercase text-content-muted mb-2 tracking-wider">
            {dict?.name || 'Name'}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder={fields.namePlaceholder || 'Your Name'}
            className="w-full px-4 py-3 bg-surface-primary border border-border-light focus:outline-none focus:border-accent transition-colors duration-300 text-content-primary"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-label-sm uppercase text-content-muted mb-2 tracking-wider">
            {dict?.email || 'Email'}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder={fields.emailPlaceholder || 'Your Email'}
            className="w-full px-4 py-3 bg-surface-primary border border-border-light focus:outline-none focus:border-accent transition-colors duration-300 text-content-primary"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-label-sm uppercase text-content-muted mb-2 tracking-wider">
            {dict?.subject || 'Subject'}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder={fields.subjectPlaceholder || 'Subject'}
            className="w-full px-4 py-3 bg-surface-primary border border-border-light focus:outline-none focus:border-accent transition-colors duration-300 text-content-primary"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-label-sm uppercase text-content-muted mb-2 tracking-wider">
            {dict?.message || 'Message'}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder={fields.messagePlaceholder || 'Your Message'}
            className="w-full px-4 py-3 bg-surface-primary border border-border-light focus:outline-none focus:border-accent transition-colors duration-300 text-content-primary resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending...' : (fields.submitButtonText || 'Send Message')}
        </button>
      </form>
    </div>
  );
}

export default ContactFormSection;
