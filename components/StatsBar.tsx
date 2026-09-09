"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Truck, TreePine, Recycle, ShieldCheck, Sparkles, CheckCircle2, ArrowUpRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { useAutoScroll } from "@/hooks/useAutoScroll";

export const StatsBar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [devicesCount, setDevicesCount] = useState(0);
  const [co2Count, setCo2Count] = useState(0);
  const [recoveryCount, setRecoveryCount] = useState(0);
  const [complianceCount, setComplianceCount] = useState(0);
  
  const [isHoveredCard, setIsHoveredCard] = useState<number | null>(null);

  const [targets, setTargets] = useState({
    devices: 0,
    co2: 0,
    recovery: 0,
    compliance: 0,
  });
  const [labels, setLabels] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useAutoScroll(scrollContainerRef, 3500, [isLoading]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("statistics")
          .select("*")
          .eq("is_active", true);

        if (error) throw error;
        
        if (data) {
          let tempTargets = { ...targets };
          let tempLabels: any = {};
          data.forEach((stat: any) => {
            if (stat.value_key === 'devices_recycled') tempTargets.devices = Number(stat.numeric_value);
            if (stat.value_key === 'co2_offset') tempTargets.co2 = Number(stat.numeric_value);
            if (stat.value_key === 'material_recovery') tempTargets.recovery = Number(stat.numeric_value);
            if (stat.value_key === 'cpcb_compliance') tempTargets.compliance = Number(stat.numeric_value);

            tempLabels[stat.value_key] = {
              label: stat.label,
              unit: stat.unit,
              desc: stat.description,
            };
          });
          setTargets(tempTargets);
          setLabels(tempLabels);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    if (!isInView || isLoading) return;

    const duration = 2400; // 2.4s non-linear natural count-up
    const startTime = performance.now();

    const animateCounters = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Non-linear natural ease-out (accelerate smoothly then brake to landing)
      const ease = 1 - Math.pow(1 - progress, 3.5);

      setDevicesCount(Math.floor(targets.devices * ease));
      setCo2Count(Math.floor(targets.co2 * ease));
      setRecoveryCount(Number((targets.recovery * ease).toFixed(1)));
      setComplianceCount(Math.floor(targets.compliance * ease));

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      } else {
        setDevicesCount(targets.devices);
        setCo2Count(targets.co2);
        setRecoveryCount(targets.recovery);
        setComplianceCount(targets.compliance);
      }
    };

    const animId = requestAnimationFrame(animateCounters);
    return () => cancelAnimationFrame(animId);
  }, [isInView, isLoading, targets]);

  return (
    <section 
      id="impact"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white py-[48px] lg:py-24 border-b border-[#E3E8E4]"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#F2F5F3] to-transparent rounded-full opacity-60 pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00264A]/04 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <h2 className="font-bold text-[#00264A] tracking-tight"
              style={{ 
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(30px, 5vw, 3rem)",
                lineHeight: "1.1"
              }}>
              Verified ESG Impact<br className="sm:hidden" /> Dashboard
            </h2>
          </div>
          <p className="text-[13px] sm:text-base text-[#5E6672] max-w-lg font-sans leading-relaxed">
            Every operational metric is verified against Central Pollution Control Board (CPCB) mass-balance registries and forensic recycling protocols.
          </p>
        </div>

        {/* 4 Interactive Metric Cards */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#629A13]" />
          </div>
        ) : (
          <div ref={scrollContainerRef} className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-7 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 -mx-5 px-5 md:mx-0 md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* ========================================================= */}
          {/* CARD 1: DEVICES RECYCLED (Miniature Pickup Truck Loading) */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHoveredCard(1)}
            onMouseLeave={() => setIsHoveredCard(null)}
            className="group relative bg-white rounded-3xl p-7 border border-[#E3E8E4] shadow-[0_8px_30px_rgba(0,38,74,0.04)] hover:shadow-[0_20px_50px_rgba(0,38,74,0.12)] hover:-translate-y-2.5 hover:border-[#629A13]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center"
          >
            {/* Top Accent Gradient on Hover */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00264A] via-[#629A13] to-[#00264A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Animation Scene */}
            <div className="w-full h-36 rounded-2xl bg-[#F8FAF7] border border-[#E3E8E4]/80 p-4 mb-6 relative overflow-hidden flex items-end justify-center">
              {/* Road line */}
              <div className="absolute bottom-4 left-0 right-0 h-1 bg-[#E3E8E4] flex justify-around">
                <div className="w-4 h-full bg-[#629A13]/40 animate-pulse" />
                <div className="w-4 h-full bg-[#629A13]/40 animate-pulse delay-100" />
                <div className="w-4 h-full bg-[#629A13]/40 animate-pulse delay-200" />
              </div>

              {/* Miniature Arkaarya Pickup Truck SVG */}
              <motion.div 
                animate={isInView ? { x: [0, 4, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex flex-col items-center mb-1"
              >
                {/* E-Waste particles floating into the truck */}
                <div className="absolute -top-12 left-2 flex gap-1">
                  <motion.div
                    animate={{ y: [0, 16], opacity: [0, 1, 0], scale: [0.8, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: 0.2 }}
                    className="w-4 h-3 bg-[#00264A] rounded-xs text-[6px] text-white flex items-center justify-center font-mono shadow-xs"
                  >
                    💻
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 18], opacity: [0, 1, 0], scale: [0.8, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: 0.6 }}
                    className="w-3 h-4 bg-[#629A13] rounded-xs text-[6px] text-white flex items-center justify-center font-mono shadow-xs"
                  >
                    📱
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 17], opacity: [0, 1, 0], scale: [0.8, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: 1.0 }}
                    className="w-3.5 h-3.5 bg-[#00264A] rounded-xs text-[6px] text-white flex items-center justify-center font-mono shadow-xs"
                  >
                    ⚡
                  </motion.div>
                </div>

                {/* Truck Body */}
                <svg width="120" height="52" viewBox="0 0 120 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Bed & Cabin */}
                  <path d="M10 24H60V38H10V24Z" fill="#00264A" />
                  <path d="M60 16H84L96 28V38H60V16Z" fill="#00264A" />
                  <path d="M66 20H80L88 28H66V20Z" fill="#EBF5DC" />
                  {/* Green Eco Accent Line */}
                  <rect x="10" y="32" width="86" height="3" fill="#629A13" />
                  {/* Wheels with rotation */}
                  <circle cx="28" cy="38" r="8" fill="#121212" />
                  <circle cx="28" cy="38" r="4" fill="#E3E8E4" />
                  <circle cx="78" cy="38" r="8" fill="#121212" />
                  <circle cx="78" cy="38" r="4" fill="#E3E8E4" />
                </svg>

                {/* Eco Green Sparkles popping around truck */}
                <motion.div
                  animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2.2 }}
                  className="absolute -right-2 top-0"
                >
                  <Sparkles size={16} className="text-[#629A13]" />
                </motion.div>
              </motion.div>
            </div>

            {/* Metric Value & Label */}
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#00264A] tracking-tight font-display mb-1.5 flex items-baseline gap-1">
                <span>{devicesCount.toLocaleString("en-IN")}</span>
                <span className="text-[#629A13] text-2xl font-bold">{labels.devices_recycled?.unit || "+"}</span>
              </div>
              <h3 className="text-xs font-bold text-[#629A13] uppercase tracking-wider mb-1">
                {labels.devices_recycled?.label || "Devices Responsibly Recycled"}
              </h3>
              <p className="text-xs text-[#5E6672] leading-relaxed">
                {labels.devices_recycled?.desc || "Smartphones, enterprise servers, laptops, and networking hardware processed with data sanitization."}
              </p>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CARD 2: CO₂ OFFSET (Growing Tree & Swaying Leaves)        */}
          {/* ========================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setIsHoveredCard(2)}
              onMouseLeave={() => setIsHoveredCard(null)}
              className="group relative bg-white rounded-3xl p-7 border border-[#E3E8E4] shadow-[0_8px_30px_rgba(0,38,74,0.04)] hover:shadow-[0_20px_50px_rgba(0,38,74,0.12)] hover:-translate-y-2.5 hover:border-[#629A13]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center"
            >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#629A13] via-[#00264A] to-[#629A13] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Animation Scene */}
            <div className="w-full h-36 rounded-2xl bg-[#F8FAF7] border border-[#E3E8E4]/80 p-4 mb-6 relative overflow-hidden flex items-end justify-center">
              {/* Soil mound */}
              <div className="absolute bottom-2 w-28 h-4 bg-[#E3E8E4] rounded-full" />

              {/* Animated Tree SVG */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Floating Clean Air Bubbles / CO2 Absorption */}
                <motion.div
                  animate={{ y: [-5, -28], opacity: [0.2, 0.9, 0], scale: [0.7, 1.1] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
                  className="absolute -top-4 text-[10px] font-bold text-[#629A13] bg-white px-2 py-0.5 rounded-full border border-[#629A13]/30 shadow-xs"
                >
                  -CO₂
                </motion.div>

                {/* Swaying Foliage Canopy */}
                <motion.div
                  animate={{ rotate: [-2, 3, -2] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  style={{ transformOrigin: "bottom center" }}
                  className="relative"
                >
                  <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Lush Green Foliage */}
                    <circle cx="37" cy="30" r="26" fill="#629A13" />
                    <circle cx="24" cy="28" r="18" fill="#528210" />
                    <circle cx="50" cy="28" r="18" fill="#71B018" />
                    <circle cx="37" cy="18" r="16" fill="#84C622" />
                    <path d="M37 12L39 16L37 15L35 16L37 12Z" fill="#EBF5DC" />
                  </svg>
                </motion.div>

                {/* Trunk */}
                <div className="w-3.5 h-6 bg-[#00264A] rounded-t-xs -mt-1" />
              </div>
            </div>

            {/* Metric Value & Label */}
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#00264A] tracking-tight font-display mb-1.5 flex items-baseline gap-1">
                <span>{co2Count.toLocaleString("en-IN")}</span>
                <span className="text-sm font-semibold text-[#5E6672]">{labels.co2_offset?.unit || "Metric Tonnes"}</span>
              </div>
              <h3 className="text-xs font-bold text-[#629A13] uppercase tracking-wider mb-1">
                {labels.co2_offset?.label || "Direct CO₂ Emissions Offset"}
              </h3>
              <p className="text-xs text-[#5E6672] leading-relaxed">
                {labels.co2_offset?.desc || "Equivalent to planting 54,000+ urban trees by eliminating raw virgin mining dependencies."}
              </p>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CARD 3: MATERIAL RECOVERY (Conveyor Belt & Yield Ring)    */}
          {/* ========================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setIsHoveredCard(3)}
              onMouseLeave={() => setIsHoveredCard(null)}
              className="group relative bg-white rounded-3xl p-7 border border-[#E3E8E4] shadow-[0_8px_30px_rgba(0,38,74,0.04)] hover:shadow-[0_20px_50px_rgba(0,38,74,0.12)] hover:-translate-y-2.5 hover:border-[#629A13]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center"
            >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00264A] via-[#629A13] to-[#00264A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Animation Scene */}
            <div className="w-full h-36 rounded-2xl bg-[#F8FAF7] border border-[#E3E8E4]/80 p-4 mb-6 relative overflow-hidden flex items-center justify-center">
              
              {/* Circular Progress Gauge */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#E3E8E4"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#629A13"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 40}
                    style={{ strokeDashoffset: 2 * Math.PI * 40 }}
                    initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                    animate={isInView && !isLoading ? { strokeDashoffset: 2 * Math.PI * 40 * (1 - ((targets.recovery || 98.4) / 100)) } : { strokeDashoffset: 2 * Math.PI * 40 }}
                    transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Inner Icon & Minerals */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Recycle size={24} className="text-[#00264A] group-hover:rotate-180 transition-transform duration-700" />
                  <span className="text-[10px] font-bold text-[#629A13] mt-0.5 font-mono">{targets.recovery || 98.4}%</span>
                </div>
              </div>

              {/* Conveyor Belt Minerals Badge */}
              <div className="absolute bottom-2 flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full border border-[#E3E8E4] shadow-2xs text-[9px] font-semibold text-[#00264A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" title="Gold & Copper" />
                <span>Cu • Au • Al • Li</span>
              </div>
            </div>

            {/* Metric Value & Label */}
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#00264A] tracking-tight font-display mb-1.5 flex items-baseline gap-1">
                <span>{recoveryCount}{labels.material_recovery?.unit || "%"}</span>
                <span className="text-sm font-semibold text-[#629A13]">Yield</span>
              </div>
              <h3 className="text-xs font-bold text-[#629A13] uppercase tracking-wider mb-1">
                {labels.material_recovery?.label || "Critical Material Recovery Rate"}
              </h3>
              <p className="text-xs text-[#5E6672] leading-relaxed">
                {labels.material_recovery?.desc || "Forensic extraction of precious metals, high-grade copper, rare earths, and clean circular polymers."}
              </p>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CARD 4: CPCB & EPR COMPLIANCE (Hologram Shield & Stamp)   */}
          {/* ========================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setIsHoveredCard(4)}
              onMouseLeave={() => setIsHoveredCard(null)}
              className="group relative bg-white rounded-3xl p-7 border border-[#E3E8E4] shadow-[0_8px_30px_rgba(0,38,74,0.04)] hover:shadow-[0_20px_50px_rgba(0,38,74,0.12)] hover:-translate-y-2.5 hover:border-[#629A13]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center"
            >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#629A13] via-[#00264A] to-[#629A13] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Animation Scene */}
            <div className="w-full h-36 rounded-2xl bg-[#F8FAF7] border border-[#E3E8E4]/80 p-4 mb-6 relative overflow-hidden flex items-center justify-center">
              
              {/* Laser Scanning Line */}
              <motion.div
                animate={{ y: [-35, 35, -35] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute left-4 right-4 h-0.5 bg-[#629A13] shadow-[0_0_12px_#629A13] z-20"
              />

              {/* Holographic CPCB Certification Badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-b from-[#00264A] to-[#001A33] border-2 border-[#629A13] shadow-md flex flex-col items-center justify-center text-white"
              >
                <ShieldCheck size={28} className="text-[#629A13] mb-1" />
                <span className="text-[9px] font-extrabold tracking-widest text-[#EBF5DC]">CPCB</span>
                <span className="text-[7px] text-gray-300 font-mono">AUDITED</span>

                {/* Stamped Verified Badge */}
                <div className="absolute -top-2 -right-2 bg-[#629A13] text-white p-1 rounded-full shadow-xs">
                  <CheckCircle2 size={12} />
                </div>
              </motion.div>

              {/* Ambient Ripple Ring */}
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.8 }}
                className="absolute w-24 h-24 rounded-full border border-[#629A13]/40 pointer-events-none"
              />
            </div>

            {/* Metric Value & Label */}
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#00264A] tracking-tight font-display mb-1.5 flex items-baseline gap-1">
                <span>{complianceCount}{labels.cpcb_compliance?.unit || "%"}</span>
                <span className="text-sm font-bold text-[#629A13]">Compliant</span>
              </div>
              <h3 className="text-xs font-bold text-[#629A13] uppercase tracking-wider mb-1">
                {labels.cpcb_compliance?.label || "CPCB & Pan-India EPR Certified"}
              </h3>
              <p className="text-xs text-[#5E6672] leading-relaxed">
                {labels.cpcb_compliance?.desc || "100% legally audited recycling certificates with traceable mass-balance compliance for corporate audit readiness."}
              </p>
            </div>
          </motion.div>
        </div>
        )}



      </div>
    </section>
  );
};

export default StatsBar;
