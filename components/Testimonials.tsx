"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck, Award, Lock, FileText, CheckCircle2, Star, Quote, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { useAutoScroll } from "@/hooks/useAutoScroll";

export const Testimonials: React.FC = () => {


  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const certScrollRef = useRef<HTMLDivElement>(null);
  const testScrollRef = useRef<HTMLDivElement>(null);
  useAutoScroll(certScrollRef, 3500);
  useAutoScroll(testScrollRef, 4000, [isLoading, testimonials.length]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("client_endorsements")
          .select("*")
          .eq("is_published", true)
          .order("display_order", { ascending: true });

        if (error) throw error;
        if (data) setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="w-full py-20 bg-[#F8FAF7] border-b border-[#E3E8E4]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        

        {/* Testimonials Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#629A13] uppercase tracking-widest block mb-2">
              Client Endorsements
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#00264A] tracking-tight mb-6">
              Trusted by Industry Leaders
            </h2>
            <a 
              href="https://g.page/r/CfLa9tyVoP5CEBM/review" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#E3E8E4] text-[#00264A] font-bold hover:border-[#629A13] hover:text-[#629A13] transition-colors shadow-sm text-sm"
            >
              <Star className="text-[#FABB05]" size={18} fill="#FABB05" />
              Review us on Google
            </a>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-[#629A13] gap-4 py-12">
              <Loader2 className="w-10 h-10 animate-spin" />
              <p className="text-[#00264A] font-medium text-sm animate-pulse">Loading Client Endorsements...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="flex items-center justify-center text-[#5E6672] font-medium py-12">
              No endorsements published yet.
            </div>
          ) : (
            <div ref={testScrollRef} className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {testimonials.map((t, idx) => (
                <div
                  key={t.id || idx}
                  className="p-8 rounded-3xl bg-[#F8FAF7] border border-[#E3E8E4] shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between group hover:border-[#629A13]/40 min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center"
                >
                  <div>
                    {/* Quote Icon & Stars in Eco Green */}
                    <div className="flex items-center justify-between mb-6">
                      <Quote size={28} className="text-[#629A13] opacity-80" />
                      <div className="flex items-center gap-1 text-[#629A13]">
                        {[...Array(t.rating || 5)].map((_, sIdx) => (
                          <Star key={sIdx} size={14} className="fill-[#629A13]" />
                        ))}
                      </div>
                    </div>

                    {/* Quote Text */}
                    <p className="text-sm sm:text-base text-[#121212] leading-relaxed mb-6 font-sans">
                      "{t.quote}"
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="pt-5 border-t border-[#E3E8E4] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00264A] text-white font-bold text-xs flex items-center justify-center font-mono shrink-0">
                      {(t.author_name || "A")
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#00264A]">
                        {t.author_name}
                      </div>
                      <div className="text-xs text-[#5E6672]">
                        {t.author_role}, <span className="text-[#00264A] font-medium">{t.author_company}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
