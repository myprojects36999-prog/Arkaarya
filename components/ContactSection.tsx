"use client";

import React, { useState } from "react";

import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, ShieldCheck, Building2, Loader2 } from "lucide-react";
import { submitContact } from "@/app/actions/submitContact";

interface ContactSectionProps {
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "Corporate IT Asset Disposal (ITAD)",
    volume: "50-500 kg",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const form = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      const result = await submitContact(form);
      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(result.error || "An error occurred");
      }
    } catch (err) {
      setSubmitError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-20 bg-white border-b border-[#E3E8E4]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Office Details & Logistics Hubs */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E3E8E4] text-[#00264A] text-xs font-semibold tracking-wider uppercase shadow-sm mb-3">
                <span className="w-2 h-2 rounded-full bg-[#629A13]" />
                <span>Direct Enterprise Contact</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#00264A] tracking-tight">
                Connect with our Circular Team
              </h2>
              <p className="text-sm sm:text-base text-[#5E6672] mt-3 leading-relaxed">
                Whether you need immediate ITAD collection, EPR advisory, or secure on-site data destruction, our engineering team responds within 2 business hours.
              </p>
            </div>

            {/* Corporate HQ Card */}
            <div className="p-7 rounded-3xl bg-white border border-[#E3E8E4] shadow-soft space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F8FAF7] border border-[#E3E8E4] text-[#629A13] flex items-center justify-center">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#00264A]">Corporate Headquarters</h3>
                  <p className="text-xs text-[#5E6672]">ArkaArya Private Limited</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-[#5E6672]">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#629A13] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Plot No: 25, Divyasree trinity, 5 & 6, Hitech City Main Rd, near Hexagon Capability Center, Phase 2, HITEC City, Hyderabad, Telangana 500081
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={17} className="text-[#629A13] shrink-0" />
                  <a href="mailto:contact@arkaarya.com" className="text-[#00264A] font-medium hover:text-[#629A13] transition-colors">
                    contact@arkaarya.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={17} className="text-[#629A13] shrink-0" />
                  <a href="tel:9908990874" className="text-[#00264A] font-medium hover:text-[#629A13] transition-colors">
                    +91 9908990874
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E3E8E4] flex items-center justify-between text-xs text-[#5E6672]">
                <span className="flex items-center gap-1.5 font-medium text-[#00264A]">
                  <Clock size={14} className="text-[#629A13]" />
                  Mon – Sat: 9:00 AM – 7:00 PM IST
                </span>
                <span className="text-[#629A13] font-semibold">2-Hr Response SLA</span>
              </div>
            </div>

            {/* Nationwide Coverage Hubs */}
            <div className="p-6 rounded-3xl bg-[#00264A] text-white space-y-3 border border-[#053766]">
              <div className="text-xs font-bold text-[#629A13] uppercase tracking-wider">
                Pan-India Logistics Fleet
              </div>
              <p className="text-xs text-[#E6ECF2] leading-relaxed">
                Dedicated GPS-enabled transport hubs operating across <strong>Hyderabad, Bengaluru, Mumbai, Chennai, Pune, and Delhi-NCR</strong>.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#E3E8E4] shadow-soft-lg">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#00264A] mb-1">
                    Request an Enterprise Quote
                  </h3>
                  <p className="text-xs text-[#5E6672]">
                    Submit your organization's recycling or compliance details to receive an audited proposal.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Anand Varma"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E3E8E4] text-sm text-[#121212] bg-[#F8FAF7] focus:outline-none focus:border-[#629A13] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1.5">
                      Official Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                      title="Please enter a valid email address (e.g. user@example.com)"
                      placeholder="anand@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E3E8E4] text-sm text-[#121212] bg-[#F8FAF7] focus:outline-none focus:border-[#629A13] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1.5">
                      Company / Organization *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Cognizant / TCS"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E3E8E4] text-sm text-[#121212] bg-[#F8FAF7] focus:outline-none focus:border-[#629A13] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E3E8E4] text-sm text-[#121212] bg-[#F8FAF7] focus:outline-none focus:border-[#629A13] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1.5">
                      Primary Service Requirement
                    </label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E3E8E4] text-sm text-[#121212] bg-[#F8FAF7] focus:outline-none focus:border-[#629A13] focus:bg-white transition-colors"
                    >
                      <option value="Corporate IT Asset Disposal (ITAD)">Corporate IT Asset Disposal (ITAD)</option>
                      <option value="EPR Compliance & Target Fulfillment">EPR Compliance & Target Fulfillment</option>
                      <option value="Secure Data Sanitization">Secure Data Sanitization</option>
                      <option value="Closed-Loop Urban Mining & Material Refining">Closed-Loop Urban Mining</option>
                      <option value="General Enterprise Consultation">General Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1.5">
                      Estimated E-Waste Volume
                    </label>
                    <select
                      value={formState.volume}
                      onChange={(e) => setFormState({ ...formState, volume: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E3E8E4] text-sm text-[#121212] bg-[#F8FAF7] focus:outline-none focus:border-[#629A13] focus:bg-white transition-colors"
                    >
                      <option value="Under 50 kg">Under 50 kg (Express Pickup)</option>
                      <option value="50-500 kg">50 - 500 kg (Medium Batch)</option>
                      <option value="500-2000 kg">500 - 2,000 kg (Commercial)</option>
                      <option value="2+ Metric Tonnes">2+ Metric Tonnes (Enterprise Contract)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1.5">
                    Specific Requirements or Asset Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the asset types (laptops, servers, networking gear, batteries) or custom compliance needs..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E3E8E4] text-sm text-[#121212] bg-[#F8FAF7] focus:outline-none focus:border-[#629A13] focus:bg-white transition-colors resize-none"
                  />
                </div>

                {submitError && (
                  <div className="text-red-500 text-sm font-semibold p-2 bg-red-50 rounded-lg border border-red-100">
                    {submitError}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-[#5E6672]">
                    * All inquiries protected by strict non-disclosure agreement.
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#00264A] text-white font-bold text-sm transition-all duration-300 hover:bg-[#001A33] hover:shadow-[0_10px_25px_rgba(0,38,74,0.3)] hover:-translate-y-0.5 group disabled:opacity-70 disabled:hover:-translate-y-0 disabled:hover:shadow-none"
                  >
                    {isSubmitting ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <span>Submit Corporate Inquiry</span>
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EBF5DC] text-[#629A13] flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#00264A]">
                  Inquiry Received Successfully!
                </h3>
                <p className="text-sm text-[#5E6672] max-w-md mx-auto">
                  Thank you, <strong>{formState.name}</strong>. Our enterprise logistics & compliance team will reach out to <strong>{formState.email}</strong> within 2 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: "",
                        email: "",
                        company: "",
                        phone: "",
                        service: "Corporate IT Asset Disposal (ITAD)",
                        volume: "50-500 kg",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#00264A] text-white text-xs font-semibold hover:bg-[#001A33] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
