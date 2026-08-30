import React from 'react';
import { Settings, Wrench, ShieldAlert } from 'lucide-react';

export default function MaintenanceView() {
  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-[#E3E8E4] p-8 text-center relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#629A13]/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00264A]/5 rounded-full translate-y-1/2 -translate-x-1/3"></div>

        <div className="relative z-10">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500 shadow-sm border border-amber-100">
            <Wrench size={40} className="animate-pulse" />
          </div>
          
          <h1 className="text-3xl font-bold text-[#00264A] mb-3 font-outfit">
            We'll be right back
          </h1>
          
          <p className="text-[#4A5568] text-sm leading-relaxed mb-8">
            ArkaArya's portal is currently undergoing scheduled maintenance to improve our systems. We apologize for the inconvenience and appreciate your patience.
          </p>


        </div>
      </div>
      
      <div className="mt-8 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} ArkaArya Private Limited. All Rights Reserved.
      </div>
    </div>
  );
}
