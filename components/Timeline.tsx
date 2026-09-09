"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  ShieldCheck,
  Lock,
  Recycle,
  FileCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  MapPin,
  ShieldAlert,
  Radio,
  FileText,
  Download,
  Flame,
  Activity,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface TimelineProps {
}

export const Timeline: React.FC<TimelineProps> = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: "collection",
      number: "01",
      title: "Collection & Scheduled Pickup",
      subtitle: "Smart Bins & Corporate Fleet Dispatch",
      description: "Dedicated electric logistics trucks arrive at your enterprise premises with tamper-evident digital sealing.",
      icon: Truck,
      tag: "On-Site Handover",
    },
    {
      id: "logistics",
      number: "02",
      title: "Secure Reverse Logistics",
      subtitle: "Live GPS Telemetry & Armored Transit",
      description: "Satellite-tracked transport across pan-India corridors with dual-driver verification and smart electronic seals.",
      icon: ShieldCheck,
      tag: "100% Chain-of-Custody",
    },
    {
      id: "destruction",
      number: "03",
      title: "Cryptographic Data Destruction",
      subtitle: "Secure & Physical Micro-Shredding",
      description: "Complete elimination of data liability through multi-pass wiping and physical media destruction.",
      icon: ShieldCheck,
      tag: "Secure Data Wiping",
    },
    {
      id: "recovery",
      number: "04",
      title: "High-Yield Material Recovery",
      subtitle: "AI Robotic Sorting & Urban Mining",
      description: "Multi-spectral AI sorting and closed-loop hydrometallurgy recovering 98.4% high-purity industrial metals.",
      icon: Recycle,
      tag: "98.4% Circular Yield",
    },
    {
      id: "reporting",
      number: "05",
      title: "ESG Compliance & Reporting",
      subtitle: "Automated Form-6 & Scope-3 Ledgers",
      description: "Automated ESG compliance and Scope-3 Ledgers generation.",
      icon: FileCheck,
      tag: "Compliance & Reporting",
    },
  ];

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section id="lifecycle" className="relative w-full py-16 sm:py-20 bg-white border-b border-[#E3E8E4] overflow-hidden">
      {/* Background elements removed */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#629A13]/05 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#00264A]/04 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5DC] border border-[#629A13]/30 text-[#00264A] text-xs font-semibold tracking-wider uppercase mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#629A13] animate-pulse" />
            <span>Industrial Digital Twin</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* COMPACT 2-COLUMN LAYOUT: TIMELINE CARDS + DIGITAL TWIN     */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: 5 COMPACT PROCESS CARDS                       */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2 relative">
            
            {/* Animated Vertical Progress Track */}
            <div className="hidden lg:block absolute left-5 top-4 bottom-4 w-[2px] bg-[#E3E8E4] z-0 pointer-events-none">
              <motion.div
                animate={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-gradient-to-b from-[#629A13] via-[#00264A] to-[#629A13] shadow-[0_0_6px_#629A13]"
              />
            </div>

            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;

              return (
                <button
                  type="button"
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left relative z-10 px-3.5 py-3 rounded-xl transition-all duration-200 cursor-pointer border select-none focus:outline-none ${
                    isActive
                      ? "bg-white border-[#629A13] shadow-[0_8px_20px_rgba(0,38,74,0.08)] ring-1 ring-[#629A13]/40 translate-x-1"
                      : "bg-white/80 hover:bg-white border-[#E3E8E4] hover:border-[#629A13]/40 shadow-2xs hover:translate-x-0.5"
                  }`}
                >
                  {/* Left Indicator Pill on Active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeStepGlow"
                      className="absolute left-0 top-2 bottom-2 w-1 bg-[#629A13] rounded-r-full"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}

                  <div className="flex items-center gap-3 pointer-events-none">
                    {/* Step Icon Container */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isActive
                        ? "bg-[#00264A] text-[#629A13] shadow-sm scale-105"
                        : "bg-[#F8FAF7] text-[#00264A] border border-[#E3E8E4]"
                    }`}>
                      <Icon size={16} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5 mb-0.5">
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs ${
                          isActive
                            ? "bg-[#EBF5DC] text-[#629A13] border border-[#629A13]/30"
                            : "bg-[#F2F5F3] text-[#5E6672]"
                        }`}>
                          STAGE {step.number} • {step.tag}
                        </span>
                        <ChevronRight size={14} className={`transition-transform duration-200 ${
                          isActive ? "text-[#629A13] translate-x-0.5" : "text-[#5E6672]/40"
                        }`} />
                      </div>

                      <h3 className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                        isActive ? "text-[#00264A]" : "text-[#00264A]/80"
                      }`}>
                        {step.title}
                      </h3>

                      <p className="text-[11px] text-[#5E6672] truncate leading-tight mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}



          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: COMPACT DIGITAL TWIN DASHBOARD                */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="h-full rounded-2xl bg-[#001A33] border border-[#00264A] shadow-[0_20px_45px_rgba(0,38,74,0.18)] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden text-white">
              
              {/* Background grid removed */}
              
              {/* Dashboard Top Header Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#629A13]" />
                    <span className="absolute w-3.5 h-3.5 rounded-full bg-[#629A13] animate-ping opacity-60" />
                  </div>
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[#EBF5DC]">
                    DIGITAL TWIN • STAGE {steps[activeStep].number}/05
                  </span>
                </div>

                {/* Direct Stage Navigation Tabs */}
                <div className="flex items-center gap-1">
                  {steps.map((s, sIdx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveStep(sIdx)}
                      className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold transition-all cursor-pointer ${
                        activeStep === sIdx
                          ? "bg-[#629A13] text-white shadow-[0_0_6px_#629A13]"
                          : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      0{sIdx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Simulation Canvas (Compact Scene Switcher) */}
              <div className="relative z-10 my-3 flex-1 flex items-center justify-center min-h-[260px]">
                <AnimatePresence mode="wait">
                  
                  {/* ---------------------------------------------------- */}
                  {/* SCENE 1: COLLECTION & SCHEDULED PICKUP               */}
                  {/* ---------------------------------------------------- */}
                  {activeStep === 0 && (
                    <motion.div
                      key="scene-1"
                      initial={{ opacity: 0, scale: 0.96, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -8 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full flex flex-col justify-between space-y-3"
                    >
                      {/* Live Telemetry Metrics */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white/08 rounded-lg p-2 border border-white/10">
                          <div className="text-[8px] text-[#EBF5DC] font-mono">FACILITY DOCK</div>
                          <div className="text-xs font-bold mt-0.5">Corporate HQ Bay</div>
                        </div>
                        <div className="bg-white/08 rounded-lg p-2 border border-white/10">
                          <div className="text-[8px] text-[#EBF5DC] font-mono">ASSET PAYLOAD</div>
                          <div className="text-xs font-bold text-[#629A13] mt-0.5">142 Barcoded Units</div>
                        </div>
                        <div className="bg-white/08 rounded-lg p-2 border border-white/10">
                          <div className="text-[8px] text-[#EBF5DC] font-mono">SMART SEAL ID</div>
                          <div className="text-xs font-bold font-mono mt-0.5 text-gray-200">#ARK-9942-X</div>
                        </div>
                      </div>

                      {/* Animated Graphic Scene */}
                      <div className="relative h-32 bg-gradient-to-b from-[#00264A]/60 to-[#001A33]/80 rounded-xl border border-white/10 p-3 flex items-end justify-around overflow-hidden">
                        
                        {/* High-Rise Corporate Building */}
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-22 bg-white/10 rounded-t-lg border border-white/20 p-1.5 flex flex-col justify-around">
                            <div className="grid grid-cols-3 gap-1">
                              <div className="w-2 h-1.5 bg-[#EBF5DC] rounded-xs" />
                              <div className="w-2 h-1.5 bg-[#629A13] rounded-xs" />
                              <div className="w-2 h-1.5 bg-white/20 rounded-xs" />
                              <div className="w-2 h-1.5 bg-[#629A13] rounded-xs" />
                              <div className="w-2 h-1.5 bg-[#EBF5DC] rounded-xs" />
                              <div className="w-2 h-1.5 bg-[#629A13] rounded-xs" />
                            </div>
                            <span className="text-[6px] text-center font-mono text-[#EBF5DC]">OFFICE</span>
                          </div>
                        </div>

                        {/* Loading E-Waste Path */}
                        <div className="flex-1 flex flex-col items-center px-3">
                          <motion.div
                            animate={{ x: [-20, 25], opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="flex items-center gap-1 bg-[#629A13] text-white px-2 py-0.5 rounded-md text-[8px] font-mono font-bold shadow-md"
                          >
                            <span>📦 Laptops & CPUs</span>
                          </motion.div>
                          <div className="w-full h-0.5 bg-dashed border-t border-dashed border-[#629A13]/50 my-1.5" />
                          <span className="text-[7px] font-mono text-gray-400">DIGITAL SCALE: 420 KG</span>
                        </div>

                        {/* ArkaArya Electric Logistics Truck */}
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="flex flex-col items-center"
                        >
                          <div className="bg-[#00264A] p-2 rounded-lg border border-[#629A13] shadow-md">
                            <Truck size={28} className="text-[#629A13]" />
                          </div>
                          <span className="text-[7px] font-mono text-[#EBF5DC] mt-0.5 font-bold">EV FLEET #08</span>
                        </motion.div>

                      </div>

                      {/* Scene Live Status Footer */}
                      <div className="flex items-center justify-between text-[11px] text-gray-300 pt-1.5 border-t border-white/10">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-[#629A13]" />
                          <span>GPS Geofenced Dispatch Active</span>
                        </span>
                        <span className="font-mono text-[#629A13] font-bold">100% On-Time SLA</span>
                      </div>
                    </motion.div>
                  )}

                  {/* ---------------------------------------------------- */}
                  {/* SCENE 2: SECURE REVERSE LOGISTICS                    */}
                  {/* ---------------------------------------------------- */}
                  {activeStep === 1 && (
                    <motion.div
                      key="scene-2"
                      initial={{ opacity: 0, scale: 0.96, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -8 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full flex flex-col justify-between space-y-3"
                    >
                      {/* Telemetry Status */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white/08 rounded-lg p-2 border border-white/10">
                          <div className="text-[8px] text-[#EBF5DC] font-mono">CORRIDOR</div>
                          <div className="text-xs font-bold mt-0.5">Pan-India Transit</div>
                        </div>
                        <div className="bg-white/08 rounded-lg p-2 border border-white/10">
                          <div className="text-[8px] text-[#EBF5DC] font-mono">SATELLITE LOCK</div>
                          <div className="text-xs font-bold text-[#629A13] mt-0.5">Dual-SIM Live GPS</div>
                        </div>
                        <div className="bg-white/08 rounded-lg p-2 border border-white/10">
                          <div className="text-[8px] text-[#EBF5DC] font-mono">SEAL STATUS</div>
                          <div className="text-xs font-bold text-[#EBF5DC] mt-0.5">UNBROKEN</div>
                        </div>
                      </div>

                      {/* Animated Live Transit Radar Map */}
                      <div className="relative h-32 bg-gradient-to-b from-[#00264A]/60 to-[#001A33]/80 rounded-xl border border-white/10 p-3 flex flex-col justify-between overflow-hidden">
                        
                        {/* Radar Sweep Line */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                          style={{ transformOrigin: "center center" }}
                          className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#629A13]/10 to-transparent pointer-events-none"
                        />

                        {/* Animated Transit Path with Checkpoints */}
                        <div className="relative z-10 flex items-center justify-between w-full mt-2">
                          
                          {/* Origin Point */}
                          <div className="flex flex-col items-center">
                            <div className="w-5 h-5 rounded-full bg-[#629A13] flex items-center justify-center text-white text-[8px] font-bold shadow-[0_0_8px_#629A13]">
                              A
                            </div>
                            <span className="text-[7px] font-mono text-gray-300 mt-0.5">CLIENT</span>
                          </div>

                          {/* Connecting Route Line with moving vehicle */}
                          <div className="flex-1 mx-3 relative h-1 bg-white/20 rounded-full overflow-visible flex items-center">
                            <motion.div
                              animate={{ width: ["10%", "90%"] }}
                              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                              className="h-full bg-[#629A13] rounded-full shadow-[0_0_8px_#629A13]"
                            />
                            {/* Moving Truck Pin */}
                            <motion.div
                              animate={{ left: ["10%", "85%"] }}
                              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-[#00264A] p-1 rounded-full shadow-md border border-[#629A13]"
                            >
                              <Truck size={12} className="text-[#629A13]" />
                            </motion.div>
                          </div>

                          {/* Destination Processing Hub */}
                          <div className="flex flex-col items-center">
                            <div className="w-5 h-5 rounded-full bg-[#00264A] border border-[#629A13] flex items-center justify-center text-[#EBF5DC] text-[8px] font-bold shadow-[0_0_8px_#629A13]">
                              B
                            </div>
                            <span className="text-[7px] font-mono text-gray-300 mt-0.5">RECYCLER</span>
                          </div>

                        </div>

                        {/* Waypoint Telemetry Data */}
                        <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-[#EBF5DC] bg-white/10 px-2 py-1 rounded-md border border-white/10">
                          <span>SPEED: 58 KM/H</span>
                          <span>CHECKPOINT 3/4 CLEARED</span>
                          <span>ETA: 01H 20M</span>
                        </div>

                      </div>

                      {/* Scene Footer */}
                      <div className="flex items-center justify-between text-[11px] text-gray-300 pt-1.5 border-t border-white/10">
                        <span className="flex items-center gap-1.5">
                          <ShieldAlert size={12} className="text-[#629A13]" />
                          <span>Armored Transit Protocol Active</span>
                        </span>
                        <span className="font-mono text-[#629A13] font-bold">100% Chain-of-Custody</span>
                      </div>
                    </motion.div>
                  )}

                  {/* ---------------------------------------------------- */}
                  {/* SCENE 3: CRYPTOGRAPHIC DATA DESTRUCTION              */}
                  {/* ---------------------------------------------------- */}
                  {activeStep === 2 && (
                    <motion.div
                      key="scene-3"
                      initial={{ opacity: 0, scale: 0.96, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -8 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full flex flex-col justify-between space-y-3"
                    >
                      {/* Telemetry Status */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-[#121212] rounded-lg p-2 border border-white/10">
                          <div className="text-[8px] text-[#5E6672] font-mono">PROTOCOL</div>
                          <div className="text-xs font-bold text-[#629A13] mt-0.5">SECURE</div>
                        </div>
                        <div className="bg-white/08 rounded-lg p-2 border border-white/10">
                          <div className="text-[8px] text-[#EBF5DC] font-mono">DEGAUSS FIELD</div>
                          <div className="text-xs font-bold mt-0.5">18,000 Oe</div>
                        </div>
                        <div className="bg-white/08 rounded-lg p-2 border border-white/10">
                          <div className="text-[8px] text-[#EBF5DC] font-mono">SHRED SIZE</div>
                          <div className="text-xs font-bold text-[#EBF5DC] mt-0.5">&lt; 2mm DIN</div>
                        </div>
                      </div>

                      {/* Industrial Data Sanitization & Shredding Animation */}
                      <div className="relative h-32 bg-gradient-to-b from-[#00264A]/60 to-[#001A33]/80 rounded-xl border border-white/10 p-3 flex items-center justify-around overflow-hidden">
                        
                        {/* 1. Server Drive Input */}
                        <div className="flex flex-col items-center">
                          <div className="w-13 h-14 bg-[#00264A] rounded-lg p-1.5 border border-[#629A13]/50 shadow-md flex flex-col justify-between items-center">
                            <span className="text-[6px] font-mono text-[#EBF5DC]">HDD/SSD</span>
                            <Lock size={15} className="text-[#629A13]" />
                            <span className="text-[5px] font-mono text-gray-400">#9921</span>
                          </div>
                          <span className="text-[7px] font-mono text-gray-300 mt-0.5">INPUT</span>
                        </div>

                        {/* 2. Degaussing & Dissolving Bitstream */}
                        <div className="flex-1 flex flex-col items-center px-3">
                          <motion.div
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-[8px] font-mono font-bold text-[#629A13] bg-black/40 px-2 py-0.5 rounded-sm border border-[#629A13]/40"
                          >
                            010011 → ERASED
                          </motion.div>
                          <div className="w-full h-0.5 bg-[#629A13]/30 my-1.5 relative overflow-hidden">
                            <motion.div
                              animate={{ x: [-40, 120] }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              className="w-6 h-full bg-[#629A13] shadow-[0_0_6px_#629A13]"
                            />
                          </div>
                          <span className="text-[7px] font-mono text-[#EBF5DC]">HIGH-GAUSS</span>
                        </div>

                        {/* 3. Micro-Shredder Blades & Certified Badge */}
                        <div className="flex flex-col items-center">
                          <div className="relative w-13 h-14 bg-gradient-to-b from-[#00264A] to-[#001A33] rounded-lg p-1.5 border border-[#629A13] shadow-md flex flex-col items-center justify-center text-center">
                            <Flame size={16} className="text-yellow-400 animate-pulse" />
                            <span className="text-[6px] font-mono font-bold text-white mt-0.5">SHREDDED</span>
                          </div>
                          <span className="text-[7px] font-mono text-[#629A13] mt-0.5 font-bold">DESTROYED</span>
                        </div>

                      </div>

                      {/* Scene Footer */}
                      <div className="flex items-center justify-between text-[11px] text-gray-300 pt-1.5 border-t border-white/10">
                        <span className="flex items-center gap-1.5">
                          <FileText size={12} className="text-[#629A13]" />
                          <span>Video Certificate ID: #CERT-8842</span>
                        </span>
                        <span className="font-mono text-[#629A13] font-bold">Zero Recovery Risk</span>
                      </div>
                    </motion.div>
                  )}

                  {/* ---------------------------------------------------- */}
                  {/* SCENE 4: HIGH-YIELD MATERIAL RECOVERY                */}
                  {/* ---------------------------------------------------- */}
                  {activeStep === 3 && (
                    <motion.div
                      key="scene-4"
                      initial={{ opacity: 0, scale: 0.96, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -8 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full flex flex-col justify-between space-y-3"
                    >
                      {/* Telemetry Status */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white/08 rounded-lg p-2 border border-white/10">
                          <div className="text-[8px] text-[#EBF5DC] font-mono">RECOVERY YIELD</div>
                          <div className="text-xs font-bold text-[#629A13] mt-0.5">98.4% Pure</div>
                        </div>
                        <div className="bg-white/08 rounded-lg p-2 border border-white/10">
                          <div className="text-[8px] text-[#EBF5DC] font-mono">AI SORTING</div>
                          <div className="text-xs font-bold mt-0.5">Optical Multi-Spectral</div>
                        </div>
                        <div className="bg-white/08 rounded-lg p-2 border border-white/10">
                          <div className="text-[8px] text-[#EBF5DC] font-mono">LANDFILL</div>
                          <div className="text-xs font-bold text-[#EBF5DC] mt-0.5">0.00% Zero Diversion</div>
                        </div>
                      </div>

                      {/* Robotic Conveyor & Hydrometallurgical Extraction */}
                      <div className="relative h-32 bg-gradient-to-b from-[#00264A]/60 to-[#001A33]/80 rounded-xl border border-white/10 p-2.5 flex flex-col justify-between overflow-hidden">
                        
                        {/* Multi-spectral Laser Scan Line */}
                        <motion.div
                          animate={{ x: [-120, 120] }}
                          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                          className="absolute top-0 bottom-0 w-0.5 bg-[#629A13] shadow-[0_0_10px_#629A13] z-20 pointer-events-none"
                        />

                        {/* Motorized Conveyor Belt Flow */}
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-1.5">
                            <Cpu size={18} className="text-[#EBF5DC]" />
                            <div className="text-[8px] font-mono text-gray-300">PCB Boards</div>
                          </div>

                          <div className="flex-1 mx-3 relative h-2 bg-white/20 rounded-full overflow-hidden flex items-center">
                            <motion.div
                              animate={{ x: [-60, 160] }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                              className="w-8 h-full bg-[#629A13] rounded-full shadow-[0_0_8px_#629A13]"
                            />
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Recycle size={18} className="text-[#629A13] animate-spin" style={{ animationDuration: "8s" }} />
                            <div className="text-[8px] font-mono text-[#EBF5DC]">Hydrometallurgy</div>
                          </div>
                        </div>

                        {/* Extracted Minerals Yield Bar */}
                        <div className="grid grid-cols-4 gap-1.5 mt-1">
                          <div className="bg-black/30 p-1.5 rounded-md border border-white/10 text-center">
                            <span className="text-[7px] font-mono text-gray-300 block">COPPER (Cu)</span>
                            <span className="text-[10px] font-bold text-[#E5A93C]">99.9%</span>
                          </div>
                          <div className="bg-black/30 p-1.5 rounded-md border border-white/10 text-center">
                            <span className="text-[7px] font-mono text-gray-300 block">GOLD (Au)</span>
                            <span className="text-[10px] font-bold text-yellow-400">24K</span>
                          </div>
                          <div className="bg-black/30 p-1.5 rounded-md border border-white/10 text-center">
                            <span className="text-[7px] font-mono text-gray-300 block">LITHIUM (Li)</span>
                            <span className="text-[10px] font-bold text-blue-300">Grade A</span>
                          </div>
                          <div className="bg-black/30 p-1.5 rounded-md border border-white/10 text-center">
                            <span className="text-[7px] font-mono text-gray-300 block">POLYMERS</span>
                            <span className="text-[10px] font-bold text-[#629A13]">Circular</span>
                          </div>
                        </div>

                      </div>

                      {/* Scene Footer */}
                      <div className="flex items-center justify-between text-[11px] text-gray-300 pt-1.5 border-t border-white/10">
                        <span className="flex items-center gap-1.5">
                          <Sparkles size={12} className="text-[#629A13]" />
                          <span>Zero-Effluent Treatment (ZETP)</span>
                        </span>
                        <span className="font-mono text-[#629A13] font-bold">Domestic Supply</span>
                      </div>
                    </motion.div>
                  )}

                  {/* ---------------------------------------------------- */}
                  {/* SCENE 5: ESG COMPLIANCE & REPORTING                  */}
                  {/* ---------------------------------------------------- */}
                  {activeStep === 4 && (
                    <motion.div
                      key="scene-5"
                      initial={{ opacity: 0, scale: 0.96, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -8 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full flex flex-col justify-between space-y-3"
                    >
                      {/* Telemetry Status */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white/08 rounded-lg p-2 border border-white/10">
                          <div className="text-[8px] text-[#EBF5DC] font-mono">COMPLIANCE</div>
                          <div className="text-xs font-bold text-[#629A13] mt-0.5">Form-6 Manifest</div>
                        </div>
                        <div className="bg-white/08 rounded-lg p-2 border border-white/10">
                          <div className="text-[8px] text-[#EBF5DC] font-mono">CO₂ AVOIDED</div>
                          <div className="text-xs font-bold mt-0.5">1,200 MT</div>
                        </div>
                        <div className="bg-white/08 rounded-lg p-2 border border-white/10">
                          <div className="text-[8px] text-[#EBF5DC] font-mono">AUDIT STATUS</div>
                          <div className="text-xs font-bold text-[#EBF5DC] mt-0.5">100% Pass</div>
                        </div>
                      </div>

                      {/* Executive ESG Board Dashboard Preview */}
                      <div className="relative h-32 bg-gradient-to-b from-[#00264A]/60 to-[#001A33]/80 rounded-xl border border-white/10 p-3 flex flex-col justify-between overflow-hidden">
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <FileCheck size={16} className="text-[#629A13]" />
                            <span className="text-[10px] font-bold font-mono">COMPLIANCE CERTIFICATE #ARK-EPR-2026</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-[#629A13] text-white text-[8px] font-bold">
                            SEALED & FILED
                          </span>
                        </div>

                        {/* Dynamic Mini Chart Columns */}
                        <div className="grid grid-cols-5 gap-1.5 items-end h-12 pt-1">
                          {[65, 80, 92, 78, 100].map((height, hIdx) => (
                            <div key={hIdx} className="flex flex-col items-center gap-0.5">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ duration: 0.6, delay: hIdx * 0.08 }}
                                className="w-full bg-gradient-to-t from-[#00264A] to-[#629A13] rounded-t-sm shadow-xs"
                              />
                              <span className="text-[6px] font-mono text-gray-300">Q{hIdx + 1}</span>
                            </div>
                          ))}
                        </div>

                        {/* Download Proof Strip */}
                        <div className="flex items-center justify-between text-[9px] font-mono bg-white/10 p-1.5 rounded-md border border-white/10">
                          <span className="text-gray-300">Scope-3 Mass-Balance Ledger.pdf</span>
                          <span className="text-[#629A13] font-bold flex items-center gap-1">
                            <Download size={10} /> Ready
                          </span>
                        </div>

                      </div>

                      {/* Scene Footer */}
                      <div className="flex items-center justify-between text-[11px] text-gray-300 pt-1.5 border-t border-white/10">
                        <span className="flex items-center gap-1.5">
                          <Activity size={12} className="text-[#629A13]" />
                          <span>Statutory Credit Transfer Active</span>
                        </span>
                        <span className="font-mono text-[#629A13] font-bold">100% ESG Portal Integration</span>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Dashboard Bottom Navigation Bar with Direct Buttons */}
              <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-gray-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#629A13] animate-pulse" />
                  <span>NODE: ARKA-HYDROMET-01</span>
                </div>

                {/* Direct Previous & Next Phase Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 cursor-pointer transition-colors text-[10px]"
                  >
                    <ChevronLeft size={11} />
                    <span>Prev</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-2.5 py-1 rounded-md bg-[#629A13] hover:bg-[#528210] text-white font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-[0_0_8px_rgba(98,154,19,0.3)] text-[10px]"
                  >
                    <span>Next</span>
                    <ChevronRight size={11} />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Timeline;
