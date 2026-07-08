'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormConfig {
  title?: string;
  description?: string;
  companyFields?: {
    companyName?: { label?: string; placeholder?: string; required?: boolean };
    website?: { label?: string; placeholder?: string; required?: boolean };
    country?: { label?: string; placeholder?: string; required?: boolean };
    companyType?: {
      label?: string;
      required?: boolean;
      options?: { value?: string; label?: string }[];
    };
  };
  contactFields?: {
    contactName?: { label?: string; placeholder?: string; required?: boolean };
    email?: { label?: string; placeholder?: string; required?: boolean };
    phone?: { label?: string; placeholder?: string; required?: boolean };
    role?: {
      label?: string;
      required?: boolean;
      options?: { value?: string; label?: string }[];
    };
  };
  businessFields?: {
    annualVolume?: {
      label?: string;
      required?: boolean;
      options?: { value?: string; label?: string }[];
    };
    destinationsOfInterest?: {
      label?: string;
      required?: boolean;
      options?: { value?: string; label?: string }[];
    };
    servicesOfInterest?: {
      label?: string;
      required?: boolean;
      options?: { value?: string; label?: string }[];
    };
  };
  additionalFields?: {
    partnershipType?: {
      label?: string;
      required?: boolean;
      options?: { value?: string; label?: string }[];
    };
    message?: { label?: string; placeholder?: string; required?: boolean };
    howDidYouHear?: {
      label?: string;
      options?: { value?: string; label?: string }[];
    };
  };
  submitButton?: {
    text?: string;
    loadingText?: string;
  };
  successMessage?: {
    title?: string;
    description?: string;
  };
}

interface B2BInquiryFormProps {
  config: FormConfig;
  locale: string;
}

// Step configuration
const STEPS = [
  { id: 1, title: 'Company', icon: 'building' },
  { id: 2, title: 'Contact', icon: 'user' },
  { id: 3, title: 'Business', icon: 'chart' },
  { id: 4, title: 'Details', icon: 'message' },
] as const;

