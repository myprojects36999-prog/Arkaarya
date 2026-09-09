"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  Recycle,
  Globe2,
  Lock,
  ArrowRight,
  CheckCircle2,
  Building2,
  Leaf
} from "lucide-react";
import { useAutoScroll } from "@/hooks/useAutoScroll";

import Link from "next/link";

interface WhoWeAreProps {
}

export const WhoWeAre: React.FC<WhoWeAreProps> = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useAutoScroll(scrollContainerRef, 3500);

  const pillars = [
    {
      title: "Zero-Landfill Commitment",
      desc: "100% of collected electronic waste is processed through closed-loop hydrometallurgy. Nothing goes to landfills.",
      icon: Leaf,
    },
    {
      title: "Data Destruction",
      desc: "Military-grade data destruction ensuring complete enterprise data security before recycling.",
      icon: Lock,
    },
    {
      title: "ESG & Compliance",
      desc: "Direct CPCB Form-6 manifesting and automated Scope-3 emission audits for transparent corporate governance.",
      icon: Globe2,
    },
    {
      title: "Maximum Resource Recovery",
      desc: "Recovering up to 98.4% of critical industrial metals like Copper, Gold, and Lithium for the circular economy.",
      icon: Recycle,
    },
  ];


  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 bg-white border-b border-[#E3E8E4] overflow-hidden"
    >
      {/* Subtle background ambient mesh */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#629A13]/05 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-[#00264A]/04 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Split-Screen Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: CORPORATE VISION & PILLARS                   */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF5DC] border border-[#629A13]/30 text-[#00264A] text-xs font-semibold tracking-wider uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#629A13] animate-pulse" />
              <span>About ArkaArya</span>
            </div>

            {/* Editorial Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#00264A] tracking-tight leading-[1.12]">
              Pioneering the Future of <br />
              <span className="text-[#629A13] italic font-normal">Enterprise Circularity</span>
            </h2>

            {/* Concise Value Proposition */}
            <p className="text-sm sm:text-base text-[#5E6672] font-sans leading-relaxed max-w-2xl">
              At ArkaArya, we bridge the gap between corporate technology lifecycle management and environmental stewardship. We partner with Fortune 500 enterprises to transform electronic liability into high-purity sustainable value, ensuring regulatory compliance and absolute data security at every step.
            </p>

            {/* 4 Pillars Grid */}
            <div ref={scrollContainerRef} className="flex md:grid md:grid-cols-2 gap-5 pt-4 pb-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 md:pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                    className="flex flex-col gap-3 p-5 rounded-2xl bg-white border border-[#E3E8E4] shadow-2xs hover:shadow-md hover:border-[#629A13]/30 transition-all duration-300 min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F8FAF7] text-[#00264A] flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-[#00264A] mb-1.5 font-display">
                        {pillar.title}
                      </h3>
                      <p className="text-[13px] text-[#5E6672] leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Direct Action Button */}
            <div className="pt-4">
              <Link
                href="/pickup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00264A] hover:bg-[#001A33] text-white text-sm font-semibold transition-all duration-300 active:scale-95 shadow-sm group"
              >
                <span>Partner With Us</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#629A13]" />
              </Link>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: CORPORATE MANIFESTO CARD                    */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 relative">
            
            {/* Decorative Offset Block */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#629A13]/10 to-transparent rounded-[2.5rem] -z-10 transform rotate-3" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-full rounded-[2rem] bg-[#001A33] border border-[#00264A] shadow-[0_25px_60px_rgba(0,38,74,0.15)] p-8 sm:p-10 overflow-hidden text-white flex flex-col justify-between min-h-[460px]"
            >
              {/* Background removed */}
              {/* Top Accent */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-5 mb-8">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-[#629A13]" />
                  <span className="text-[11px] font-bold tracking-widest font-mono text-[#EBF5DC]">THE ARKAARYA VISION</span>
                </div>
              </div>

              {/* Manifesto Text */}
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <div className="mb-6">
                  <svg className="w-10 h-10 text-[#629A13]/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif leading-[1.3] mb-6">
                  "Our mission is to make enterprise technology truly sustainable, protecting your data while preserving our planet for future generations."
                </h3>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-[#00264A] flex items-center justify-center border border-[#629A13]/50">
                    <Building2 size={16} className="text-[#629A13]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Board of Directors</div>
                    <div className="text-[11px] font-mono text-[#629A13]">ARKAARYA RECYCLING</div>
                  </div>
                </div>
              </div>



            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhoWeAre;
