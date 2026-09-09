"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Building, Mail, Phone, MapPin, Calendar, Truck, ArrowRight } from "lucide-react";

interface PickupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNotes?: string;
}

export const PickupModal: React.FC<PickupModalProps> = ({ isOpen, onClose, initialNotes = "" }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    city: "",
    estimatedWeight: "50-200 kg",
    preferredDate: "",
    deviceTypes: "Mixed Corporate IT Equipment",
    notes: initialNotes,
  });

  useEffect(() => {
    if (initialNotes) {
      setFormData((prev) => ({ ...prev, notes: initialNotes }));
    }
  }, [initialNotes]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const trackingId = "ARKA-ITAD-" + Math.floor(100000 + Math.random() * 900000);

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

        {!submitted ? (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5DC] text-[#629A13] text-xs font-semibold uppercase tracking-wider mb-2">
                <Truck size={14} />
                <span>Secure Enterprise Logistics</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#00264A]">
                Schedule Secure E-Waste Pickup
              </h2>
              <p className="text-xs sm:text-sm text-[#5E6672] mt-1">
                Enter your organization details below. Our GPS-monitored fleet will dispatch for secure doorstep collection and issue legal Form-6 manifests.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1">
                    Organization / Company Name *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-3 text-[#5E6672]" size={16} />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Infosys / Tech Corp"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3E8E4] text-sm text-[#121212] focus:outline-none focus:border-[#629A13] bg-[#F8FAF7]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E4] text-sm text-[#121212] focus:outline-none focus:border-[#629A13] bg-[#F8FAF7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1">
                    Official Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 text-[#5E6672]" size={16} />
                    <input
                      required
                      type="email"
                      pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                      title="Please enter a valid email address (e.g. user@example.com)"
                      placeholder="e.g. facility@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-[#F8FAF7] border border-[#E3E8E4] focus:border-[#629A13] focus:ring-[#629A13] rounded-xl text-sm transition-all focus:outline-none focus:ring-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1">
                    Direct Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 text-[#5E6672]" size={16} />
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3E8E4] text-sm text-[#121212] focus:outline-none focus:border-[#629A13] bg-[#F8FAF7]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1">
                    City / Regional Hub *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 text-[#5E6672]" size={16} />
                    <input
                      required
                      type="text"
                      placeholder="Hyderabad / Bengaluru"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3E8E4] text-sm text-[#121212] focus:outline-none focus:border-[#629A13] bg-[#F8FAF7]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1">
                    Estimated Batch Weight
                  </label>
                  <select
                    value={formData.estimatedWeight}
                    onChange={(e) => setFormData({ ...formData, estimatedWeight: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E3E8E4] text-sm text-[#121212] focus:outline-none focus:border-[#629A13] bg-[#F8FAF7]"
                  >
                    <option value="Under 50 kg">Under 50 kg</option>
                    <option value="50-200 kg">50 - 200 kg</option>
                    <option value="200-1000 kg">200 - 1,000 kg</option>
                    <option value="1+ Metric Tonne">1+ Metric Tonne</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#00264A] uppercase tracking-wider mb-1">
                    Preferred Pickup Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3 text-[#5E6672]" size={16} />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3E8E4] text-sm text-[#121212] focus:outline-none focus:border-[#629A13] bg-[#F8FAF7]"
                    />
                  </div>
                </div>
              </div>

              {formData.notes && (
                <div className="p-3.5 rounded-xl bg-[#EBF5DC] border border-[#629A13]/40 text-xs text-[#00264A] font-medium">
                  <strong>Attached Simulator Details:</strong> {formData.notes}
                </div>
              )}

              <div className="pt-4 border-t border-[#E3E8E4] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-[#E3E8E4] text-[#5E6672] text-sm font-medium hover:bg-[#F2F5F3] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#629A13] hover:bg-[#528210] text-white text-sm font-semibold btn-eco-glow transition-all active:scale-95 border border-[#629A13]"
                >
                  <span>Confirm Pickup Request</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#EBF5DC] text-[#629A13] flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#00264A] mb-2">
              Pickup Request Confirmed!
            </h3>
            <p className="text-sm text-[#5E6672] max-w-md mx-auto mb-6">
              Thank you, {formData.contactPerson || "Partner"}. Your tracking manifest ID is:
            </p>
            <div className="inline-block px-6 py-2.5 rounded-xl bg-[#00264A] text-[#629A13] font-mono font-bold text-lg mb-6 border border-[#053766]">
              {trackingId}
            </div>
            <p className="text-xs text-[#5E6672] mb-6 max-w-sm mx-auto">
              Our regional logistics coordinator will contact you at <strong>{formData.phone || "your phone"}</strong> to confirm vehicle dispatch and provide driver credentials.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-8 py-3 rounded-full bg-[#00264A] hover:bg-[#001A33] text-white text-sm font-semibold transition-all"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default PickupModal;
