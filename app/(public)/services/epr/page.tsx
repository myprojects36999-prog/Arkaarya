import React from "react";
import EPRForm from "./EPRForm";
import { ShieldCheck, BarChart, FileText, CheckCircle2, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "EPR Services | ArkaArya - Extended Producer Responsibility",
  description: "Comprehensive EPR compliance solutions for electronic manufacturers, importers, and brands in India.",
};

export default function EPRServicePage() {
  return (
    <main className="min-h-screen bg-[#F8FAF7]">
      {/* ── Hero Section ── */}
      <section className="bg-[#00264A] text-white pt-24 pb-20 px-6 sm:px-10 lg:px-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#629A13]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <a 
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#C8D8E4] hover:text-white transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Homepage
            </a>
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#629A13] mb-4">
            Circular Solutions
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-4xl mx-auto">
            Extended Producer Responsibility (EPR) Compliance
          </h1>
          <p className="text-lg text-[#C8D8E4] max-w-2xl mx-auto leading-relaxed">
            End-to-end EPR authorization and compliance management for Producers, Importers, and Brand Owners (PIBOs) under E-Waste Management Rules, 2022.
          </p>
        </div>
      </section>

      {/* ── Content & Form Section ── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10">
          
          {/* Left: Info */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-[#00264A] mb-6">Simplify Your EPR Compliance</h2>
              <p className="text-[#4A5568] leading-relaxed mb-6 text-lg">
                Navigating the complexities of EPR regulations can be challenging. At ArkaArya, we act as your strategic partner to ensure full compliance with environmental guidelines.
              </p>
              <ul className="space-y-4">
                {[
                  "EPR Authorization & Registration",
                  "E-Waste Collection Target Achievement",
                  "Filing of Quarterly & Annual Returns",
                  "Auditable Trail & Zero-Landfill Reporting",
                  "Issuance of EPR Certificates"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#2D3748] font-medium">
                    <CheckCircle2 className="text-[#629A13] shrink-0 mt-0.5" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E3E8E4]">
                <div className="w-12 h-12 bg-[#F0F5ED] text-[#629A13] rounded-xl flex items-center justify-center mb-4">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="text-lg font-bold text-[#00264A] mb-2">100% Compliant</h4>
                <p className="text-sm text-[#4A5568]">Legally sound processes aligned with the latest E-Waste Rules 2022.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E3E8E4]">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <BarChart size={24} />
                </div>
                <h4 className="text-lg font-bold text-[#00264A] mb-2">Target Management</h4>
                <p className="text-sm text-[#4A5568]">We help you meet your state-wise collection targets effortlessly.</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <EPRForm />
          </div>

        </div>
      </section>
    </main>
  );
}