export function B2BInquiryForm({ config, locale }: B2BInquiryFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  // Form data state for multi-step
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    country: '',
    companyType: '',
    contactName: '',
    email: '',
    phone: '',
    role: '',
    annualVolume: '',
    partnershipType: '',
    message: '',
    howDidYouHear: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDestinationToggle = (value: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleServiceToggle = (value: string) => {
    setSelectedServices((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.companyName && formData.country && formData.companyType);
      case 2:
        return !!(formData.contactName && formData.email);
      case 3:
        return !!(formData.annualVolume && selectedDestinations.length > 0);
      case 4:
        return true;
      default:
        return true;
    }
  };

  const goToNextStep = () => {
    if (validateStep(currentStep) && currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
      setError(null);
    } else if (!validateStep(currentStep)) {
      setError('Please fill in all required fields before proceeding.');
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setError(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    // Prevent form submission when pressing Enter
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;
      // Allow Enter in textarea for line breaks
      if (target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
      // If not on final step, go to next step
      if (currentStep < STEPS.length) {
        goToNextStep();
      }
      // On final step, do nothing - user must click the submit button
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Only allow actual submission on the final step
    if (currentStep < STEPS.length) {
      return; // Should not reach here, but just in case
    }

    // Validate all steps before final submission
    for (let step = 1; step <= STEPS.length; step++) {
      if (!validateStep(step)) {
        setCurrentStep(step);
        setError('Please fill in all required fields before submitting.');
        return;
      }
    }

    setIsSubmitting(true);
    setError(null);

    const data = {
      ...formData,
      destinationsOfInterest: selectedDestinations,
      servicesOfInterest: selectedServices,
      locale,
    };

    try {
      const response = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit');
      }

      setIsSuccess(true);
    } catch (err) {
      console.log(err);
      setError('Failed to submit inquiry. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16 px-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-8 relative"
        >
          <div className="absolute inset-0 bg-[#C4A35A]/10 rounded-full" />
          <div className="absolute inset-2 bg-[#C4A35A]/20 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#C4A35A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </motion.div>
        <h3 className="font-serif text-3xl text-[#2C2C2C] mb-4 tracking-tight">
          {config.successMessage?.title || 'Thank You!'}
        </h3>
        <p className="text-[#7A7A7A] font-light leading-relaxed max-w-md mx-auto mb-8">
          {config.successMessage?.description ||
            'We have received your partnership inquiry. Our team will review your information and respond within 2 business days.'}
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-[#A0A0A0]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-light">Expected response: 24-48 hours</span>
        </div>
      </motion.div>
    );
  }

  // Step icons
  const StepIcon = ({ icon, isActive, isCompleted }: { icon: string; isActive: boolean; isCompleted: boolean }) => {
    const iconClass = isActive 
      ? 'text-[#C4A35A]' 
      : isCompleted 
        ? 'text-[#C4A35A]' 
        : 'text-[#A0A0A0]';
    
    const icons: Record<string, React.ReactNode> = {
      building: (
        <svg className={`w-4 h-4 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      user: (
        <svg className={`w-4 h-4 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      chart: (
        <svg className={`w-4 h-4 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      message: (
        <svg className={`w-4 h-4 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    };
    return icons[icon] || null;
  };

  const inputClasses =
    'w-full px-4 py-3.5 bg-white border border-[#E8E8E4] text-[#2C2C2C] placeholder-[#A0A0A0] focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A]/20 transition-all duration-200';
  const labelClasses = 'block text-sm text-[#4A4A4A] font-light mb-2 tracking-wide';
  const selectClasses =
    'w-full px-4 py-3.5 bg-white border border-[#E8E8E4] text-[#2C2C2C] focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A]/20 transition-all duration-200 appearance-none cursor-pointer';

  return (
    <div>
      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          {/* Progress line - background */}
          <div className="absolute top-4 left-0 right-0 h-px bg-[#E8E8E4] z-0" />
          {/* Progress line - filled */}
          <div 
            className="absolute top-4 left-0 h-px bg-[#C4A35A] transition-all duration-500 z-0"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
          
          {STEPS.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center bg-[#ffffff]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (step.id < currentStep) {
                      setCurrentStep(step.id);
                    }
                  }}
                  disabled={step.id >= currentStep}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#C4A35A] shadow-lg shadow-[#C4A35A]/20' 
                      : isCompleted 
                        ? 'bg-[#C4A35A]/10 border border-[#C4A35A] cursor-pointer hover:bg-[#C4A35A]/20' 
                        : 'bg-[#F5F5F3] border border-[#E8E8E4]'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4 text-[#C4A35A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <StepIcon icon={step.icon} isActive={isActive} isCompleted={isCompleted} />
                  )}
                </button>
                <span className={`mt-2 text-xs font-light tracking-wide transition-colors ${
                  isActive ? 'text-[#C4A35A]' : isCompleted ? 'text-[#4A4A4A]' : 'text-[#A0A0A0]'
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <AnimatePresence mode="wait">
          {/* Step 1: Company Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h3 className="font-serif text-2xl text-[#2C2C2C] mb-2 tracking-tight">
                  Tell us about your company
                </h3>
                <p className="text-[#7A7A7A] font-light text-sm">
                  Help us understand your business so we can serve you better.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="companyName" className={labelClasses}>
                    {config.companyFields?.companyName?.label || 'Company Name'}{' '}
                    <span className="text-[#C4A35A]">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder={config.companyFields?.companyName?.placeholder || 'Your company name'}
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="website" className={labelClasses}>
                    {config.companyFields?.website?.label || 'Website'}
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder={config.companyFields?.website?.placeholder || 'https://yourcompany.com'}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="country" className={labelClasses}>
                    {config.companyFields?.country?.label || 'Country / Region'}{' '}
                    <span className="text-[#C4A35A]">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder={config.companyFields?.country?.placeholder || 'Your country'}
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="companyType" className={labelClasses}>
                    {config.companyFields?.companyType?.label || 'Company Type'}{' '}
                    <span className="text-[#C4A35A]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="companyType"
                      name="companyType"
                      value={formData.companyType}
                      onChange={handleInputChange}
                      required
                      className={selectClasses}
                    >
                      {config.companyFields?.companyType?.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A0A0] pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h3 className="font-serif text-2xl text-[#2C2C2C] mb-2 tracking-tight">
                  Your contact details
                </h3>
                <p className="text-[#7A7A7A] font-light text-sm">
                  How can we reach you to discuss partnership opportunities?
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="contactName" className={labelClasses}>
                    {config.contactFields?.contactName?.label || 'Your Name'}{' '}
                    <span className="text-[#C4A35A]">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder={config.contactFields?.contactName?.placeholder || 'Your full name'}
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClasses}>
                    {config.contactFields?.email?.label || 'Business Email'}{' '}
                    <span className="text-[#C4A35A]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={config.contactFields?.email?.placeholder || 'your@company.com'}
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClasses}>
                    {config.contactFields?.phone?.label || 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={config.contactFields?.phone?.placeholder || '+1 234 567 8900'}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="role" className={labelClasses}>
                    {config.contactFields?.role?.label || 'Your Role'}
                  </label>
                  <div className="relative">
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className={selectClasses}
                    >
                      {config.contactFields?.role?.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A0A0] pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Business Details */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h3 className="font-serif text-2xl text-[#2C2C2C] mb-2 tracking-tight">
                  Business requirements
                </h3>
                <p className="text-[#7A7A7A] font-light text-sm">
                  Help us understand your market focus and service needs.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="annualVolume" className={labelClasses}>
                    {config.businessFields?.annualVolume?.label || 'Annual Passenger Volume to SE Asia'}{' '}
                    <span className="text-[#C4A35A]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="annualVolume"
                      name="annualVolume"
                      value={formData.annualVolume}
                      onChange={handleInputChange}
                      required
                      className={selectClasses}
                    >
                      {config.businessFields?.annualVolume?.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A0A0] pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Destinations of Interest */}
                <div>
                  <label className={labelClasses}>
                    {config.businessFields?.destinationsOfInterest?.label || 'Destinations of Interest'}{' '}
                    <span className="text-[#C4A35A]">*</span>
                  </label>
                  <p className="text-[#A0A0A0] text-xs mb-3 font-light">Select all that apply</p>
                  <div className="grid grid-cols-2 gap-3">
                    {config.businessFields?.destinationsOfInterest?.options?.map((option) => {
                      const isSelected = selectedDestinations.includes(option.value || '');
                      return (
                        <label
                          key={option.value}
                          className={`flex items-center gap-3 px-4 py-3.5 border cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? 'border-[#C4A35A] bg-[#C4A35A]/5'
                              : 'border-[#E8E8E4] bg-white hover:border-[#C4A35A]/50'
                          }`}
                        >
                          <span className={`flex-shrink-0 w-5 h-5 rounded-sm border flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-[#C4A35A] border-[#C4A35A]' : 'border-[#D4D4CC]'
                          }`}>
                            {isSelected && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={isSelected}
                            onChange={() => handleDestinationToggle(option.value || '')}
                            className="sr-only"
                          />
                          <span className={`text-sm font-light ${isSelected ? 'text-[#2C2C2C]' : 'text-[#4A4A4A]'}`}>
                            {option.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Services of Interest */}
                <div>
                  <label className={labelClasses}>
                    {config.businessFields?.servicesOfInterest?.label || 'Services of Interest'}
                  </label>
                  <p className="text-[#A0A0A0] text-xs mb-3 font-light">Select all that apply</p>
                  <div className="grid grid-cols-2 gap-3">
                    {config.businessFields?.servicesOfInterest?.options?.map((option) => {
                      const isSelected = selectedServices.includes(option.value || '');
                      return (
                        <label
                          key={option.value}
                          className={`flex items-center gap-3 px-4 py-3.5 border cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? 'border-[#C4A35A] bg-[#C4A35A]/5'
                              : 'border-[#E8E8E4] bg-white hover:border-[#C4A35A]/50'
                          }`}
                        >
                          <span className={`flex-shrink-0 w-5 h-5 rounded-sm border flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-[#C4A35A] border-[#C4A35A]' : 'border-[#D4D4CC]'
                          }`}>
                            {isSelected && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={isSelected}
                            onChange={() => handleServiceToggle(option.value || '')}
                            className="sr-only"
                          />
                          <span className={`text-sm font-light ${isSelected ? 'text-[#2C2C2C]' : 'text-[#4A4A4A]'}`}>
                            {option.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Additional Information */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h3 className="font-serif text-2xl text-[#2C2C2C] mb-2 tracking-tight">
                  Almost there
                </h3>
                <p className="text-[#7A7A7A] font-light text-sm">
                  Any additional details you'd like to share with us?
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="partnershipType" className={labelClasses}>
                    {config.additionalFields?.partnershipType?.label || 'Partnership Interest'}
                  </label>
                  <div className="relative">
                    <select
                      id="partnershipType"
                      name="partnershipType"
                      value={formData.partnershipType}
                      onChange={handleInputChange}
                      className={selectClasses}
                    >
                      {config.additionalFields?.partnershipType?.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A0A0] pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClasses}>
                    {config.additionalFields?.message?.label || 'Tell us about your needs'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={config.additionalFields?.message?.placeholder || 'Share any specific requirements, questions, or how you envision our collaboration...'}
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <div>
                  <label htmlFor="howDidYouHear" className={labelClasses}>
                    {config.additionalFields?.howDidYouHear?.label || 'How did you hear about us?'}
                  </label>
                  <div className="relative">
                    <select
                      id="howDidYouHear"
                      name="howDidYouHear"
                      value={formData.howDidYouHear}
                      onChange={handleInputChange}
                      className={selectClasses}
                    >
                      {config.additionalFields?.howDidYouHear?.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A0A0] pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="mt-8 p-6 bg-[#F5F5F3] border border-[#E8E8E4]">
                <h4 className="text-xs tracking-[0.15em] uppercase text-[#A0A0A0] font-light mb-4">
                  Inquiry Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#7A7A7A] font-light">Company</span>
                    <span className="text-[#2C2C2C]">{formData.companyName || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7A7A] font-light">Contact</span>
                    <span className="text-[#2C2C2C]">{formData.contactName || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7A7A] font-light">Destinations</span>
                    <span className="text-[#2C2C2C]">{selectedDestinations.length} selected</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-[#A65D5D]/10 border border-[#A65D5D]/20 text-[#A65D5D] text-sm font-light"
          >
            {error}
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={goToPrevStep}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-light transition-colors ${
              currentStep === 1
                ? 'text-[#A0A0A0] cursor-not-allowed'
                : 'text-[#4A4A4A] hover:text-[#2C2C2C]'
            }`}
            disabled={currentStep === 1}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {currentStep < STEPS.length ? (
            <button
              type="button"
              onClick={goToNextStep}
              className="flex items-center gap-2 px-8 py-3.5 bg-[#1C1C1C] text-white text-sm font-light hover:bg-[#2C2C2C] transition-colors"
            >
              Continue
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => formRef.current?.requestSubmit()}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3.5 bg-[#C4A35A] text-white text-sm font-light hover:bg-[#B89B4A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {config.submitButton?.loadingText || 'Submitting...'}
                </>
              ) : (
                <>
                  {config.submitButton?.text || 'Submit Inquiry'}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>

        {/* Privacy Note */}
        {currentStep === STEPS.length && (
          <p className="mt-6 text-xs text-[#A0A0A0] font-light text-center">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        )}
      </form>
    </div>
  );
}
