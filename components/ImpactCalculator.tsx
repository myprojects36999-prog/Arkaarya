"use client";

import React, { useState } from "react";
import { X, Sparkles, Trees, BatteryCharging, Factory, ArrowRight, ShieldCheck } from "lucide-react";

interface ImpactCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  onBookWithData?: (summary: string) => void;
  onBookPickup?: () => void;
}

export const ImpactCalculator: React.FC<ImpactCalculatorProps> = ({
  isOpen,
  onClose,
  onBookWithData,
  onBookPickup,
}) => {
  const [laptops, setLaptops] = useState(25);
  const [phones, setPhones] = useState(50);
  const [servers, setServers] = useState(5);
  const [printers, setPrinters] = useState(8);

  if (!isOpen) return null;

  // Impact formulas
  const co2OffsetKg = laptops * 45 + phones * 12 + servers * 350 + printers * 85;
  const treesSaved = Math.floor(co2OffsetKg / 21);
  const rawMaterialsKg = (laptops * 1.8 + phones * 0.18 + servers * 24 + printers * 14).toFixed(1);
  const goldRecoveredGrams = (phones * 0.034 + laptops * 0.05 + servers * 0.25).toFixed(2);

  const handleProceed = () => {
    const summary = `${laptops} Laptops, ${phones} Phones, ${servers} Servers, ${printers} Printers (~${(co2OffsetKg / 1000).toFixed(2)}T CO2)`;
    if (onBookWithData) {
      onBookWithData(summary);
    } else if (onBookPickup) {
      onClose();
      onBookPickup();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001A33]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E3E8E4] relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#5E6672] hover:text-[#00264A] hover:bg-[#F2F5F3] transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5DC] text-[#629A13] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles size={14} />
            <span>Interactive ESG Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#00264A]">
            Estimate Your Environmental Impact
          </h2>
          <p className="text-xs sm:text-sm text-[#5E6672] mt-1">
            Adjust the sliders below to calculate the carbon offset, secondary mineral recovery, and tree equivalence of recycling your electronic assets.
          </p>
        </div>

        {/* Sliders Grid */}
        <div className="space-y-4 mb-8 bg-[#F8FAF7] p-5 sm:p-6 rounded-2xl border border-[#E3E8E4]">
          <div>
            <div className="flex justify-between text-xs sm:text-sm font-semibold text-[#00264A] mb-1.5">
              <span>Laptops / Workstations</span>
              <span className="text-[#629A13] font-mono font-bold">{laptops} units</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={laptops}
              onChange={(e) => setLaptops(Number(e.target.value))}
              className="w-full accent-[#629A13] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs sm:text-sm font-semibold text-[#00264A] mb-1.5">
              <span>Smartphones / Mobile Devices</span>
              <span className="text-[#629A13] font-mono font-bold">{phones} units</span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              value={phones}
              onChange={(e) => setPhones(Number(e.target.value))}
              className="w-full accent-[#629A13] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs sm:text-sm font-semibold text-[#00264A] mb-1.5">
              <span>Enterprise Servers / Network Racks</span>
              <span className="text-[#629A13] font-mono font-bold">{servers} units</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={servers}
              onChange={(e) => setServers(Number(e.target.value))}
              className="w-full accent-[#629A13] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs sm:text-sm font-semibold text-[#00264A] mb-1.5">
              <span>Printers / Industrial Scanners</span>
              <span className="text-[#629A13] font-mono font-bold">{printers} units</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={printers}
              onChange={(e) => setPrinters(Number(e.target.value))}
              className="w-full accent-[#629A13] cursor-pointer"
            />
          </div>
        </div>

        {/* Results Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-[#00264A] text-white flex flex-col justify-between">
            <Factory size={20} className="text-[#629A13] mb-2" />
            <div>
              <div className="text-xl sm:text-2xl font-bold font-display">
                {(co2OffsetKg / 1000).toFixed(2)}
              </div>
              <div className="text-[11px] text-[#E6ECF2] uppercase font-semibold">Tonnes CO₂ Diverted</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#EBF5DC] text-[#00264A] flex flex-col justify-between border border-[#629A13]/30">
            <Trees size={20} className="text-[#629A13] mb-2" />
            <div>
              <div className="text-xl sm:text-2xl font-bold font-display">{treesSaved}</div>
              <div className="text-[11px] text-[#00264A] uppercase font-semibold">Trees Equivalent</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAF7] text-[#00264A] flex flex-col justify-between border border-[#E3E8E4]">
            <BatteryCharging size={20} className="text-[#629A13] mb-2" />
            <div>
              <div className="text-xl sm:text-2xl font-bold font-display">{rawMaterialsKg} kg</div>
              <div className="text-[11px] text-[#5E6672] uppercase font-semibold">Raw Minerals</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F2F5F3] text-[#00264A] flex flex-col justify-between border border-[#E3E8E4]">
            <ShieldCheck size={20} className="text-[#629A13] mb-2" />
            <div>
              <div className="text-xl sm:text-2xl font-bold font-display">{goldRecoveredGrams} g</div>
              <div className="text-[11px] text-[#5E6672] uppercase font-semibold">Precious Metals</div>
            </div>
          </div>
        </div>

        {/* Modal CTA */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-4 border-t border-[#E3E8E4]">
          <span className="text-xs text-[#5E6672]">
            * Calculated via Life Cycle Assessment (LCA) mass models.
          </span>
          <button
            onClick={handleProceed}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#629A13] hover:bg-[#528210] text-white font-semibold text-sm btn-eco-glow transition-all active:scale-95 border border-[#629A13]"
          >
            <span>Proceed to Secure Pickup</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ImpactCalculator;
