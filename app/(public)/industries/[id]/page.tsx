"use client";

import React from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Recycle, ShieldAlert, Cpu } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { illustrationMap } from "@/components/IndustriesSection";
import { createClient } from "@/lib/supabase-browser";
import { Loader2 } from "lucide-react";

export default function IndustryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [industry, setIndustry] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    async function fetchIndustry() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("industries")
          .select("*")
          .eq("display_id", id)
          .single();

        if (error || !data) {
          setError(true);
        } else {
          setIndustry({
            ...data,
            desc: data.description,
            illustration: illustrationMap[data.illustration_name]
          });
        }
      } catch (err) {
        console.error("Error fetching industry:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      fetchIndustry();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAF7] text-[#00264A]">
        <Loader2 className="w-12 h-12 animate-spin text-[#629A13] mb-4" />
        <p className="font-bold tracking-widest text-sm animate-pulse">LOADING INDUSTRY</p>
      </div>
    );
  }

  if (error || !industry) {
    notFound();
  }

  const Illustration = industry.illustration;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7] text-[#121212]">
      <Navbar 
        onOpenCalculator={() => router.push("/#impact")} 
      />

      <main className="flex-grow pt-32 pb-24">
        
        {/* Industry Hero Section */}
        <section className="relative px-6 sm:px-10 lg:px-12 max-w-[1440px] mx-auto mb-24">
          <button 
            onClick={() => router.push("/#industries")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5E6672] hover:text-[#00264A] transition-colors mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Industries
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EBF5DC] border border-[#629A13]/20 w-fit">
                <span className="text-[#00264A] text-xs font-bold tracking-widest uppercase">
                  {industry.metadata}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#00264A] leading-[1.1]">
                {industry.title.split(" & ").map((word: string, index: number, array: string[]) => (
                  <React.Fragment key={index}>
                    {word} {index === 0 && array.length > 1 && <>&<br/></>}
                  </React.Fragment>
                ))}
              </h1>
              
              <p className="text-[#5E6672] text-lg leading-relaxed max-w-lg mt-2">
                {industry.desc} Secure, compliant, and zero-landfill electronic asset disposal specifically engineered for your sector.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <Link 
                  href="/pickup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#629A13] text-white font-bold hover:bg-[#75B518] transition-all shadow-sm btn-eco-glow group/btn"
                >
                  <span>Schedule Certified Pickup</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
                </Link>
              </div>
              

            </motion.div>

            {/* Right Interactive Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full aspect-square max-w-[550px] mx-auto"
            >
              {/* Soft glow background */}
              <div className="absolute inset-0 bg-[#00264A] rounded-full blur-[100px] opacity-5" />
              
              <div className="relative w-full h-full bg-white rounded-[3rem] border border-[#E3E8E4] shadow-2xl flex items-center justify-center overflow-hidden p-12">
                
                {/* Dynamically render the exact illustration from the Industry card, scaled up */}
                <div className="relative z-10 w-full h-full transform scale-150">
                   <Illustration isHovered={true} />
                </div>
                
              </div>
            </motion.div>
            
          </div>
        </section>

        {/* Deep Dive Features */}
        <section className="bg-[#00264A] text-white py-24">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">Tailored Solutions for {industry.title}</h2>
              <p className="text-[#94a3b8] text-lg">
                We understand the unique regulatory, data security, and logistical challenges of the {industry.title.toLowerCase()} sector.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-[#629A13]/20 text-[#629A13] rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Absolute Data Security</h3>
                <p className="text-[#94a3b8] leading-relaxed">
                  We guarantee that every storage device, server, and endpoint is either degaussed, physically shredded, or securely wiped on-site or off-site.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-[#629A13]/20 text-[#629A13] rounded-full flex items-center justify-center mb-6">
                  <Recycle size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Zero-Landfill Processing</h3>
                <p className="text-[#94a3b8] leading-relaxed">
                  Your electronic waste is meticulously dismantled and separated. Toxic materials are safely neutralized, and precious metals are routed back into the circular economy.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-[#629A13]/20 text-[#629A13] rounded-full flex items-center justify-center mb-6">
                  <Cpu size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Value Recovery</h3>
                <p className="text-[#94a3b8] leading-relaxed">
                  Through our expert refurbishment channels, end-of-life but functional equipment is securely remarketed, generating financial returns or EPR compliance credits for your organization.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
